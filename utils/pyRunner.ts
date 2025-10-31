import { loadPyodide } from "pyodide";

let pyodide: any = null;

export async function initPyodideEnv() {
  if (!pyodide) {
    pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/" });
  }
  return pyodide;
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
