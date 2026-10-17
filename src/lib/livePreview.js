import { getCmsBaseUrl } from "./cms.js";

/** Depth used when hydrating live-preview relationships (uploads, etc.). */
export const LIVE_PREVIEW_DEPTH = 2;

export function getLivePreviewServerURL() {
  return getCmsBaseUrl();
}
