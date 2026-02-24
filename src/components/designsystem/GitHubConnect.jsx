import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Github, Loader2, Lock, ChevronRight, Zap } from "lucide-react";

const DEMO_REPOS = [
  { name: "shadcn-ui/ui", default_branch: "main", description: "Beautifully designed components — Tailwind CSS & Radix UI" },
  { name: "tailwindlabs/tailwindcss", default_branch: "main", description: "A utility-first CSS framework for rapid UI development" },
  { name: "storybookjs/storybook", default_branch: "next", description: "Frontend workshop for building UI components and pages" },
];

export default function GitHubConnect({ onConnected }) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [branch, setBranch] = useState("main");
  const [step, setStep] = useState("token"); // token | repos | config

  const loadDemoRepos = () => {
    setRepos(DEMO_REPOS);
    setStep("repos");
  };

  const loadRepos = async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    const res = await base44.functions.invoke("githubProxy", { action: "list_repos", token });
    setLoading(false);
    if (res.data.error) { setError(res.data.error); return; }
    setRepos(res.data.repos);
    setStep("repos");
  };

  const selectRepo = (repo) => {
    setSelectedRepo(repo);
    setBranch(repo.default_branch || "main");
    setStep("config");
  };

  const finish = () => {
    onConnected({ token, repo: selectedRepo.name, branch });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-4">
            <Github className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Design System Visualizer</h1>
          <p className="text-slate-400">Connect your GitHub repo to explore components & tokens</p>
        </div>

        {step === "token" && (
          <div className="space-y-4">
            {/* Demo Option */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 text-white cursor-pointer hover:border-blue-400/50 transition-all" onClick={loadDemoRepos}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">Try Demo (No Token Needed)</div>
                  <div className="text-xs text-slate-400 mt-0.5">Explore public repos like shadcn/ui, Tailwind CSS, Storybook</div>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </CardContent>
            </Card>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-slate-500">or connect your own repos</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2"><Lock className="w-4 h-4" /> Connect GitHub</CardTitle>
                <CardDescription className="text-slate-400">Enter a Personal Access Token with <code className="bg-white/10 px-1 rounded text-xs">repo</code> scope</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Personal Access Token</Label>
                  <Input
                    type="password"
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-500"
                    onKeyDown={e => e.key === "Enter" && loadRepos()}
                  />
                  <p className="text-xs text-slate-500">
                    Create one at <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">github.com/settings/tokens</a>
                  </p>
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button onClick={loadRepos} disabled={!token || loading} className="w-full bg-white text-slate-900 hover:bg-slate-100">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Browse Repositories
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === "repos" && (
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="text-white">Select Repository</CardTitle>
              <CardDescription className="text-slate-400">{repos.length} repositories found</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {repos.map(repo => (
                  <button
                    key={repo.name}
                    onClick={() => selectRepo(repo)}
                    className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-medium text-sm text-white">{repo.name}</div>
                      {repo.description && <div className="text-xs text-slate-400 mt-0.5 truncate max-w-xs">{repo.description}</div>}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
              <Button variant="outline" onClick={() => setStep("token")} className="mt-4 w-full border-white/20 text-slate-300 hover:bg-white/10">Back</Button>
            </CardContent>
          </Card>
        )}

        {step === "config" && selectedRepo && (
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="text-white">Configure</CardTitle>
              <CardDescription className="text-slate-400">{selectedRepo.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Branch</Label>
                <Input value={branch} onChange={e => setBranch(e.target.value)} className="bg-white/10 border-white/20 text-white" />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("repos")} className="flex-1 border-white/20 text-slate-300 hover:bg-white/10">Back</Button>
                <Button onClick={finish} className="flex-1 bg-white text-slate-900 hover:bg-slate-100">
                  Open Visualizer <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}