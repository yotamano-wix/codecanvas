import { useState } from "react";
import { Link } from "react-router-dom";
import { Palette, Github, Code2, Layers, Zap, Eye, CheckCircle2, ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";

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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.WaitlistEntry.create({ email, name });
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="flex items-center gap-4 px-6 py-4 max-w-4xl mx-auto">
        <Link to="/" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="flex items-center gap-2 ml-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <Palette className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-sm">CodeCanvas</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-16 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 mb-6">
          <Palette className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">CodeCanvas</h1>
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
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Waitlist */}
      <div className="max-w-xl mx-auto px-6 pb-24 text-center">
        <div className="bg-white rounded-2xl p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
              <h3 className="text-lg font-semibold">You're on the list!</h3>
              <p className="text-slate-400 text-sm">We'll reach out when there's news. Thanks for your interest.</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-2">Join the Waitlist</h2>
              <p className="text-slate-400 text-sm mb-6">Be the first to know about updates and new features.</p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 disabled:opacity-50 text-white font-semibold rounded-lg py-2.5 text-sm transition-opacity"
                >
                  {loading ? "Submitting..." : "Join Waitlist"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}