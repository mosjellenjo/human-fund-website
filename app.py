from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# Set up Flask app
app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}})

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question", "")
    persona = data.get("persona", "jerry")

    print(f"\n🚨 DEBUG TEST: received question: {question}")
    print("🧪 Forcing a fake response to test backend wiring.\n")

    return jsonify({
        "answer": "THIS IS A TEST. IF YOU SEE THIS, YOUR BACKEND IS WORKING.",
        "sources": ["FAKE_SOURCE_1.txt", "FAKE_SOURCE_2.txt"]
    })

if __name__ == "__main__":
    print("🚀 Starting Flask backend on port 5000")
    app.run(debug=True, host="0.0.0.0", port=5000)
