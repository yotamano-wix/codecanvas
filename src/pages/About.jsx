import { Palette, Github, Code2, Layers, Zap, Eye } from "lucide-react";

const features = [
  {
    icon: Github,
    title: "GitHub Integration",
    description: "Connect any public or private GitHub repository instantly. Browse the full file tree and explore your codebase.",
  },
  {
    icon: Palette,
    title: "Design Token Extraction",
    description: "Automatically parse CSS, SCSS, and token files to surface colors, spacing, typography, and other design variables.",
  },
  {
    icon: Code2,
    title: "Source Code Viewer",
    description: "View any file's source with syntax highlighting. Jump between components and token definitions with ease.",
  },
  {
    icon: Layers,
    title: "Component Canvas",
    description: "Visualize and explore individual components in isolation, making it easy to understand your design system's building blocks.",
  },
  {
    icon: Eye,
    title: "Demo Mode",
    description: "No token needed. Explore popular open-source design systems like shadcn/ui right out of the box.",
  },
  {
    icon: Zap,
    title: "Instant Loading",
    description: "Fast, efficient file tree traversal and content loading so you can focus on exploring, not waiting.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
          <Palette className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">DesignScope</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          A powerful design system explorer that connects directly to your GitHub repositories, 
          letting you browse components, extract design tokens, and visualize your UI building blocks — all in one place.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-slate-900 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-4.5 h-4.5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}