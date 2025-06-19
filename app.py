from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# Load environment (for your OpenAI key)
load_dotenv()

# Set up Flask app
app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}})

# Check and build vector DB if missing
if not os.path.exists("chroma_db"):
    print("⚠️ Chroma DB not found. Building from scratch...")
    all_docs = []
    for filename in os.listdir("seinfeld_scripts"):
        if filename.endswith(".txt"):
            path = os.path.join("seinfeld_scripts", filename)
            loader = TextLoader(path, encoding="utf-8")
            docs = loader.load()
            all_docs.extend(docs)

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    split_docs = splitter.split_documents(all_docs)

    embeddings = OpenAIEmbeddings()
    vectordb = Chroma.from_documents(split_docs, embedding=embeddings, persist_directory="chroma_db")
    vectordb.persist()
    print("✅ Chroma DB built and saved.")
else:
    print("✅ Found existing Chroma DB.")
    embeddings = OpenAIEmbeddings()
    vectordb = Chroma(persist_directory="chroma_db", embedding_function=embeddings)

# Set up retriever and model
retriever = vectordb.as_retriever(search_kwargs={"k": 4})
llm = ChatOpenAI(model="gpt-4o")

# Optional: personalities
persona_prompts = {
    "jerry": """You are JerryAI, a witty and dry Seinfeld-like assistant.
Answer based only on the provided context. Be concise, deadpan, and subtly sarcastic if possible.
If the answer isn't in the context, say "I don't know... maybe ask Newman.".

Context:
{context}

Question: {question}
Answer:""",
    "kruger": """You are KrugerAI. You're laid back, a little clueless, and you don’t really care.
Answer using the context provided, but make it sound like you’re vaguely aware of what’s happening.

Context:
{context}

Question: {question}
Answer:"""
}

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question", "")
    persona = data.get("persona", "jerry")

    if not question:
        return jsonify({"error": "No question provided"}), 400

    # Create prompt
    prompt_template = PromptTemplate(
        input_variables=["context", "question"],
        template=persona_prompts.get(persona, persona_prompts["jerry"]).strip()
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type="stuff",
        chain_type_kwargs={"prompt": prompt_template},
        return_source_documents=True
    )

    response = qa_chain({"query": question})

    # Extract sources
    source_files = list({doc.metadata.get('source', 'unknown') for doc in response["source_documents"]})

    return jsonify({
        "answer": response["result"],
        "sources": source_files
    })

if __name__ == "__main__":
    print("🚀 Starting Flask backend on port 5000")
    app.run(debug=True, host="0.0.0.0", port=5000)
