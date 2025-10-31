export interface File {
  name: string;
  content: string;
  type: "python" | "html" | "css" | "js" | "txt" | "md";
}

export function initTemplateFiles() {
  if (Object.keys(localStorage).length === 0) {
    saveFile("main.py", `print("Hello, Ryouse1! 👋")\nprint("Welcome to your Python Web IDE.")`, "python");
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
