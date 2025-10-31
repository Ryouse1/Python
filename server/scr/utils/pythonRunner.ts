import { runCommand } from "./runHelper";

export async function runPython(code: string) {
  return await runCommand(`python3 tmp/main.py`, code, "py");
}
