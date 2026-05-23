import { Link } from "react-router-dom";
import useTerminalTyping from "../hooks/useTerminalTyping";

function isClientRoute(href) {
  return href.startsWith("/") && !href.slice(1).includes("#");
}

export default function NavLink({ href, label, className, onNavigate }) {
  const { text, isTyping, runType } = useTerminalTyping(label);

  const linkClassName = `site-nav__link ${className} text-style-label-medium${isTyping ? " is-typing" : ""}`;
  const linkProps = {
    className: linkClassName,
    onMouseEnter: runType,
    onFocus: runType,
    onClick: onNavigate,
  };

  const children = (
    <>
      <span className="site-nav__terminal-text">{text}</span>
      <span className="site-nav__cursor" aria-hidden="true" />
    </>
  );

  if (isClientRoute(href)) {
    return (
      <Link to={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...linkProps}>
      {children}
    </a>
  );
}
