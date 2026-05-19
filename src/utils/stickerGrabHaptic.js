/** Short vibration on sticker grab — mobile browsers with Vibration API support only. */
export function triggerStickerGrabHaptic() {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
    return;
  }

  try {
    navigator.vibrate(12);
  } catch {
    // Blocked by browser policy or unsupported.
  }
}
