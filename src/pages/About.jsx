import { useState } from "react";
import { Link } from "react-router-dom";
import { Palette, Github, Code2, Layers, CheckCircle2, ArrowLeft, Star } from "lucide-react";
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
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Lead Designer @ Vercel",
    avatar: "SC",
    quote: "CodeCanvas transformed how our team explores design tokens. What used to take hours now takes minutes.",
  },
  {
    name: "Marcus Webb",
    role: "Frontend Engineer @ Linear",
    avatar: "MW",
    quote: "Finally a tool that bridges the gap between design and code. The component canvas is a game changer.",
  },
  {
    name: "Priya Nair",
    role: "Design Systems @ Figma",
    avatar: "PN",
    quote: "The GitHub integration is seamless. Our entire team adopted it in a single day — zero onboarding friction.",
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
    <div className="min-h-screen bg-[#0a0614] text-white">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-purple-700/20 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-700/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[350px] h-[350px] rounded-full bg-indigo-600/15 blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center gap-4 px-6 py-4 max-w-5xl mx-auto">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2 ml-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Palette className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm">CodeCanvas</span>
          </div>
        </nav>

        {/* Hero */}
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-xs text-blue-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            Design System Explorer
          </div>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6 shadow-lg shadow-purple-500/30">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-5 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
            CodeCanvas
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A powerful design system explorer that connects directly to your GitHub repositories,
            letting you browse components, extract design tokens, and visualize your UI building blocks — all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto px-6 pb-24">
          <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3 text-center">What's inside</p>
          <h2 className="text-2xl font-bold text-center mb-10">Everything you need to explore your design system</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/40 hover:bg-white/8 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-5xl mx-auto px-6 pb-24">
          <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3 text-center">Testimonials</p>
          <h2 className="text-2xl font-bold text-center mb-10">Loved by design teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waitlist */}
        <div className="max-w-xl mx-auto px-6 pb-24 text-center">
          <div className="bg-gradient-to-br from-blue-950/60 to-purple-950/60 border border-purple-500/30 rounded-2xl p-8 shadow-xl shadow-purple-900/20">
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white font-semibold rounded-lg py-2.5 text-sm transition-opacity"
                  >
                    {loading ? "Submitting..." : "Join Waitlist"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}