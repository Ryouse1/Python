"use client";
import { useEffect, useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";

interface EditorPaneProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
}

export default function EditorPane({ code, language, onChange }: EditorPaneProps) {
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
  }

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      value={code}
      onChange={onChange}
      theme="vs-dark"
      onMount={handleEditorDidMount}
    />
  );
}
