export function initTemplateFiles() {
  if (Object.keys(localStorage).length === 0) {
    localStorage.setItem("main.py", `print("Hello, Ryouse1! 👋")\nprint("Welcome to your Python Web IDE.")`);
    localStorage.setItem("README.md", "# My Python Project\nWelcome to RyouseLab IDE.");
    localStorage.setItem(".replit", 'run = "python3 main.py"\nlanguage = "python"');
    localStorage.setItem("requirements.txt", "requests\nnumpy");
    localStorage.setItem("utils.py", "def add(a,b): return a+b");
    localStorage.setItem("data/sample.txt", "Hello World");
  }
}

export function saveFile(name: string, content: string) {
  localStorage.setItem(name, content);
}

export function loadFiles() {
  return Object.entries(localStorage).map(([name, content]) => ({ name, content: content as string }));
}

export function deleteFile(name: string) {
  localStorage.removeItem(name);
}
