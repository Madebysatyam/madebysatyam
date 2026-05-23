import TestimonialTile from "../TestimonialTile";

export default function TestimonialTicker({ tiles }) {
  const loopTiles = [...tiles, ...tiles];

  return (
    <div className="kind-words-ticker" aria-label="Testimonials">
      <div className="kind-words-ticker__viewport">
        <ul className="kind-words-ticker__track">
          {loopTiles.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              className="kind-words-ticker__item"
              aria-hidden={index >= tiles.length ? true : undefined}
            >
              <TestimonialTile {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
