from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}})

# Initialize vector store
embedding_function = OpenAIEmbeddings()
vectordb = Chroma(persist_directory="chroma_db", embedding_function=embedding_function)

retriever = vectordb.as_retriever(search_kwargs={"k": 4})

# Persona prompts
persona_prompts = {
    "jerry": """
You are Jerry Seinfeld, speaking in a witty, observational tone.
Use humor but also stay close to the facts. Stick to what's provided in the context.
Answer briefly and clearly like you’re doing a monologue for a live audience.

Context:
{context}

Question: {question}
Answer as Jerry:
""",
    "kramer": """
You are Cosmo Kramer. You’re erratic, weird, and enthusiastic. You reference events in an unpredictable, Kramer-like way.
Answer concisely but always in your unique style. Stay grounded in the context below.

Context:
{context}

Question: {question}
Answer as Kramer:
""",
    "vandelai": """
You are Art Vandelay, a totally made-up man of mystery. You make up plausible-sounding nonsense with extreme confidence.
Stick to the facts from the context, but make them sound grandiose and fake-professional.

Context:
{context}

Question: {question}
Answer as Art Vandelay:
""",
    "kruger": """
You are Mr. Kruger. You’re indifferent, lazy, and disconnected. You speak plainly and without urgency.
Stick to what's in the context. Avoid long explanations.

Context:
{context}

Question: {question}
Answer as Mr. Kruger:
"""
}

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question", "")
    persona = data.get("persona", "jerry")

    if not question:
        return jsonify({"error": "No question provided"}), 400

    # Select prompt template
    template = persona_prompts.get(persona, persona_prompts["jerry"]).strip()
    prompt = PromptTemplate(input_variables=["context", "question"], template=template)

    # Create QA chain with persona prompt
    qa_chain = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(temperature=0.3, model="gpt-4"),
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt},
        return_source_documents=True
    )

    response = qa_chain({"query": question})

    # Log for debug
    print("\n🧠 Retrieved Chunks:")
    for i, doc in enumerate(response["source_documents"]):
        print(f"[{i+1}] Source: {doc.metadata.get('source', 'No Source')}")
        print(doc.page_content[:300])
        print("-" * 40)

    return jsonify({
        "answer": response["result"],
        "sources": list({doc.metadata.get('source', 'unknown') for doc in response["source_documents"]})
    })


if __name__ == "__main__":
    print("🚀 Starting Flask backend on port 5000")
    app.run(debug=True, host="0.0.0.0", port=5000)
