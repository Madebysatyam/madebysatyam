import cursorLogo from "../../../assets/cursor-logo.png";

const BUILT_WITH_LINE_ONE = "Built with intent, not templates.";
const BUILT_WITH_LINE_TWO = "Made in Cursor.";

function BuiltWithShimmerLine({ text }) {
  return (
    <span className="site-footer__built-shimmer-wrap">
      <span className="site-footer__built-text">{text}</span>
      <span className="site-footer__built-shimmer" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

export default function FooterBuiltWith() {
  return (
    <p className="site-footer__built text-style-label-small">
      <span className="site-footer__built-inner">
        <span className="site-footer__built-desktop-line">
          <BuiltWithShimmerLine text={`${BUILT_WITH_LINE_ONE} ${BUILT_WITH_LINE_TWO}`} />
          <img
            className="site-footer__built-cursor-logo"
            src={cursorLogo}
            alt=""
            width="20"
            height="20"
            decoding="async"
          />
        </span>

        <span className="site-footer__built-line">
          <BuiltWithShimmerLine text={BUILT_WITH_LINE_ONE} />
        </span>
        <span className="site-footer__built-line site-footer__built-line--cursor">
          <BuiltWithShimmerLine text={BUILT_WITH_LINE_TWO} />
          <img
            className="site-footer__built-cursor-logo"
            src={cursorLogo}
            alt=""
            width="20"
            height="20"
            decoding="async"
          />
        </span>
      </span>
    </p>
  );
}
