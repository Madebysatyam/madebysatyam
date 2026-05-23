import loopHealthLogo from "../../../assets/logos/loop-health.png";
import metaLogo from "../../../assets/logos/meta.png";
import olaElectricLogo from "../../../assets/logos/ola-electric.png";

export const TESTIMONIAL_TILES = [
  {
    id: "kw-01",
    name: "Niteesh Yadav",
    role: "AVP of design Pocket FM | Ex",
    roleLogo: { src: metaLogo, alt: "Meta", layout: "mark" },
    quote:
      "Satyam’s exceptional contributions to the design system have truly set him apart. Satyam’s proactive collaboration with developers to resolve issues, along with his independent initiatives to enhance the quality of design within our team, demonstrate his commitment to excellence. He consistently upholds visual and overall experience benchmarks across all his work, making a significant impact on our projects.",
  },
  {
    id: "kw-neeru",
    name: "Neeru Yadav",
    role: "Senior product designer Pocket FM | Ex",
    roleLogo: {
      src: loopHealthLogo,
      alt: "Loop Health",
      layout: "wordmark",
      logoClass: "testimonial-tile__role-logo--loop",
    },
    quote:
      "Satyam played a key role in the Android revamp, showing strong ownership and proactive problem-solving across both flow-level and system-level issues. He was highly responsive, often joining calls to unblock teams in real time. His ability to quickly align context and drive solutions improved both execution speed and overall quality.",
  },
  {
    id: "kw-divya",
    name: "Divya Bhatia",
    role: "Lead product designer Pocket FM | Ex",
    roleLogo: {
      src: olaElectricLogo,
      alt: "Ola Electric",
      layout: "wordmark",
      logoClass: "testimonial-tile__role-logo--ola",
    },
    quote:
      "Kudos to Satyam for handling stuff proactively and getting up-to-speed so quickly. It feels so amazing to have been surrounded by such enthusiastic designers.",
  },
];
