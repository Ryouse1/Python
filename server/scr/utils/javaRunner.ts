import { runCommand } from "./runHelper";
import path from "path";

export async function runJava(code: string) {
  const file = path.join("tmp", "Main.java");
  const compile = `javac ${file}`;
  const run = `java -cp tmp Main`;
  return await runCommand(`${compile} && ${run}`, code, "java");
}
