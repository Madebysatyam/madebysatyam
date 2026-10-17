import logo from "../../../assets/logo.svg";
import useCmsResource from "../../hooks/useCmsResource.js";
import { fetchSiteSettings, mapCmsFooterMeta } from "../../lib/cms.js";
import FooterBuiltWith from "./FooterBuiltWith.jsx";
import FooterMetaRow from "./FooterMetaRow.jsx";
import FooterRoleLine from "./FooterRoleLine.jsx";
import { FOOTER_META } from "./footerMeta.js";
import useFooterDate from "./useFooterDate.js";
import useFooterRoleCycle from "./useFooterRoleCycle.js";

export default function Footer() {
  const { label: dateLabel, dateTime } = useFooterDate();
  const role = useFooterRoleCycle();
  const footerMeta = useCmsResource(async () => {
    const doc = await fetchSiteSettings();
    return mapCmsFooterMeta(doc, null);
  }, FOOTER_META);

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
          {footerMeta.map((row) => (
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
