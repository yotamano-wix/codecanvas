import { useState } from "react";
import { Link } from "react-router-dom";
import { Palette, Github, Layers, CheckCircle2, ArrowLeft, ChevronDown, Quote } from "lucide-react";
import { base44 } from "@/api/base44Client";

const features = [
  {
    icon: Github,
    title: "GitHub Integration",
    description: "Connect any public or private GitHub repository instantly. Browse the full file tree and explore your codebase.",
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
    role: "Lead Designer at Vercel",
    quote: "CodeCanvas transformed how our team audits design systems. We cut our token review time in half.",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Frontend Engineer at Stripe",
    quote: "The component canvas is a game-changer. I can finally explore our UI library without spinning up the whole app.",
    avatar: "MJ",
  },
  {
    name: "Priya Patel",
    role: "Design Systems Lead at Shopify",
    quote: "We adopted CodeCanvas across all our teams. The GitHub integration makes onboarding new developers effortless.",
    avatar: "PP",
  },
];

const faqs = [
  {
    question: "How do I connect my GitHub repository?",
    answer: "Simply paste your repository URL or use the GitHub integration to authorize access. Both public and private repositories are supported.",
  },
  {
    question: "What file types are supported for design token extraction?",
    answer: "CodeCanvas supports CSS, SCSS, Less, JSON token files, and JavaScript/TypeScript theme configurations. We automatically detect and parse design variables from these formats.",
  },
  {
    question: "Is my source code stored on your servers?",
    answer: "No. CodeCanvas reads your repository contents on-demand via the GitHub API. We never store or cache your source code on our servers.",
  },
  {
    question: "Can I use CodeCanvas with a private repository?",
    answer: "Yes. After authorizing with GitHub, you can explore any repository you have access to, including private and organization-owned repos.",
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-slate-900/60 border border-blue-500/10 rounded-xl p-5 hover:border-blue-400/20 transition-colors"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-sm text-white">{question}</h3>
        <ChevronDown
          className={`w-4 h-4 text-blue-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>
      {open && (
        <p className="mt-3 text-slate-400 text-sm leading-relaxed">{answer}</p>
      )}
    </button>
  );
}

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
          <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Palette className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-sm">CodeCanvas</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-16 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 mb-6">
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
        <h2 className="text-sm font-semibold text-blue-400/70 uppercase tracking-widest mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-slate-900 border border-blue-500/15 rounded-xl p-5 hover:border-blue-400/30 transition-colors"
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

      {/* Testimonials */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-sm font-semibold text-blue-400/70 uppercase tracking-widest mb-8 text-center">What People Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-slate-900 border border-blue-500/15 rounded-xl p-5 hover:border-blue-400/30 transition-colors flex flex-col"
            >
              <Quote className="w-5 h-5 text-blue-400/40 mb-3" />
              <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto px-6 pb-20">
        <h2 className="text-sm font-semibold text-blue-400/70 uppercase tracking-widest mb-8 text-center">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      {/* Waitlist */}
      <div className="max-w-xl mx-auto px-6 pb-24 text-center">
        <div className="bg-blue-950/40 border border-blue-400/20 rounded-2xl p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle2 className="w-10 h-10 text-blue-400" />
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
                  className="w-full bg-blue-950/30 border border-blue-500/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-blue-950/30 border border-blue-500/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 text-white font-semibold rounded-lg py-2.5 text-sm transition-colors"
                >
                  {loading ? "Submitting..." : "Join Waitlist"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-slate-600 pb-8">Powered by React and Vite</p>
    </div>
  );
}
