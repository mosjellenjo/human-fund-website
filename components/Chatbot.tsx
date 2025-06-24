"use client";
import { useState, useRef, useEffect, FormEvent } from "react";

export default function Chatbot() {
  const greetings = {
    jerry: "Hi, I'm a representative from The Human Fund. Ask me anything about what we do, Festivus, or how people help people.",
    george: "Hi, I'm a representative from The Human Fund. Ask me about what we do... unless it's about accounting. Or our boss. Or forms. Please don't ask about forms.",
    kramer: "Hi there! I'm a representative from The Human Fund. What do you need? Let’s get weird and fix the world!",
    kruger: "Hey. I'm from The Human Fund, apparently. Ask whatever, it's all good. Or not. No pressure.",
  };

  const thinking = {
    jerry: "JerryAI is observationally mulling it over...",
    george: "George is anxiously cooking up a lie about your question...",
    kramer: "KramericAI is enthusiastically winging a response...",
    kruger: "KrugerAI is slowly getting around to maybe answering that...",
  };

  const [rep, setRep] = useState("jerry");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: greetings["jerry"] },
  ]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const question = input.trim();
    setMessages((msgs) => [...msgs, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      console.log("Sending request to backend...");
      const userMessages = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-6) // last 3 exchanges
        .map((m) => `${m.role === "user" ? "User" : "Bot"}: ${m.content}`);

      const res = await fetch("https://human-fund-backend.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          persona: rep,
          history: userMessages,
      }),
    });

      const data = await res.json();
      console.log("Received response:", data);

      const content = data.answer || `❌ Error: ${data.error || "No answer received."}`;
      const sources = data.sources?.length
        ? `\n\n📄 _Source: ${data.sources.join(", ")}_`
        : "";

      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: content + sources },
      ]);
    } catch (err) {
      console.error("Request failed:", err);
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content: "❌ Error: Couldn’t reach backend or response was invalid. Try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const changePersona = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setRep(selected);
    setMessages([{ role: "assistant", content: greetings[selected] }]);
  };

  return (
    <section style={{ background: "#0b1f19", padding: "2rem 0", color: "#8CFFDA" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
          Ask a Human Fund Representative
        </h2>
        <label htmlFor="rep">Choose your representative:</label>
        <select
          id="rep"
          value={rep}
          onChange={changePersona}
          style={{
            marginLeft: 8,
            padding: 8,
            borderRadius: 8,
            border: "1px solid #8CFFDA",
            background: "#fff",
            color: "#181028",
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          <option value="jerry">JerryAI</option>
          <option value="george">VandelAI</option>
          <option value="kramer">KramericAI</option>
          <option value="kruger">KrugerAI</option>
        </select>
      </div>

      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#0b1f19",
          border: "2px solid #8CFFDA",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <div
          ref={chatRef}
          style={{
            height: 320,
            overflowY: "auto",
            marginBottom: 16,
            paddingRight: 8,
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                margin: "12px 0",
              }}
            >
              <div
                style={{
                  background: msg.role === "user" ? "#8CFFDA" : "#fff",
                  color: msg.role === "user" ? "#181028" : "#000",
                  borderRadius: 16,
                  padding: "10px 16px",
                  maxWidth: "80%",
                  fontSize: 13,
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.3,
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ marginTop: 12, fontSize: 13 }}>{thinking[rep]}</div>
          )}
        </div>

        <form onSubmit={sendMessage} style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: "1px solid #8CFFDA",
              fontSize: 13,
              color: "#000",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#8CFFDA",
              color: "#181028",
              border: "none",
              borderRadius: 8,
              padding: "0 24px",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
