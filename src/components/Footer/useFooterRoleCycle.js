import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FOOTER_ROLE_CYCLE_MS, FOOTER_ROLES } from "./footerRoles.js";

export { FOOTER_ROLES, FOOTER_ROLE_CYCLE_MS };

export default function useFooterRoleCycle() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % FOOTER_ROLES.length);
    }, FOOTER_ROLE_CYCLE_MS);

    return () => window.clearInterval(id);
  }, [reduced]);

  return FOOTER_ROLES[reduced ? 0 : index];
}
