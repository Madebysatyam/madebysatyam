import { useState } from "react";
import CuttingMat from "../components/CuttingMat";

export default function HeroSection() {
  const [isMatComplete, setIsMatComplete] = useState(false);

  return (
    <section
      className={`hero${isMatComplete ? " is-mat-complete" : ""}`}
      aria-label="Hero"
    >
      <div className="hero__bg" aria-hidden="true">
        <CuttingMat onDrawComplete={() => setIsMatComplete(true)} />
      </div>
    </section>
  );
}
