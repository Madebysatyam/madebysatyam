import { motion } from "framer-motion";
import {
  mobileNavItemVariants,
  mobileNavListVariants,
  navbarDesktopLinkMotion,
  navbarDesktopNavMotion,
} from "../../motion/presets.js";
import NavLink from "../NavLink.jsx";
import { NAV_LINKS } from "./navLinks.js";

export default function NavLinksList({
  isMobile,
  isOpen,
  isCompact,
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
    <motion.ul
      className="site-nav__list"
      initial={false}
      animate={navbarDesktopNavMotion(reduced)}
    >
      {NAV_LINKS.map((link) => (
        <motion.li
          key={link.href}
          initial={false}
          animate={navbarDesktopLinkMotion(reduced, isCompact)}
        >
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
