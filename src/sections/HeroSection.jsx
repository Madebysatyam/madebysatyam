import { useCallback, useState } from "react";
import CuttingMat from "../components/CuttingMat";
import HeroBodyHighlight from "../components/HeroBodyHighlight";
import HeroHeadlineFlipper from "../components/HeroHeadlineFlipper";
import HeroLocationRoute from "../components/HeroLocationRoute";
import HeroMatStickers from "../components/HeroMatStickers";

const HERO_HEADLINE = "Curious by nature, careful by craft.";

export default function HeroSection() {
  const [isMatComplete, setIsMatComplete] = useState(false);
  const handleMatDrawComplete = useCallback(() => {
    setIsMatComplete(true);
  }, []);

  return (
    <section
      className={`hero${isMatComplete ? " is-mat-complete" : ""}`}
      aria-label="Hero"
    >
      <div className="hero__bg">
        <div className="hero__bg-mat" aria-hidden="true">
          <CuttingMat onDrawComplete={handleMatDrawComplete} />
        </div>
        {isMatComplete ? <HeroMatStickers /> : null}
      </div>
      <div className="hero__content container-site">
        {isMatComplete ? (
          <div className="hero__copy">
            <div className="hero__text-backdrop" aria-hidden="true" />
            <div className="hero__copy-foreground">
            <h1
              className="hero__headline text-style-display-medium"
              aria-label={HERO_HEADLINE}
            >
              <HeroHeadlineFlipper text={HERO_HEADLINE} />
            </h1>
            <p className="hero__body text-style-heading-x-large">
              A Senior Product Designer based in the mix between research, pixels and shipped
              products. I spend my days designing at{" "}
              <br className="hero__body-highlight-break" aria-hidden="true" />
              <HeroBodyHighlight>
                Pocket FM for a global audience of{" "}
                <span className="hero__body-highlight__tail">200M+.</span>
              </HeroBodyHighlight>
            </p>
            <div className="hero__footer">
              <p className="hero__aside text-style-label-medium">
                Nights and weekends? Guitar, badminton and breaking things with AI.
              </p>
              <HeroLocationRoute />
            </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
