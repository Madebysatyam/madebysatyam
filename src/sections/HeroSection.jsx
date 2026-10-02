import { useCallback, useEffect, useState } from "react";
import CuttingMat from "../components/CuttingMat";
import MatPaletteControl, { DEFAULT_MAT_PALETTE } from "../components/MatPaletteControl";
import { useMatIntro } from "../contexts/MatIntroContext.jsx";
import HeroBodyHighlight from "../components/HeroBodyHighlight";
import HeroHeadlineFlipper from "../components/HeroHeadlineFlipper";
import HeroLocationRoute from "../components/HeroLocationRoute";
import HeroMatScale from "../components/HeroMatScale";
import HeroMatStickers from "../components/HeroMatStickers";

const HERO_HEADLINE = "Curious by nature, careful by craft.";

export default function HeroSection() {
  const { setMatReady } = useMatIntro();
  const [isMatComplete, setIsMatComplete] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState(DEFAULT_MAT_PALETTE);
  const [appliedPalette, setAppliedPalette] = useState(DEFAULT_MAT_PALETTE);
  const [isRecolor, setIsRecolor] = useState(false);
  const handleMatDrawComplete = useCallback(() => {
    setIsMatComplete(true);
    setMatReady(true);
  }, [setMatReady]);

  useEffect(() => {
    if (!isMatComplete || selectedPalette === appliedPalette) {
      return undefined;
    }

    setIsRecolor(true);
    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => {
        setAppliedPalette(selectedPalette);
        setIsRecolor(false);
      });
    });

    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
    };
  }, [isMatComplete, selectedPalette, appliedPalette]);

  return (
    <section
      className={`hero${isMatComplete ? " is-mat-complete" : ""}`}
      data-mat-palette={appliedPalette}
      aria-label="Hero"
    >
      <div className="hero__bg">
        <div className="hero__bg-mat" aria-hidden="true">
          <CuttingMat onDrawComplete={handleMatDrawComplete} recolor={isRecolor} />
        </div>
        {isMatComplete ? <HeroMatStickers /> : null}
        {isMatComplete ? <HeroMatScale /> : null}
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
      {isMatComplete ? (
        <MatPaletteControl value={selectedPalette} onChange={setSelectedPalette} />
      ) : null}
    </section>
  );
}
