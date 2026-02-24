import { useState } from "react";
import { Copy, Check, WrapText } from "lucide-react";

function highlight(code, filename) {
  if (!filename) return code;
  const ext = filename.split(".").pop();
  // Simple syntax highlighting via spans - just escape HTML
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(\/\/[^\n]*)/g, '<span class="text-slate-500">$1</span>')
    .replace(/("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/g, '<span class="text-green-400">$1</span>')
    .replace(/\b(import|export|default|from|const|let|var|function|return|if|else|for|while|class|extends|new|typeof|instanceof|async|await|try|catch|throw)\b/g, '<span class="text-purple-400">$1</span>')
    .replace(/\b(true|false|null|undefined|this)\b/g, '<span class="text-orange-400">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="text-yellow-400">$1</span>');
}

export default function CodeViewer({ content, filename }) {
  const [copied, setCopied] = useState(false);
  const [wrap, setWrap] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = content.split("\n");

  return (
    <div className="h-full flex flex-col bg-slate-950">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-slate-900">
        <span className="text-xs text-slate-400 font-mono">{filename}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600">{lines.length} lines</span>
          <button onClick={() => setWrap(!wrap)} className={`p-1 rounded hover:bg-white/10 transition-colors ${wrap ? "text-blue-400" : "text-slate-500"}`}>
            <WrapText className="w-3.5 h-3.5" />
          </button>
          <button onClick={copy} className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-white/10 text-slate-400 transition-colors">
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="select-none text-right pr-4 pl-4 py-0 text-xs text-slate-700 font-mono w-12 border-r border-white/5 align-top leading-5">
                  {i + 1}
                </td>
                <td className={`pl-4 pr-4 py-0 text-xs font-mono text-slate-300 leading-5 ${wrap ? "whitespace-pre-wrap break-all" : "whitespace-pre"}`}
                  dangerouslySetInnerHTML={{ __html: highlight(line, filename) || "&nbsp;" }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}