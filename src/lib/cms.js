const CMS_URL = (import.meta.env.VITE_CMS_URL || "http://localhost:3000").replace(/\/$/, "");

export function getCmsBaseUrl() {
  return CMS_URL;
}

export function cmsMediaUrl(media) {
  if (!media) return null;
  if (typeof media === "string") return media.startsWith("http") ? media : `${CMS_URL}${media}`;
  const url = media.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${CMS_URL}${url}`;
}

async function cmsFetch(pathname, params = {}) {
  const url = new URL(`${CMS_URL}${pathname}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`CMS request failed (${response.status}): ${url.pathname}`);
  }
  return response.json();
}

export async function fetchProjects({ limit = 50 } = {}) {
  const data = await cmsFetch("/api/projects", {
    limit,
    depth: 1,
    sort: "-updatedAt",
  });
  return data.docs ?? [];
}

export async function fetchProjectBySlug(slug) {
  const data = await cmsFetch("/api/projects", {
    "where[slug][equals]": slug,
    limit: 1,
    depth: 2,
  });
  return data.docs?.[0] ?? null;
}

export async function fetchNotes({ limit = 50 } = {}) {
  const data = await cmsFetch("/api/notes", {
    limit,
    depth: 0,
    sort: "-updatedAt",
  });
  return data.docs ?? [];
}

export async function fetchNoteBySlug(slug) {
  const data = await cmsFetch("/api/notes", {
    "where[slug][equals]": slug,
    limit: 1,
    depth: 1,
  });
  return data.docs?.[0] ?? null;
}

export async function fetchPlayground({ limit = 50 } = {}) {
  const data = await cmsFetch("/api/playground", {
    limit,
    depth: 1,
    sort: "-updatedAt",
  });
  return data.docs ?? [];
}

export async function fetchTestimonials({ limit = 50 } = {}) {
  const data = await cmsFetch("/api/testimonials", {
    limit,
    depth: 1,
    sort: "-updatedAt",
  });
  return data.docs ?? [];
}

export async function fetchAbout() {
  return cmsFetch("/api/globals/about", { depth: 1 });
}

export async function fetchSiteSettings() {
  return cmsFetch("/api/globals/site-settings", { depth: 0 });
}

export function mapCmsProject(doc) {
  if (!doc) return null;
  return {
    id: doc.slug || String(doc.id),
    slug: doc.slug,
    card: doc.card,
    page: {
      shortTitle: doc.shortTitle,
      ...doc.page,
    },
    markdown: doc.bodyMarkdown || "",
    layout: Array.isArray(doc.layout) ? doc.layout : [],
    source: "cms",
  };
}

export function mapCmsProjectCard(doc) {
  if (!doc?.card) return null;
  return {
    id: doc.slug || String(doc.id),
    href: `/projects/${doc.slug}`,
    ...doc.card,
  };
}

export function mapCmsProjectCards(docs) {
  return (docs || []).map(mapCmsProjectCard).filter(Boolean);
}

export function mapCmsNote(doc) {
  if (!doc) return null;
  return {
    id: doc.slug || String(doc.id),
    title: doc.title,
    summary: doc.summary,
    date: doc.date,
    category: doc.category,
    href: `/notes/${doc.slug}`,
    sections: (doc.sections || []).map((section, index) => {
      if (section.type === "image") {
        const image = typeof section.image === "object" ? section.image : null;
        return {
          id: section.id || `image-${index}`,
          type: "image",
          src: cmsMediaUrl(image),
          alt: image?.alt || section.caption || "",
          caption: section.caption || "",
        };
      }
      return {
        id: section.id || `${section.type}-${index}`,
        type: section.type,
        text: section.text,
      };
    }),
    source: "cms",
  };
}

export function mapCmsNotes(docs) {
  return (docs || []).map(mapCmsNote).filter(Boolean);
}

export function mapCmsPlaygroundItem(doc) {
  if (!doc) return null;
  const imageUrl = cmsMediaUrl(doc.image);
  return {
    id: String(doc.id),
    title: doc.title,
    date: doc.date,
    featured: Boolean(doc.featured),
    mediaLabel: doc.title ? `${doc.title} media` : "Image or video placeholder",
    imageSrc: imageUrl || undefined,
  };
}

export function mapCmsPlayground(docs) {
  return (docs || []).map(mapCmsPlaygroundItem).filter(Boolean);
}

export function mapCmsTestimonial(doc) {
  if (!doc) return null;
  const logoUrl = cmsMediaUrl(doc.logo);
  return {
    id: String(doc.id),
    name: doc.name,
    role: doc.role,
    quote: doc.quote,
    roleLogo: logoUrl
      ? {
          src: logoUrl,
          alt: doc.logoAlt || doc.name,
          layout: doc.logoLayout || "mark",
        }
      : undefined,
  };
}

export function mapCmsTestimonials(docs) {
  return (docs || []).map(mapCmsTestimonial).filter(Boolean);
}

export function mapCmsAbout(doc) {
  if (!doc) return null;

  const story = (doc.story || []).map((item) => item.text).filter(Boolean);
  const beliefs = (doc.beliefs || []).map((item, index) => ({
    id: `belief-${index}-${(item.title || "").toLowerCase().replace(/\s+/g, "-")}`,
    title: item.title,
    accent: item.accent,
    body: item.body,
  }));
  const experience = (doc.experience || []).map((companyItem) => ({
    company: companyItem.company,
    roles: (companyItem.roles || []).map((roleItem) => ({
      role: roleItem.role,
      duration: roleItem.duration,
      isCurrent: Boolean(roleItem.isCurrent),
      note: roleItem.note || "",
    })),
  }));
  const localAwardBadges = {
    "Pocket Star": "/awards/pocket-star-badge.png",
    "High Achiever": "/awards/high-achiever-badge.png",
  };
  const awards = (doc.awards || []).map((item) => ({
    company: item.company,
    duration: item.duration,
    badge: {
      src: cmsMediaUrl(item.badge) || localAwardBadges[item.company] || undefined,
      alt: item.badgeAlt || `${item.company} award badge`,
    },
  }));
  const closing = (doc.closing || []).map((item) => item.text).filter(Boolean);

  const hasContent =
    story.length || beliefs.length || experience.length || awards.length || closing.length;
  if (!hasContent) return null;

  return { story, beliefs, experience, awards, closing };
}

export function mapCmsFooterMeta(doc, fallback) {
  const footer = doc?.footer;
  if (!footer) return fallback;

  const next = [
    footer.email
      ? {
          id: "email",
          label: "Email",
          value: footer.email,
          href: `mailto:${footer.email}`,
        }
      : null,
    footer.status ? { id: "status", label: "Status", value: footer.status } : null,
    footer.response ? { id: "response", label: "Response", value: footer.response } : null,
    footer.based ? { id: "based", label: "Based", value: footer.based } : null,
  ].filter(Boolean);

  return next.length ? next : fallback;
}
