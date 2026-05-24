import { useReducedMotion } from "framer-motion";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function SiteLayout() {
  const reduced = useReducedMotion();

  return (
    <>
      <Navbar />
      <div className="page-home">
        <Outlet context={{ reduced }} />
        <Footer />
      </div>
    </>
  );
}
