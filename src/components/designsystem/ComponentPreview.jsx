export default function ComponentPreview({ element }) {
  const { type, props } = element;

  switch (type) {
    case "button": {
      const colors = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-slate-600 hover:bg-slate-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        ghost: "bg-transparent border border-white/20 text-white hover:bg-white/10",
        outline: "bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500/10",
      };
      const sizes = { sm: "px-3 py-1 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
      return (
        <button className={`rounded-lg font-medium transition-colors ${colors[props.variant] || colors.primary} ${sizes[props.size] || sizes.md}`}>
          {props.text || "Button"}
        </button>
      );
    }
    case "input":
      return (
        <div className="space-y-1 max-w-xs">
          {props.label && <label className="text-xs font-medium text-slate-300">{props.label}</label>}
          <input
            placeholder={props.placeholder || "Enter text..."}
            className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      );
    case "card":
      return (
        <div className="max-w-sm rounded-xl border border-white/15 bg-white/5 p-5">
          <h3 className="font-semibold text-white mb-1">{props.title || "Card Title"}</h3>
          <p className="text-sm text-slate-400">{props.description || "Card description text."}</p>
        </div>
      );
    case "badge": {
      const badgeColors = {
        default: "bg-slate-700 text-slate-200",
        primary: "bg-blue-600/30 text-blue-300 border border-blue-500/30",
        success: "bg-green-600/30 text-green-300 border border-green-500/30",
        warning: "bg-yellow-600/30 text-yellow-300 border border-yellow-500/30",
        danger: "bg-red-600/30 text-red-300 border border-red-500/30",
      };
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColors[props.variant] || badgeColors.default}`}>
          {props.text || "Badge"}
        </span>
      );
    }
    case "text": {
      const sizes = { xs: "text-xs", sm: "text-sm", base: "text-base", lg: "text-lg", xl: "text-xl", "2xl": "text-2xl" };
      const weights = { light: "font-light", normal: "font-normal", medium: "font-medium", semibold: "font-semibold", bold: "font-bold" };
      return (
        <p className={`text-white ${sizes[props.size] || "text-base"} ${weights[props.weight] || "font-normal"}`}>
          {props.content || "Text content"}
        </p>
      );
    }
    case "divider":
      return <hr className="border-white/20 my-1" />;
    case "avatar": {
      const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base" };
      return (
        <div className={`rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold text-white ${sizes[props.size] || sizes.md}`}>
          {props.initials || "AB"}
        </div>
      );
    }
    case "alert": {
      const styles = {
        info: "bg-blue-500/10 border-blue-500/30 text-blue-300",
        success: "bg-green-500/10 border-green-500/30 text-green-300",
        warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
        error: "bg-red-500/10 border-red-500/30 text-red-300",
      };
      return (
        <div className={`px-4 py-3 rounded-lg border text-sm max-w-sm ${styles[props.variant] || styles.info}`}>
          {props.message || "Alert message"}
        </div>
      );
    }
    default:
      return <div className="text-slate-500 text-sm">Unknown element: {type}</div>;
  }
}