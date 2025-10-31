import { loadPyodide } from "pyodide";
import { File } from "./fileStorage";

let pyodide: any = null;

export async function initPyodideEnv() {
  if (!pyodide) {
    pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/" });
    await pyodide.loadPackage("micropip");
  }
  return pyodide;
}

// PyPIパッケージをインストール
export async function installPackage(packageName: string) {
  const py = await initPyodideEnv();
  try {
    await py.runPythonAsync(`
import micropip
await micropip.install("${packageName}")
    `);
    return `${packageName} installed`;
  } catch (err: any) {
    return `Error: ${err.message}`;
  }
}

// アップロード／外部取得したPythonファイルをFSに書き込む
export async function writePythonFilesToFS(files: File[]) {
  const py = await initPyodideEnv();
  for (const f of files) {
    if (f.type === "python") {
      py.FS.writeFile(f.name, f.content);
    }
  }
}

// Pythonコードを実行（FSに書き込んだファイルを import 可）
export async function runPython(code: string, files: File[] = []) {
  const py = await initPyodideEnv();
  try {
    // PythonファイルをFSに書き込み
    await writePythonFilesToFS(files);
    const result = await py.runPythonAsync(code);
    return String(result);
  } catch (err: any) {
    return err.message;
  }
}
