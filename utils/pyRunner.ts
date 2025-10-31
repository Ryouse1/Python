import { loadPyodide } from "pyodide";

let pyodide: any = null;

export async function initPyodideEnv() {
  if (!pyodide) {
    pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/" });
    await pyodide.loadPackage("micropip");
  }
  return pyodide;
}

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

export async function runPython(code: string) {
  const py = await initPyodideEnv();
  try {
    const result = await py.runPythonAsync(code);
    return String(result);
  } catch (err: any) {
    return err.message;
  }
}
