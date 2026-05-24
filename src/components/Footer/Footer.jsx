import logo from "../../../assets/logo.svg";
import FooterMetaRow from "./FooterMetaRow.jsx";
import { FOOTER_META } from "./footerMeta.js";
import useFooterDate from "./useFooterDate.js";
import FooterBuiltWith from "./FooterBuiltWith.jsx";
import FooterRoleLine from "./FooterRoleLine.jsx";
import useFooterRoleCycle from "./useFooterRoleCycle.js";

export default function Footer() {
  const { label: dateLabel, dateTime } = useFooterDate();
  const role = useFooterRoleCycle();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer__inner container-site">
        <div className="site-footer__left">
          <a className="site-footer__brand" href="/" aria-label="Madebysatyam home">
            <img
              className="site-footer__logo site-brand__logo"
              src={logo}
              alt=""
              width="166"
              height="56"
              decoding="async"
            />
          </a>
          <FooterRoleLine role={role} />
          <time className="site-footer__date text-style-label-small" dateTime={dateTime}>
            {dateLabel}
          </time>
        </div>

        <div className="site-footer__meta">
          {FOOTER_META.map((row) => (
            <FooterMetaRow key={row.id} label={row.label} value={row.value} href={row.href} />
          ))}
        </div>
      </div>
      <div className="site-footer__built-row container-site">
        <FooterBuiltWith />
      </div>
    </footer>
  );
}
