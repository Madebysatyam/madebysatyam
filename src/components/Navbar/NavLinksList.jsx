import { motion } from "framer-motion";
import { mobileNavItemVariants, mobileNavListVariants } from "../../motion/presets.js";
import NavLink from "../NavLink.jsx";
import { NAV_LINKS } from "./navLinks.js";

export default function NavLinksList({
  isMobile,
  isOpen,
  reduced,
  onNavigate,
}) {
  if (isMobile) {
    return (
      <motion.ul
        className="site-nav__list"
        initial="closed"
        animate="open"
        variants={mobileNavListVariants(reduced)}
      >
        {NAV_LINKS.map((link) => (
          <motion.li key={link.href} variants={mobileNavItemVariants(reduced)}>
            <NavLink
              href={link.href}
              label={link.label}
              className={link.className}
              onNavigate={onNavigate}
            />
          </motion.li>
        ))}
      </motion.ul>
    );
  }

  return (
    <ul className="site-nav__list">
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <NavLink
            href={link.href}
            label={link.label}
            className={link.className}
            onNavigate={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
}
