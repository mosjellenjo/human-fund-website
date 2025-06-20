from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}})

# Initialize embeddings and Chroma vector store
embeddings = OpenAIEmbeddings()
vectordb = Chroma(persist_directory="chroma_db", embedding_function=embeddings)

# Custom prompt
prompt_template = """You are a helpful assistant for The Human Fund chatbot, powered by the Seinfeld scripts.
Only answer using information from the provided context. Do not make up facts or speculate.
Keep responses in character and concise. Format clearly.

Context:
{context}

Question: {question}
Answer:"""
prompt = PromptTemplate.from_template(prompt_template)

# Setup retriever and QA chain
retriever = vectordb.as_retriever(search_kwargs={"k": 4})
llm = ChatOpenAI(model="gpt-4o")
chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="stuff",
    chain_type_kwargs={"prompt": prompt},
    return_source_documents=True
)

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question", "")
    persona = data.get("persona", "jerry")

    print(f"\n🧠 Question received: {question}")

    try:
        result = chain.invoke({"question": question})

        # DEBUG: Show what documents were retrieved
        print("\n📥 Retrieved Documents:")
        for doc in result['source_documents']:
            print(" -", doc.metadata.get("source"), "|", doc.page_content[:200].replace("\n", " "))

        # DEBUG: Show the final answer
        print("\n🧾 Final Answer:")
        print(result['result'])

        return jsonify({
            "answer": result["result"]
        })

    except Exception as e:
        print("❌ Error:", str(e))
        return jsonify({"error": "Something went wrong on the server."}), 500

if __name__ == "__main__":
    print("🚀 Starting Flask backend on port 5000")
    app.run(debug=True, host="0.0.0.0", port=5000)
