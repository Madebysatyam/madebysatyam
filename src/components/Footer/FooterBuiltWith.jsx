import cursorLogo from "../../../assets/cursor-logo.png";

const BUILT_WITH_TEXT = "Built with Intent, not templates on Cursor";

export default function FooterBuiltWith() {
  return (
    <p className="site-footer__built text-style-label-small">
      <span className="site-footer__built-inner">
        <span className="site-footer__built-shimmer-wrap">
          <span className="site-footer__built-text">{BUILT_WITH_TEXT}</span>
          <span className="site-footer__built-shimmer" aria-hidden="true">
            {BUILT_WITH_TEXT}
          </span>
        </span>
        <img
          className="site-footer__built-cursor-logo"
          src={cursorLogo}
          alt=""
          width="20"
          height="20"
          decoding="async"
        />
      </span>
    </p>
  );
}
