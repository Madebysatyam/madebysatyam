import { motion, useReducedMotion } from "framer-motion";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../sections/SiteFooter.jsx";

export default function SiteLayout() {
  const reduced = useReducedMotion();

  return (
    <motion.div className="page-home" initial={false}>
      <Navbar />
      <Outlet context={{ reduced }} />
      <SiteFooter reduced={reduced} />
    </motion.div>
  );
}
