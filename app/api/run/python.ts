import { NextRequest, NextResponse } from "next/server";
import { runPython } from "../../../utils/pyRunner";
import { loadFiles } from "../../../utils/fileStorage";

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const files = loadFiles();
  const result = await runPython(code, files);
  return NextResponse.json({ result });
}
