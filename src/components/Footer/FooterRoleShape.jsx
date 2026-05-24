import { motion, useReducedMotion } from "framer-motion";
import { footerRoleShapeMorphTransition } from "../../motion/presets.js";
import { ROLE_SHAPE_PARAMS, buildRolePath } from "./footerRoleShapes.js";

export default function FooterRoleShape({ role }) {
  const reduced = useReducedMotion();
  const params = ROLE_SHAPE_PARAMS[role.id];
  const pathD = buildRolePath(params);

  return (
    <svg className="site-footer__role-shape" viewBox="0 0 100 100" aria-hidden="true">
      <motion.path
        fill={`var(${role.colorVar})`}
        initial={false}
        animate={{ d: pathD, fill: `var(${role.colorVar})` }}
        transition={footerRoleShapeMorphTransition(reduced)}
      />
    </svg>
  );
}
