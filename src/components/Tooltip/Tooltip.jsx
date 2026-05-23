export default function Tooltip({ label, children, className = "" }) {
  return (
    <span
      className={`tooltip${className ? ` ${className}` : ""}`}
      tabIndex={0}
      aria-label={label}
    >
      {children}
      <span className="tooltip__bubble" role="tooltip">
        {label}
      </span>
    </span>
  );
}
