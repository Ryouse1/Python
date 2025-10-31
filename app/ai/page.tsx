"use client";
import { useState } from "react";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function askAI() {
    setResponse("Thinking...");
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: input }),
    });
    const data = await res.json();
    setResponse(data.answer);
  }

  return (
    <div className="p-4 bg-zinc-900 min-h-screen text-white">
      <h1 className="text-3xl mb-4">AI補助モード</h1>
      <textarea
        className="w-full p-2 rounded bg-zinc-800"
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="改善したいコードを入力..."
      />
      <button onClick={askAI} className="mt-2 bg-green-600 px-4 py-2 rounded">💬 Ask AI</button>
      <pre className="mt-4 bg-black p-2 rounded">{response}</pre>
    </div>
  );
}
