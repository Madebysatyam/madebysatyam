import { useOutletContext } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function AboutPage() {
  const { reduced } = useOutletContext();

  return (
    <main id="main" className="page-listing">
      <section
        className="container-site"
        aria-labelledby="about-page-heading"
      >
        <PageHeader
          title="About"
          headingId="about-page-heading"
          reduced={reduced}
        />
        <p className="about-page__intro text-style-paragraph-large">
          Designer and maker building product surfaces, systems, and editorial
          experiences — with a bias for clarity, restraint, and craft.
        </p>
      </section>
    </main>
  );
}
