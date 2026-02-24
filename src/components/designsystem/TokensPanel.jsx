import { useMemo } from "react";

function extractTokens(content, filename) {
  const tokens = { colors: {}, typography: {}, spacing: {}, shadows: {}, radii: {}, other: {} };

  // CSS variables
  const cssVarMatches = content.matchAll(/--([a-zA-Z0-9-_]+)\s*:\s*([^;}\n]+)/g);
  for (const m of cssVarMatches) {
    const name = m[1];
    const value = m[2].trim();
    if (/color|bg|text|border|fill|stroke/i.test(name) || value.includes("#") || value.includes("rgb") || value.includes("hsl")) {
      tokens.colors[name] = value;
    } else if (/font|text|size|weight|line|letter/i.test(name)) {
      tokens.typography[name] = value;
    } else if (/space|gap|pad|margin|size/i.test(name)) {
      tokens.spacing[name] = value;
    } else if (/shadow/i.test(name)) {
      tokens.shadows[name] = value;
    } else if (/radius|rounded/i.test(name)) {
      tokens.radii[name] = value;
    } else {
      tokens.other[name] = value;
    }
  }

  // JS/TS token objects
  if (filename.endsWith(".js") || filename.endsWith(".ts") || filename.endsWith(".jsx") || filename.endsWith(".tsx")) {
    const colorMatches = content.matchAll(/['"]?([a-zA-Z0-9-_]+)['"]?\s*:\s*['"]?(#[0-9a-fA-F]{3,8}|rgb[a]?\([^)]+\)|hsl[a]?\([^)]+\))['"]?/g);
    for (const m of colorMatches) {
      tokens.colors[m[1]] = m[2];
    }
  }

  return tokens;
}

function ColorSwatch({ name, value }) {
  const isColor = value.includes("#") || value.includes("rgb") || value.includes("hsl") || (value.startsWith("var(") && !value.includes("shadow"));
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 group">
      {isColor ? (
        <div className="w-8 h-8 rounded-md border border-white/20 shrink-0 shadow-inner" style={{ background: value }} />
      ) : (
        <div className="w-8 h-8 rounded-md border border-white/20 bg-white/5 flex items-center justify-center text-xs text-slate-500">?</div>
      )}
      <div className="min-w-0">
        <div className="text-xs font-mono text-slate-200 truncate">{name}</div>
        <div className="text-xs text-slate-500 truncate">{value}</div>
      </div>
    </div>
  );
}

function TokenGroup({ title, tokens }) {
  const entries = Object.entries(tokens);
  if (!entries.length) return null;
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">{title}</h3>
      <div className="grid grid-cols-1 gap-0.5">
        {entries.map(([k, v]) => <ColorSwatch key={k} name={k} value={v} />)}
      </div>
    </div>
  );
}

export default function TokensPanel({ content, filename }) {
  const tokens = useMemo(() => extractTokens(content, filename), [content, filename]);
  const hasTokens = Object.values(tokens).some(g => Object.keys(g).length > 0);

  if (!hasTokens) {
    return (
      <div className="p-6 text-center text-slate-500 text-sm">
        No design tokens detected in this file.<br />
        <span className="text-xs">Open a CSS, SCSS, or tokens JS/TS file.</span>
      </div>
    );
  }

  return (
    <div className="p-4 overflow-y-auto h-full">
      <TokenGroup title="Colors" tokens={tokens.colors} />
      <TokenGroup title="Typography" tokens={tokens.typography} />
      <TokenGroup title="Spacing" tokens={tokens.spacing} />
      <TokenGroup title="Shadows" tokens={tokens.shadows} />
      <TokenGroup title="Border Radii" tokens={tokens.radii} />
      <TokenGroup title="Other" tokens={tokens.other} />
    </div>
  );
}