"use client";
import { useEffect, useRef } from "react";

interface LivePreviewProps {
  html: string;
}

export default function LivePreview({ html }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border border-zinc-700 rounded"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
