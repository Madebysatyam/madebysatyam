export default function FooterMetaRow({ label, value, href }) {
  return (
    <div className="site-footer__meta-row">
      <span className="site-footer__meta-label text-style-label-small">{label}</span>
      {href ? (
        <a className="site-footer__meta-value text-style-paragraph-small" href={href}>
          {value}
        </a>
      ) : (
        <span className="site-footer__meta-value text-style-paragraph-small">{value}</span>
      )}
    </div>
  );
}
