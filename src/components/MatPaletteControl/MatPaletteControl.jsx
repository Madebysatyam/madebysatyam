import { useEffect, useRef, useState } from "react";
import { DEFAULT_MAT_PALETTE, MAT_PALETTES } from "./matPalettes.js";

const HOLD_TO_DRAG_MS = 200;

function PaletteBlobs() {
  return (
    <span className="hero-mat-palette__blobs" aria-hidden="true">
      {MAT_PALETTES.map((palette) => (
        <span
          key={palette.id}
          className="hero-mat-palette__blob"
          data-palette={palette.id}
        />
      ))}
      <span className="hero-mat-palette__blob" data-palette="pink" />
    </span>
  );
}

export default function MatPaletteControl({
  value = DEFAULT_MAT_PALETTE,
  onChange,
}) {
  const rootRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const options = MAT_PALETTES;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  const selectPalette = (paletteId) => {
    if (paletteId && paletteId !== value) {
      onChange?.(paletteId);
    }
    setIsOpen(false);
  };

  const onTogglePointerDown = () => {
    setIsOpen((open) => !open);
    const started = performance.now();

    const onPointerUp = (event) => {
      window.removeEventListener("pointerup", onPointerUp);

      if (performance.now() - started < HOLD_TO_DRAG_MS) {
        return;
      }

      const paletteId = event.target
        ?.closest?.("[data-palette]")
        ?.getAttribute("data-palette");
      selectPalette(paletteId);
    };

    window.addEventListener("pointerup", onPointerUp);
  };

  return (
    <div
      ref={rootRef}
      className={`hero-mat-palette${isOpen ? " is-open" : ""}`}
    >
      <div className="hero-mat-palette__face">
        <button
          type="button"
          className="hero-mat-palette__toggle"
          aria-expanded={isOpen}
          aria-label="Change cutting mat colour"
          onPointerDown={onTogglePointerDown}
        >
          <PaletteBlobs />
        </button>
      </div>
      {options.map((palette, index) => {
        const isSelected = value === palette.id;

        return (
          <button
            key={palette.id}
            type="button"
            className={`hero-mat-palette__swatch${isSelected ? " is-selected" : ""}`}
            data-palette={palette.id}
            data-idx={index}
            aria-label={palette.label}
            aria-pressed={isSelected}
            tabIndex={isOpen ? 0 : -1}
            onClick={() => selectPalette(palette.id)}
          />
        );
      })}
    </div>
  );
}
