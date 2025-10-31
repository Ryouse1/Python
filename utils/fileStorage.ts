export interface File {
  name: string;
  content: string;
  type: "python" | "html" | "css" | "js" | "txt" | "md" | "other";
}

export function initTemplateFiles() {
  if (Object.keys(localStorage).length === 0) {
    saveFile("main.py", `print("Hello, Ryouse1! 👋")`, "python");
    saveFile("utils.py", "def add(a,b): return a+b", "python");
    saveFile("requirements.txt", "requests\nnumpy", "txt");
    saveFile("index.html", "<!DOCTYPE html>\n<html><body><h1>Hello World</h1></body></html>", "html");
    saveFile("sample.css", "body { background: #f0f0f0; }", "css");
    saveFile("sample.js", "console.log('Hello JS');", "js");
    saveFile("README.md", "# My Python Project\nWelcome to RyouseLab IDE.", "md");
    saveFile("data/sample.txt", "Hello World", "txt");
  }
}

export function saveFile(name: string, content: string, type: File["type"]) {
  localStorage.setItem(name, JSON.stringify({ content, type }));
}

export function loadFiles(): File[] {
  return Object.entries(localStorage).map(([name, value]) => {
    const { content, type } = JSON.parse(value as string);
    return { name, content, type };
  });
}

export function deleteFile(name: string) {
  localStorage.removeItem(name);
}

export async function uploadFiles(fileList: FileList) {
  for (let i = 0; i < fileList.length; i++) {
    const f = fileList[i];
    const content = await f.text();
    const ext = f.name.split(".").pop()?.toLowerCase() || "txt";
    let type: File["type"] = "other";
    if (ext === "py") type = "python";
    else if (ext === "html") type = "html";
    else if (ext === "css") type = "css";
    else if (ext === "js") type = "js";
    else if (ext === "md") type = "md";
    else if (ext === "txt") type = "txt";
    saveFile(f.name, content, type);
  }
}

export async function fetchExternalFile(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch file");
    const content = await res.text();
    const name = url.split("/").pop() || "external.txt";
    const ext = name.split(".").pop()?.toLowerCase() || "txt";
    let type: File["type"] = "other";
    if (ext === "py") type = "python";
    else if (ext === "html") type = "html";
    else if (ext === "css") type = "css";
    else if (ext === "js") type = "js";
    else if (ext === "md") type = "md";
    else if (ext === "txt") type = "txt";
    saveFile(name, content, type);
    return { name, content, type };
  } catch (err: any) {
    console.error(err);
    throw err;
  }
}
