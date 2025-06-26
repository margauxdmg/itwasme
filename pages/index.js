import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("gigi");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRephrase = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult("");
    setCopied(false);

    const res = await fetch("/api/humanize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, mode }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  const handleRemoveAIPattern = () => {
    const step1 = input.replace(/\s*[-—]\s*/g, ", ");
    const step2 = step1.replace(/([.?!]\s+)([a-z])/g, (_, sep, char) => sep + char.toUpperCase());
    const step3 = step2.charAt(0).toUpperCase() + step2.slice(1);
    setResult(step3);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ fontFamily: "Georgia, serif", padding: "2rem", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.2rem" }}>
        🧠 <span style={{ color: "#AA336A" }}>ItWasMe</span>
      </h1>
      <p style={{ fontStyle: "italic", marginBottom: "2rem", fontSize: "1.1rem" }}>
        Paste your chaotic message. Then choose your fix.
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

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
        <button
          onClick={handleRemoveAIPattern}
          style={{
            padding: "0.6rem 1.2rem",
            background: "#555",
            color: "white",
            fontWeight: "bold",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            flexGrow: 1,
          }}
        >
          🧹 Remove all AI pattern
        </button>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexGrow: 1 }}>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            style={{
              padding: "0.6rem",
              borderRadius: "6px",
              fontSize: "1rem",
              border: "1px solid #ccc",
              cursor: "pointer",
              flexGrow: 1,
            }}
          >
            <option value="gigi">Gigi 🧠 (sassy)</option>
            <option value="linkedin">LinkedIn 💼</option>
            <option value="school">School 📝</option>
            <option value="corporate">Corporate 💻</option>
            <option value="human">Real Human™ 😬</option>
          </select>
          <button
            onClick={handleRephrase}
            disabled={loading}
            style={{
              padding: "0.6rem 1.2rem",
              background: "#AA336A",
              color: "white",
              fontWeight: "bold",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Rephrasing…" : "🎭 Rephrase it"}
          </button>
        </div>
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
            marginBottom: "0.5rem",
          }}
        >
          {result || "Nothing yet... try pasting a message above!"}
        </div>
        {result && (
          <button
            onClick={handleCopy}
            style={{
              padding: "0.4rem 1rem",
              fontSize: "0.9rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              background: copied ? "#d4edda" : "#f0f0f0",
              cursor: "pointer",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
}