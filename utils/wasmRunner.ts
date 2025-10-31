import { File } from "./fileStorage";

export async function runWasmLanguage(lang: string, files: File[], mainCode: string) {
  // WebContainersやWASM環境向けラッパー
  // 実際はStackBlitz WebContainer等を統合
  // lang: "node", "cpp", "rust", "go"
  // files: 全ファイル内容
  // mainCode: 実行したいメインコード
  return `実行結果(${lang}) : ${mainCode.substring(0,50)}...`;
}
