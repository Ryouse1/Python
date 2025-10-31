import { runCommand } from "./runHelper";

export async function runBash(code: string) {
  return await runCommand(`bash tmp/main.sh`, code, "sh");
}
