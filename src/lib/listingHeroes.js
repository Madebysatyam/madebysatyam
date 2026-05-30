/** Listing page hero assets — responsive variants + preload helpers. */

export const LISTING_HERO_PAGES = ["about", "notes", "playground"];

const HERO_PATH_BY_ROUTE = {
  "/about": "/about/hero.webp",
  "/Notes": "/notes/hero.webp",
  "/playground": "/playground/hero.webp",
};

const HERO_WIDTHS = [1280, 1920, 3840];

export function listingHeroBasePath(heroSrc) {
  return heroSrc.replace(/\/hero\.webp$/, "");
}

export function listingHeroSrcSet(heroSrc) {
  const base = listingHeroBasePath(heroSrc);
  return HERO_WIDTHS.map((width) => `${base}/hero-${width}.webp ${width}w`).join(", ");
}

export function listingHeroDefaultSrc(heroSrc) {
  return `${listingHeroBasePath(heroSrc)}/hero-1920.webp`;
}

export function listingHeroPathForRoute(pathname) {
  return HERO_PATH_BY_ROUTE[pathname] ?? null;
}

let activePreloadKey = null;

export function preloadListingHero(pathname) {
  const heroSrc = listingHeroPathForRoute(pathname);
  if (!heroSrc) return;

  const key = `listing-hero:${pathname}`;
  if (activePreloadKey === key) return;
  activePreloadKey = key;

  const existing = document.querySelector(`link[data-listing-hero-preload="${key}"]`);
  if (existing) return;

  document.querySelectorAll("link[data-listing-hero-preload]").forEach((node) => node.remove());

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = listingHeroDefaultSrc(heroSrc);
  link.imageSrcset = listingHeroSrcSet(heroSrc);
  link.imageSizes = "100vw";
  link.setAttribute("data-listing-hero-preload", key);
  document.head.appendChild(link);
}

export function prefetchListingHero(pathname) {
  const heroSrc = listingHeroPathForRoute(pathname);
  if (!heroSrc) return;

  const href = listingHeroDefaultSrc(heroSrc);
  if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "image";
  link.href = href;
  document.head.appendChild(link);
}
