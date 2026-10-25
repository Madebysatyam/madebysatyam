/** Resolve a media field or path to a usable src. */
export function mediaUrl(media) {
  if (!media) return null;
  if (typeof media === "string") return media;
  const url = media.url;
  return url || null;
}
