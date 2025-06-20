from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain_community.document_loaders import DirectoryLoader
from dotenv import load_dotenv
import os
import shutil

# Load environment variables
load_dotenv()

# Force fresh rebuild of Chroma DB
CHROMA_DIR = "chroma_db"
if os.path.exists(CHROMA_DIR):
    shutil.rmtree(CHROMA_DIR)

# Prepare documents
loader = DirectoryLoader("seinfeld_scripts", glob="*.txt", loader_cls=TextLoader)
documents = loader.load()

# Split into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
texts = text_splitter.split_documents(documents)

# Create embeddings and vectorstore
embeddings = OpenAIEmbeddings()
vectordb = Chroma.from_documents(texts, embedding=embeddings, persist_directory=CHROMA_DIR)

# Prepare retriever and QA chain
retriever = vectordb.as_retriever()
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o"),
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=False  # <--- do NOT include script references in output
)

# Start Flask app
app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}})

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    query = data.get("question", "")

    if not query:
        return jsonify({"error": "No question provided."}), 400

    result = qa_chain.invoke(query)
    return jsonify({"response": result["result"]})

if __name__ == "__main__":
    app.run(debug=True, port=10000)
