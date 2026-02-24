import { useState, useMemo } from "react";
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function buildTree(files) {
  const root = {};
  files.forEach(f => {
    if (f.type !== "blob") return;
    const parts = f.path.split("/");
    let node = root;
    parts.forEach((part, i) => {
      if (i === parts.length - 1) {
        node[part] = { __file: true, path: f.path };
      } else {
        node[part] = node[part] || {};
        node = node[part];
      }
    });
  });
  return root;
}

function TreeNode({ name, node, depth, onSelect, selectedPath }) {
  const isFile = node.__file;
  const [open, setOpen] = useState(depth < 2);

  if (isFile) {
    const ext = name.split(".").pop();
    const isCode = ["js", "jsx", "ts", "tsx", "css", "scss", "json"].includes(ext);
    if (!isCode) return null;
    return (
      <button
        onClick={() => onSelect(node.path)}
        className={`w-full text-left flex items-center gap-1.5 px-2 py-1 rounded text-xs hover:bg-white/10 transition-colors ${selectedPath === node.path ? "bg-blue-500/20 text-blue-300" : "text-slate-300"}`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <File className="w-3 h-3 shrink-0 text-slate-500" />
        <span className="truncate">{name}</span>
      </button>
    );
  }

  const children = Object.entries(node).filter(([k]) => !k.startsWith("__"));
  if (!children.length) return null;

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center gap-1.5 px-2 py-1 rounded text-xs hover:bg-white/10 text-slate-400 transition-colors"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        {open ? <FolderOpen className="w-3 h-3 text-yellow-400" /> : <Folder className="w-3 h-3 text-yellow-400" />}
        <span className="font-medium">{name}</span>
      </button>
      {open && children.map(([k, v]) => (
        <TreeNode key={k} name={k} node={v} depth={depth + 1} onSelect={onSelect} selectedPath={selectedPath} />
      ))}
    </div>
  );
}

export default function FileExplorer({ tree, onSelect, selectedPath }) {
  const [search, setSearch] = useState("");

  const treeData = useMemo(() => buildTree(tree), [tree]);

  const filteredFiles = useMemo(() => {
    if (!search) return null;
    return tree.filter(f => f.type === "blob" && f.path.toLowerCase().includes(search.toLowerCase()) && /\.(jsx?|tsx?|css|scss|json)$/.test(f.path));
  }, [search, tree]);

  return (
    <div className="h-full flex flex-col bg-slate-900 border-r border-white/10">
      <div className="p-3 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
          <Input
            placeholder="Search files..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-7 h-7 text-xs bg-white/5 border-white/10 text-white placeholder:text-slate-500"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {filteredFiles ? (
          filteredFiles.map(f => (
            <button
              key={f.path}
              onClick={() => onSelect(f.path)}
              className={`w-full text-left flex items-center gap-2 px-3 py-1 text-xs hover:bg-white/10 transition-colors ${selectedPath === f.path ? "bg-blue-500/20 text-blue-300" : "text-slate-300"}`}
            >
              <File className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="truncate">{f.path}</span>
            </button>
          ))
        ) : (
          Object.entries(treeData).map(([k, v]) => (
            <TreeNode key={k} name={k} node={v} depth={0} onSelect={onSelect} selectedPath={selectedPath} />
          ))
        )}
      </div>
    </div>
  );
}