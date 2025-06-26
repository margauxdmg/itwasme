import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("human");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult("");

    const res = await fetch("/api/humanize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, mode }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "Georgia, serif", padding: "2rem", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.2rem" }}>
        🧠 <span style={{ color: "#AA336A" }}>ItWasMe</span>
      </h1>
      <p style={{ fontStyle: "italic", marginBottom: "2rem", fontSize: "1.1rem" }}>
        Paste your chaotic message. Pick a vibe. Click for ✨magic.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder="Paste your message here..."
        style={{
          width: "100%",
          padding: "1rem",
          fontSize: "1rem",
          border: "1px solid #ccc",
          borderRadius: "6px",
          marginBottom: "1rem",
          resize: "vertical",
        }}
      />

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "1rem" }}>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{
            padding: "0.6rem",
            borderRadius: "6px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          <option value="gigi">Gigi 🧠 (sassy)</option>
          <option value="linkedin">LinkedIn 💼</option>
          <option value="school">School 📝</option>
          <option value="corporate">Corporate 💻</option>
          <option value="human">Real Human™ 😬</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "0.6rem 1.2rem",
            background: "#AA336A",
            color: "white",
            fontWeight: "bold",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
        >
          {loading ? "Humanizing…" : "✨ Humanize it"}
        </button>
      </div>

      <div style={{ textAlign: "left", marginTop: "2rem", borderTop: "1px solid #eee", paddingTop: "1rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📝 Your rephrased masterpiece:</h2>
        <div
          style={{
            background: "#fdfdfd",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
            fontSize: "1rem",
          }}
        >
          {result || "Nothing yet... try pasting a message above!"}
        </div>
      </div>
    </div>
  );
}