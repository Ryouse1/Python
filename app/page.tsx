"use client";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { initTemplateFiles, loadFiles, saveFile, deleteFile } from "../utils/fileStorage";
import { runPython } from "../utils/pyRunner";
import LivePreview from "../components/LivePreview";

export default function Home() {
  const [files, setFiles] = useState<{ name: string; content: string }[]>([]);
  const [currentFile, setCurrentFile] = useState<string>("main.py");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [htmlCode, setHtmlCode] = useState("");

  useEffect(() => {
    initTemplateFiles();
    const f = loadFiles();
    setFiles(f);
    const file = f.find(f => f.name === "main.py");
    if (file) setCode(file.content);
  }, []);

  function selectFile(name: string) {
    const file = files.find(f => f.name === name);
    if (file) {
      setCurrentFile(name);
      if (name.endsWith(".html")) setHtmlCode(file.content);
      else setCode(file.content);
    }
  }

  function saveCurrentFile() {
    const content = currentFile.endsWith(".html") ? htmlCode : code;
    saveFile(currentFile, content);
    setFiles(loadFiles());
  }

  function deleteCurrent() {
    deleteFile(currentFile);
    const f = loadFiles();
    setFiles(f);
    const newFile = f[0];
    if (newFile) {
      setCurrentFile(newFile.name);
      if (newFile.name.endsWith(".html")) setHtmlCode(newFile.content);
      else setCode(newFile.content);
    } else {
      setCurrentFile("");
      setCode("");
      setHtmlCode("");
    }
  }

  async function runCode() {
    if (!currentFile.endsWith(".html")) {
      const result = await runPython(code);
      setOutput(result);
    }
  }

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <div className="w-1/4 p-2 border-r border-zinc-700">
        <h2 className="text-xl mb-2">Files</h2>
        <ul>
          {files.map(f => (
            <li key={f.name} className={`cursor-pointer ${f.name === currentFile ? "font-bold" : ""}`} onClick={() => selectFile(f.name)}>
              {f.name}
            </li>
          ))}
        </ul>
        <div className="mt-2 flex gap-2">
          <button onClick={saveCurrentFile} className="bg-blue-600 px-2 rounded">💾 Save</button>
          <button onClick={deleteCurrent} className="bg-red-600 px-2 rounded">🗑 Delete</button>
          <button onClick={runCode} className="bg-green-600 px-2 rounded">▶ Run</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-2">
        <Editor
          height="50%"
          defaultLanguage={currentFile.endsWith(".html") ? "html" : "python"}
          theme="vs-dark"
          value={currentFile.endsWith(".html") ? htmlCode : code}
          onChange={(value) => currentFile.endsWith(".html") ? setHtmlCode(value || "") : setCode(value || "")}
        />
        {currentFile.endsWith(".html") && <div className="mt-2 flex-1"><LivePreview html={htmlCode} /></div>}
        {!currentFile.endsWith(".html") && <div className="mt-2 bg-black p-2 flex-1 overflow-auto"><pre className="text-green-400">{output}</pre></div>}
      </div>
    </div>
  );
}
