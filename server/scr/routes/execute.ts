import { Request, Response } from "express";
import { runPython } from "../utils/pythonRunner";
import { runNode } from "../utils/nodeRunner";
import { runBash } from "../utils/bashRunner";
import { runCpp } from "../utils/cppRunner";
import { runJava } from "../utils/javaRunner";

export async function executeCode(req: Request, res: Response) {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: "Missing language or code" });
  }

  try {
    let output: string;

    switch (language) {
      case "python":
        output = await runPython(code);
        break;
      case "node":
        output = await runNode(code);
        break;
      case "bash":
        output = await runBash(code);
        break;
      case "cpp":
        output = await runCpp(code);
        break;
      case "java":
        output = await runJava(code);
        break;
      default:
        return res.status(400).json({ error: `Unsupported language: ${language}` });
    }

    res.json({ success: true, output });
  } catch (err: any) {
    res.json({ success: false, output: err.message });
  }
}
