import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";

export async function POST(req: NextRequest) {
  const { cmd } = await req.json();
  if (!cmd) return NextResponse.json({ error: "No command" }, { status: 400 });

  // 安全対策: 実行可能コマンド制限
  const allowed = ["ls","cat","mkdir","rm","echo","node","python"];
  if (!allowed.some(c => cmd.startsWith(c))) return NextResponse.json({ error: "Not allowed" }, { status: 403 });

  return new Promise((resolve) => {
    exec(cmd, { cwd: process.cwd() }, (err, stdout, stderr) => {
      if (err) resolve(NextResponse.json({ error: stderr || err.message }));
      else resolve(NextResponse.json({ result: stdout }));
    });
  });
}
