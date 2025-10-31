import { runCommand } from "./runHelper";

export async function runNode(code: string) {
  return await runCommand(`node tmp/main.js`, code, "js");
}
