"use client";
import { useState, useRef, useEffect, FormEvent } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";

export default function Chatbot() {
  const greetings = {
    jerry: "Hi, I'm a representative from The Human Fund. Ask me anything about what we do, Festivus, or how people help people.",
    george: "Hi, I'm a representative from The Human Fund. Ask me about what we do... unless it's about accounting. Or our boss. Or forms. Please don't ask about forms.",
    kramer: "Hi there! I'm a representative from The Human Fund and a hipster doofus! What do you need? Let’s get weird and fix the world - giddy up!",
    kruger: "Hey. I'm from The Human Fund, apparently. Ask whatever, it's all good. Or not. No pressure.",
  };

  const thinking = {
    jerry: "JerryAI is stalling with a relatable anecdote...",
    george: "George is nervously overthinking your question...",
    kramer: "KramericAI is chaotically brainstorming—hold onto something!",
    kruger: "KrugerAI is kinda... sorta... maybe getting to it. Or not.",
  };

  const [rep, setRep] = useState("jerry");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: greetings["jerry"] },
  ]);
  const [isMuted, setIsMuted] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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
      const userMessages = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-6)
        .map((m) => `${m.role === "user" ? "User" : "Bot"}: ${m.content}`);

      const backendUrl =
        process.env.NODE_ENV !== "production"
          ? "http://127.0.0.1:10000/ask"
          : "https://human-fund-backend.onrender.com/ask";
      console.log("🔁 Using backend:", backendUrl);

      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, persona: rep, history: userMessages }),
      });

      const data = await res.json();
      const content = data.answer || `❌ Error: ${data.error || "No answer received."}`;
      const sources = data.sources?.length
        ? `\n\n📄 _Source: ${data.sources.join(", ")}_`
        : "";

      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: content + sources },
      ]);

      if (data.audio && audioRef.current && !isMuted) {
        try {
          const audioBlob = new Blob(
            [Uint8Array.from(atob(data.audio), (c) => c.charCodeAt(0))],
            { type: "audio/mp3" }
          );
          const audioUrl = URL.createObjectURL(audioBlob);
          const audioEl = audioRef.current;

          audioEl.pause();
          audioEl.src = audioUrl;
          audioEl.load();

          const tryPlay = () => {
            audioEl.muted = false;
            audioEl.play().catch((err) => {
              console.warn("Autoplay failed, waiting for user interaction.");
              const resume = () => {
                audioEl.muted = false;
                audioEl.play().catch(() => {});
                window.removeEventListener("click", resume);
                window.removeEventListener("touchstart", resume);
              };
              window.addEventListener("click", resume);
              window.addEventListener("touchstart", resume);
            });
          };

          tryPlay();
        } catch (err) {
          console.error("🔊 Audio decoding/playback failed:", err);
        }
      }
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
    <>
      <Head>
        <link rel="canonical" href="https://www.humanfund.no/" />
      </Head>

      <section className="bg-dark-green text-light-green-text py-8">
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
            Ask a Human Fund Representative
          </h2>
          <label htmlFor="rep">Choose your representative:</label>
          <select
            id="rep"
            value={rep}
            onChange={changePersona}
            className="ml-2 mb-4 px-3 py-2 rounded-md border border-brand-accent bg-white text-black text-sm"
          >
            <option value="jerry">JerryAI</option>
            <option value="george">GeorgeAI</option>
            <option value="kramer">KramericAI</option>
            <option value="kruger">KrugerAI</option>
          </select>
        </div>

        <div className="max-w-[600px] mx-auto bg-brand-bg-elevated border border-brand-accent/30 rounded-2xl p-6">
          <div ref={chatRef} className="h-80 overflow-y-auto mb-4 pr-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} my-3`}>
                <div className={`${msg.role === "user" ? "bg-brand-accent text-black" : "bg-white text-black"} rounded-2xl px-4 py-2 max-w-[80%] text-sm whitespace-pre-wrap leading-snug`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (<div className="mt-3 text-sm">{thinking[rep]}</div>)}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage(e);
                }
              }}
              placeholder="Type your question..."
              className="flex-1 px-3 py-3 rounded-md border border-brand-accent bg-brand-bg-elevated text-white text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-accent/60"
            />
            <Button type="submit" variant="brand" disabled={loading} className="px-6">
              Send
            </Button>
          </form>

          <Button
            onClick={() => {
              setIsMuted((prev) => {
                const newMuted = !prev;
                if (audioRef.current) {
                  audioRef.current.pause();
                  if (newMuted) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.src = "";
                  }
                }
                return newMuted;
              });
            }}
            variant={isMuted ? "brand" : "brandOutline"}
            className="mt-3 text-sm px-4 py-2"
          >
            {isMuted ? "Unmute Voice" : "Mute Voice"}
          </Button>
          <audio ref={audioRef} playsInline style={{ display: "none" }} />
        </div>
      </section>
    </>
  );
}
