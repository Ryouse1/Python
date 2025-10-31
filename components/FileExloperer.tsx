"use client";
import { File, loadFiles, saveFile, deleteFile, uploadFiles, fetchExternalFile } from "../utils/fileStorage";

interface FileExplorerProps {
  files: File[];
  setFiles: (files: File[]) => void;
  setCurrentFile: (file: File) => void;
}

export default function FileExplorer({ files, setFiles, setCurrentFile }: FileExplorerProps) {
  return (
    <div className="w-64 h-full border-r border-zinc-700 p-2 flex flex-col gap-2">
      <input
        type="file"
        multiple
        onChange={async (e) => {
          if (e.target.files) {
            await uploadFiles(e.target.files);
            setFiles(loadFiles());
          }
        }}
      />
      <FileLoader setFiles={setFiles} />
      <div className="flex-1 overflow-auto mt-2">
        {files.map((f) => (
          <div key={f.name} className="flex justify-between items-center p-1 hover:bg-zinc-800 rounded cursor-pointer">
            <span onClick={() => setCurrentFile(f)}>{f.name}</span>
            <button onClick={() => { deleteFile(f.name); setFiles(loadFiles()); }}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FileLoader({ setFiles }: { setFiles: (files: File[]) => void }) {
  const [url, setUrl] = React.useState("");
  return (
    <div className="flex gap-2">
      <input
        className="flex-1 p-1 rounded bg-zinc-800"
        placeholder="External URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="bg-blue-600 px-2 rounded"
        onClick={async () => {
          try {
            await fetchExternalFile(url);
            setFiles(loadFiles());
            setUrl("");
          } catch {
            alert("Failed to load file");
          }
        }}
      >
        ⬇️
      </button>
    </div>
  );
}
