import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="max-w-2xl text-center">
        <p className="text-lg text-slate-300 leading-relaxed">
          DesignScope helps teams build better products.
        </p>
      </div>
    </div>
  );
}