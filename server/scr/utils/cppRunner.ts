import { runCommand } from "./runHelper";
import path from "path";

export async function runCpp(code: string) {
  const file = path.join("tmp", "main.cpp");
  const binary = path.join("tmp", "main.out");
  const compile = `g++ ${file} -o ${binary}`;
  const run = `${binary}`;
  return await runCommand(`${compile} && ${run}`, code, "cpp");
}
