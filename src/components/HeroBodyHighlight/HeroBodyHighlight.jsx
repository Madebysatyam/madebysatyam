export default function HeroBodyHighlight({ children }) {
  return (
    <span className="hero__body-highlight">
      <span className="hero__body-highlight__text">{children}</span>
      <span className="hero__body-highlight__shimmer" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
