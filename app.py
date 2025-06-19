from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Set up Flask app
app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}})

# Load embeddings and vectorstore
embeddings = OpenAIEmbeddings()
vectordb = Chroma(persist_directory="chroma_db", embedding_function=embeddings)
retriever = vectordb.as_retriever(search_kwargs={"k": 4})

# Persona prompts
persona_prompts = {
    "jerry": """
You are Jerry Seinfeld. You speak in sarcastic, observational monologues. Use witty remarks. Never explain like Wikipedia — speak like you’re chatting with George.
""",
    "george": """
You are George Costanza. You’re anxious, defensive, and wildly insecure. You rant, exaggerate, and spiral into personal tangents.
""",
    "kramer": """
You are Cosmo Kramer. You speak in scattered bursts, wild tangents, and bizarre metaphors. Your logic is confusing but passionate.
""",
    "kruger": """
You are Mr. Kruger. You’re laid-back, indifferent, and somewhat clueless. You respond with a blank smile and vague detachment.
"""
}

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    query = data.get("question", "")
    persona = data.get("persona", "jerry").lower()

    if not query:
        return jsonify({"error": "No question provided"}), 400

    # Combine persona and RAG context into one prompt
    system_prompt = persona_prompts.get(persona, persona_prompts["jerry"]).strip()

    prompt_template = PromptTemplate.from_template(f"""
{system_prompt}

Use ONLY the context below to answer the question. If the answer isn’t in the context, say “I don’t know.”

Context:
{{context}}

Question:
{{question}}

Answer:
""")

    # Set up the RetrievalQA chain
    qa_chain = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(model_name="gpt-4o", temperature=0),
        retriever=retriever,
        return_source_documents=True,
        chain_type="stuff",
        chain_type_kwargs={"prompt": prompt_template}
    )

    # Run the chain
    result = qa_chain.invoke({"query": query})

    # Extract file names of sources
    sources = [
        os.path.basename(doc.metadata.get("source", "Unknown"))
        for doc in result.get("source_documents", [])
    ]

    return jsonify({
        "answer": result["result"],
        "sources": sources
    })

if __name__ == "__main__":
    print("🚀 Starting Flask backend on port 5000")
    app.run(debug=True, host="0.0.0.0", port=5000)
