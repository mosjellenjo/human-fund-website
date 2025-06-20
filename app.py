from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import TextLoader
from dotenv import load_dotenv
import os
import glob

app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}})

load_dotenv()

CHROMA_DIR = "chroma_db"
SCRIPTS_DIR = "seinfeld_scripts"

# Character personalities
persona_prompts = {
    "jerry": """You are Jerry Seinfeld... [same as before, truncated here for brevity]""",
    "george": """You are George Costanza...""",
    "kramer": """You are Cosmo Kramer...""",
    "kruger": """You are Mr. Kruger..."""
}

def rebuild_chroma_db():
    print("🧠 Rebuilding Chroma vector store from scratch...")
    embeddings = OpenAIEmbeddings()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    all_docs = []

    for filepath in glob.glob(f"{SCRIPTS_DIR}/*.txt"):
        loader = TextLoader(filepath, encoding='utf-8')
        docs = loader.load_and_split(text_splitter)
        all_docs.extend(docs)

    vectordb = Chroma.from_documents(all_docs, embeddings, persist_directory=CHROMA_DIR)
    vectordb.persist()
    print("✅ Chroma DB rebuilt and saved.")
    return vectordb

# Load or rebuild vector store
if not os.path.exists(CHROMA_DIR) or not os.listdir(CHROMA_DIR):
    vectordb = rebuild_chroma_db()
else:
    embeddings = OpenAIEmbeddings()
    vectordb = Chroma(persist_directory=CHROMA_DIR, embedding_function=embeddings)

retriever = vectordb.as_retriever(search_kwargs={"k": 4})

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    query = data.get("question", "")
    persona = data.get("persona", "jerry")

    if not query:
        return jsonify({"error": "No question provided"}), 400

    prompt_text = persona_prompts.get(persona, persona_prompts["jerry"])
    prompt = PromptTemplate.from_template(
        prompt_text.strip() + "\n\nContext:\n{context}\n\nQuestion: {question}\n\nAnswer:"
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(model_name="gpt-4o", temperature=0.7),
        retriever=retriever,
        return_source_documents=True,
        chain_type="stuff",
        chain_type_kwargs={"prompt": prompt}
    )

    response = qa_chain.invoke({"query": query})
    sources = [os.path.basename(doc.metadata["source"]) for doc in response["source_documents"]]

    return jsonify({
        "answer": response["result"],
        "sources": sources
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
