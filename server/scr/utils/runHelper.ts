import fs from "fs-extra";
import path from "path";
import { exec } from "child_process";

const TMP_DIR = path.join(process.cwd(), "tmp");

export async function runCommand(
  command: string,
  code: string,
  ext: string
): Promise<string> {
  await fs.ensureDir(TMP_DIR);
  const file = path.join(TMP_DIR, `main.${ext}`);
  await fs.writeFile(file, code, "utf8");

  return new Promise((resolve, reject) => {
    exec(command, { timeout: 8000 }, (err, stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message));
      resolve(stdout);
    });
  });
}
