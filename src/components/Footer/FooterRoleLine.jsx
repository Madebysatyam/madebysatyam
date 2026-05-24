import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { footerRoleVerbDissolveVariants } from "../../motion/presets.js";
import FooterRoleShape from "./FooterRoleShape.jsx";

export default function FooterRoleLine({ role }) {
  const reduced = useReducedMotion();

  return (
    <p className="site-footer__role text-style-paragraph-small">
      <span className="site-footer__role-shape-wrap">
        <FooterRoleShape role={role} />
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={role.id}
          className="site-footer__role-verb"
          aria-live="polite"
          variants={footerRoleVerbDissolveVariants(reduced)}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {role.verb}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
