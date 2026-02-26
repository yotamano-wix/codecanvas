import { useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import GitHubConnect from "../components/designsystem/GitHubConnect";
import FileExplorer from "../components/designsystem/FileExplorer";
import CodeViewer from "../components/designsystem/CodeViewer";
import TokensPanel from "../components/designsystem/TokensPanel";
import ComponentCanvas from "../components/designsystem/ComponentCanvas";
import { Loader2, Github, LogOut, Palette, Code2, Layers, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TABS = [
  { id: "canvas", label: "Canvas", icon: Layers },
  { id: "tokens", label: "Tokens", icon: Palette },
  { id: "code", label: "Source", icon: Code2 },
];

export default function DesignSystemVisualizer() {
  const [connection, setConnection] = useState(null);
  const [tree, setTree] = useState(null);
  const [loadingTree, setLoadingTree] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [loadingFile, setLoadingFile] = useState(false);
  const [activeTab, setActiveTab] = useState("canvas");

  const handleConnected = useCallback(async (conn) => {
    setConnection(conn);
    setLoadingTree(true);
    const res = await base44.functions.invoke("githubProxy", {
      action: "get_tree",
      token: conn.token,
      repo: conn.repo,
      branch: conn.branch,
    });
    setLoadingTree(false);
    if (res.data.error) { alert(res.data.error); return; }
    setTree(res.data.tree);
  }, []);

  const handleSelectFile = useCallback(async (path) => {
    setSelectedFile(path);
    setLoadingFile(true);
    setActiveTab("code");
    const res = await base44.functions.invoke("githubProxy", {
      action: "get_file",
      token: connection.token,
      repo: connection.repo,
      branch: connection.branch,
      path,
    });
    setLoadingFile(false);
    if (res.data.error) { alert(res.data.error); return; }
    setFileContent(res.data.content);

    // Auto-switch to tokens if it looks like a token file
    const isTokenFile = /tokens|theme|variables|colors|design-system/i.test(path) || path.endsWith(".css") || path.endsWith(".scss");
    if (isTokenFile) setActiveTab("tokens");
  }, [connection]);

  const disconnect = () => {
    setConnection(null);
    setTree(null);
    setSelectedFile(null);
    setFileContent("");
  };

  if (!connection) return <GitHubConnect onConnected={handleConnected} />;

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-3 border-b border-white/10 bg-slate-900 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <Palette className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-sm">CodeCanvas</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-600" />
        <div className="flex items-center gap-2">
          <Github className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sm text-slate-300">{connection.repo}</span>
          <Badge variant="outline" className="text-xs border-white/20 text-slate-400">{connection.branch}</Badge>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {selectedFile && (
            <span className="text-xs text-slate-500 font-mono truncate max-w-xs">{selectedFile}</span>
          )}
          <button onClick={disconnect} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Disconnect
          </button>
        </div>
      </header>

      {loadingTree ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Loading repository tree...</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* File Explorer */}
          <div className="w-56 shrink-0 overflow-hidden">
            {tree && <FileExplorer tree={tree} onSelect={handleSelectFile} selectedPath={selectedFile} />}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center gap-0 border-b border-white/10 bg-slate-900/50 px-4 pt-2 shrink-0">
              {TABS.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium border-b-2 transition-colors ${activeTab === tab.id ? "border-blue-500 text-white" : "border-transparent text-slate-500 hover:text-slate-300"}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              {activeTab === "canvas" && (
                <ComponentCanvas componentName={selectedFile?.split("/").pop()} />
              )}

              {activeTab === "tokens" && (
                loadingFile ? (
                  <div className="h-full flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                  </div>
                ) : fileContent ? (
                  <TokensPanel content={fileContent} filename={selectedFile} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500">
                    <Palette className="w-10 h-10 mb-3 opacity-30" />
                    <p className="text-sm">Select a CSS or token file to extract design tokens</p>
                  </div>
                )
              )}

              {activeTab === "code" && (
                loadingFile ? (
                  <div className="h-full flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                  </div>
                ) : fileContent ? (
                  <CodeViewer content={fileContent} filename={selectedFile} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500">
                    <Code2 className="w-10 h-10 mb-3 opacity-30" />
                    <p className="text-sm">Select a file from the explorer to view its source</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}