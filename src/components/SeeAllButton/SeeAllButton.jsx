import { Link } from "react-router-dom";
import useTerminalTyping from "../../hooks/useTerminalTyping";

export default function SeeAllButton({ to, children = "See all" }) {
  const label = typeof children === "string" ? children : "See all";
  const { text, isTyping, runType } = useTerminalTyping(label);

  return (
    <Link
      to={to}
      className={`see-all-button${isTyping ? " is-typing" : ""}`}
      onMouseEnter={runType}
      onFocus={runType}
    >
      <span className="see-all-button__label">
        <span className="see-all-button__label-sizer" aria-hidden="true">
          {label}
          <span className="see-all-button__cursor" aria-hidden="true" />
        </span>
        <span className="see-all-button__label-text">
          {text}
          <span className="see-all-button__cursor" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}
