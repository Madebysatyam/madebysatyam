import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NoteCategoryTag from "../components/NoteItem/NoteCategoryTag.jsx";
import { getNoteArticle } from "../components/NoteItem/notes.js";

const MEASURE_MIN = 20;
const MEASURE_MAX = 80;
const MEASURE_DEFAULT = 66;
const RULER_MARKS = [0, 10, 20, 30, 40, 50, 60, 70, 80];

function clampMeasure(value) {
  return Math.min(MEASURE_MAX, Math.max(MEASURE_MIN, value));
}

export default function NotePage() {
  const { slug } = useParams();
  const article = getNoteArticle(slug);
  const stageRef = useRef(null);
  const rulerRef = useRef(null);
  const sampleRef = useRef(null);
  const [measure, setMeasure] = useState(MEASURE_DEFAULT);

  useEffect(() => {
    document.title = article ? `${article.title} — Madebysatyam` : "Madebysatyam";
    return () => {
      document.title = "Madebysatyam";
    };
  }, [article]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--note-measure", `${measure}ch`);
    stage.style.setProperty("--note-measure-n", String(measure));
  }, [measure]);

  const measureFromClientX = useCallback((clientX) => {
    const ruler = rulerRef.current;
    const sample = sampleRef.current;
    if (!ruler || !sample) return null;

    const rulerRect = ruler.getBoundingClientRect();
    if (rulerRect.width <= 0) return null;

    const chPx = sample.getBoundingClientRect().width / 10;
    const fullWidth = chPx * MEASURE_MAX;
    const scaled = rulerRect.width < fullWidth - 1;
    const next = scaled
      ? Math.round(((clientX - rulerRect.left) / rulerRect.width) * MEASURE_MAX)
      : Math.round((clientX - rulerRect.left) / chPx);

    return clampMeasure(next);
  }, []);

  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // The down position still sets the measure when capture is unavailable.
    }
    stageRef.current?.classList.add("is-measuring");
    const next = measureFromClientX(event.clientX);
    if (next != null) setMeasure(next);
  };

  const onPointerMove = (event) => {
    if (!event.currentTarget.hasPointerCapture?.(event.pointerId)) return;
    const next = measureFromClientX(event.clientX);
    if (next != null) setMeasure(next);
  };

  const onPointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    stageRef.current?.classList.remove("is-measuring");
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setMeasure((current) => clampMeasure(current + 1));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setMeasure((current) => clampMeasure(current - 1));
    } else if (event.key === "Home") {
      event.preventDefault();
      setMeasure(MEASURE_MIN);
    } else if (event.key === "End") {
      event.preventDefault();
      setMeasure(MEASURE_MAX);
    }
  };

  if (!article) {
    return (
      <main id="main" className="note-page">
        <div className="note-page__stage container-site">
          <p className="note-page__missing text-style-paragraph-large">Note not found.</p>
          <Link className="note-page__back text-style-label-small" to="/Notes">
            Notes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="note-page">
      <div ref={stageRef} className="note-page__stage container-site">
        <div className="note-page__sheet">
        <span ref={sampleRef} className="note-measure__sample" aria-hidden="true">
          0000000000
        </span>

        <div
          ref={rulerRef}
          className="note-ruler"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="note-ruler__scale">
            <div className="note-ruler__ticks" aria-hidden="true" />
            {RULER_MARKS.map((mark) => (
              <span key={mark} className={`note-ruler__num note-ruler__num--${mark}`}>
                <span className="text-style-label-x-small">{mark}</span>
              </span>
            ))}
          </div>
          <div className="note-ruler__index" aria-hidden="true" />
        </div>

        <article className="note-page__column" aria-labelledby="note-heading">
          <header className="note-page__header">
            <h1 id="note-heading" className="note-page__title text-style-heading-1">
              {article.title}
            </h1>
            <p className="note-page__meta">
              <NoteCategoryTag category={article.category} />
              <time className="note-page__date text-style-label-small" dateTime="2026-10-03">
                {article.date}
              </time>
            </p>
            <p className="note-page__dek text-style-paragraph-large">{article.summary}</p>
          </header>
          <div className="note-page__prose">
            {article.sections.map((section) =>
              section.type === "h2" ? (
                <h2 key={section.text} className="text-style-heading-4">
                  {section.text}
                </h2>
              ) : (
                <p key={section.text} className="text-style-paragraph-large">
                  {section.text}
                </p>
              ),
            )}
          </div>

          <div
            className="note-measure"
            role="slider"
            tabIndex={0}
            aria-label="Line length in characters"
            aria-valuemin={MEASURE_MIN}
            aria-valuemax={MEASURE_MAX}
            aria-valuenow={measure}
            aria-valuetext={`${measure} characters`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onKeyDown={onKeyDown}
          >
            <span className="note-measure__line" aria-hidden="true" />
            <span className="note-measure__pill">
              <span className="note-measure__readout text-style-label-x-small">{measure}CH</span>
            </span>
          </div>
        </article>
        </div>
      </div>
    </main>
  );
}
