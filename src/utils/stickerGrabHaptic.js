import "ios-vibrator-pro-max";

/** ~30ms pulse — noticeable on Android; iOS needs sync call on touch down. */
const STICKER_GRAB_HAPTIC_MS = 32;

export function isTouchLikePointer(pointerType) {
  return pointerType === "touch" || pointerType === "pen";
}

/**
 * Fire on pointerdown (not dragstart) — iOS 18.4+ only grants vibrate during
 * the initial touch/click; Framer drag starts after that window otherwise.
 */
export function triggerStickerGrabHaptic(pointerType) {
  if (pointerType === "mouse") {
    return;
  }

  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
    return;
  }

  try {
    navigator.vibrate(STICKER_GRAB_HAPTIC_MS);
  } catch {
    // Blocked by browser policy or unsupported.
  }
}
