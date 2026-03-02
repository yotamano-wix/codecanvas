import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Palette, Github, Code2, Layers, Sparkles, ArrowRight, Eye, Zap } from "lucide-react";

const features = [
  {
    icon: Github,
    title: "GitHub Integration",
    description: "Connect any public or private repo and browse its full file tree instantly.",
  },
  {
    icon: Palette,
    title: "Token Extraction",
    description: "Automatically parse CSS, SCSS, and theme files into structured design tokens.",
  },
  {
    icon: Layers,
    title: "Component Canvas",
    description: "Visualize components in isolation to understand your design system at a glance.",
  },
  {
    icon: Code2,
    title: "Source Viewer",
    description: "Syntax-highlighted source code with easy navigation between files.",
  },
  {
    icon: Eye,
    title: "Demo Mode",
    description: "Explore popular open-source design systems without any setup.",
  },
  {
    icon: Zap,
    title: "Instant Loading",
    description: "Fast file tree traversal so you can focus on exploring, not waiting.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">CodeCanvas</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/About" className="text-sm text-slate-400 hover:text-white transition-colors">
            About
          </Link>
          <Button asChild size="sm">
            <Link to="/DesignSystemVisualizer">
              Launch App
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Design system exploration, reimagined
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          Build Beautiful Interfaces
          <br />
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            directly from GitHub
          </span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          CodeCanvas connects to your repositories and lets you browse components,
          extract design tokens, and visualize your UI building blocks — all in one place.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/DesignSystemVisualizer">
              Get Started <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/About">
              Learn More
            </Link>
          </Button>
        </div>
      </section>

      {/* Preview mockup */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-xl border border-white/10 bg-slate-900/50 overflow-hidden shadow-2xl shadow-emerald-500/5">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-900">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="text-xs text-slate-500 ml-2 font-mono">codecanvas — design system visualizer</span>
          </div>
          <div className="flex h-64">
            <div className="w-48 border-r border-white/10 p-3 space-y-1.5">
              {["src/", "  components/", "    Button.tsx", "    Card.tsx", "  tokens/", "    colors.css", "    spacing.css"].map((item) => (
                <div key={item} className={`text-xs font-mono ${item.includes("colors") ? "text-emerald-400" : "text-slate-500"}`}>
                  {item}
                </div>
              ))}
            </div>
            <div className="flex-1 p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-8 rounded bg-emerald-500/20 border border-emerald-500/30" />
                  <div className="w-12 h-8 rounded bg-cyan-500/20 border border-cyan-500/30" />
                  <div className="w-12 h-8 rounded bg-purple-500/20 border border-purple-500/30" />
                  <div className="w-12 h-8 rounded bg-amber-500/20 border border-amber-500/30" />
                </div>
                <p className="text-xs text-slate-500">Design tokens extracted from your code</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8 text-center">
          Everything you need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-slate-900/50 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-12">
          <h2 className="text-2xl font-bold mb-3">Ready to explore?</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Connect your GitHub repo and start visualizing your design system in seconds.
          </p>
          <Button asChild size="lg">
            <Link to="/DesignSystemVisualizer">
              Launch CodeCanvas <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-600">
        Built with React, Vite, and Tailwind CSS
      </footer>
    </div>
  );
}
