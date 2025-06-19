from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

# Load .env credentials
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}})

# Setup embeddings and vector store
embedding_function = OpenAIEmbeddings()
vectordb = Chroma(persist_directory="chroma_db", embedding_function=embedding_function)

# Setup retriever chain
retriever = vectordb.as_retriever(search_kwargs={"k": 4})
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o"),
    retriever=retriever,
    return_source_documents=True
)

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question", "")
    persona = data.get("persona", "jerry")

    print(f"\n🔍 Received question: {question} (persona: {persona})")

    try:
        result = qa_chain({"query": question})
        answer = result["result"]
        sources = list({doc.metadata.get("source", "Unknown") for doc in result["source_documents"]})
        print(f"✅ Answer generated with sources: {sources}")
        return jsonify({"answer": answer, "sources": sources})
    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({"answer": "Sorry, something went wrong.", "sources": []})

if __name__ == "__main__":
    print("🚀 Starting Flask backend on port 5000")
    app.run(debug=True, host="0.0.0.0", port=5000)
