import { useOutletContext } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PlaygroundTile, { PLAYGROUND_TILES_PAGE } from "../components/PlaygroundTile";

export default function PlaygroundPage() {
  const { reduced } = useOutletContext();

  return (
    <main id="main" className="page-listing">
      <section
        className="container-site"
        aria-labelledby="playground-page-heading"
      >
        <PageHeader
          title="Playground"
          headingId="playground-page-heading"
          reduced={reduced}
        />
        <ul className="playground-list grid-12">
          {PLAYGROUND_TILES_PAGE.map((tile) => (
            <li key={tile.id} className="playground-list__item">
              <PlaygroundTile {...tile} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
