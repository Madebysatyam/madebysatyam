/** Fridge-magnet stickers — scattered layout (% of mat), centre kept clear for hero copy */

function stickerHash(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Stable tilt per id: magnitude 10–20°, random sign (does not change on re-render). */
function magnetRotation(id) {
  const hash = stickerHash(id);
  const sign = hash & 1 ? 1 : -1;
  const magnitude = 10 + (hash % 11);
  return sign * magnitude;
}

/** Stable width per id: 6.5–9 rem in 0.25 steps. */
function magnetSizeRem(id) {
  const hash = stickerHash(id);
  const step = (hash >>> 12) % 11;
  return 6.5 + step * 0.25;
}

/** Desktop — ring around hero copy (% of mat centre) */
const STICKER_LAYOUT = [
  {
    id: "book",
    src: "/stickers/book.png",
    alt: "Book sticker",
    x: 18,
    y: 14,
    rotateDeg: 28,
    mobile: { x: 17, y: 12, rotateDeg: 22 },
  },
  {
    id: "guitar",
    src: "/stickers/guitar.png",
    alt: "Guitar sticker",
    x: 82,
    y: 14,
    rotateDeg: -32,
    mobile: { x: 84, y: 12, rotateDeg: -10 },
  },
  {
    id: "laugh",
    src: "/stickers/laugh.png",
    alt: "Laughing face sticker",
    x: 92,
    y: 40,
    rotateDeg: -42,
    mobile: { x: 88, y: 42, rotateDeg: -36 },
  },
  {
    id: "headphones",
    src: "/stickers/headphones.png",
    alt: "Headphones sticker",
    x: 84,
    y: 76,
    rotateDeg: -14,
    mobile: { x: 84, y: 80, rotateDeg: -8 },
  },
  {
    id: "wink",
    src: "/stickers/wink.png",
    alt: "Winking face sticker",
    x: 16,
    y: 76,
    rotateDeg: 16,
    mobile: { x: 15, y: 80, rotateDeg: 18 },
  },
  {
    id: "sunglasses",
    src: "/stickers/sunglasses.png",
    alt: "Sunglasses face sticker",
    x: 10,
    y: 40,
    rotateDeg: 44,
    mobile: { x: 12, y: 36, rotateDeg: 38 },
  },
];

export const MAT_STICKERS = STICKER_LAYOUT.map((sticker) => ({
  ...sticker,
  sizeRem: magnetSizeRem(sticker.id),
  rotateDeg: sticker.rotateDeg ?? magnetRotation(sticker.id),
}));

/** Nudge all anchors downward (% of mat) — keeps ring clear of headline. */
const STICKER_Y_OFFSET = 7;

/** Anchor + tilt for current viewport (< 810px uses `mobile` when present). */
export function getStickerPlacement(sticker, isMobile) {
  const base =
    isMobile && sticker.mobile
      ? {
          x: sticker.mobile.x,
          y: sticker.mobile.y,
          rotateDeg: sticker.mobile.rotateDeg ?? sticker.rotateDeg,
        }
      : {
          x: sticker.x,
          y: sticker.y,
          rotateDeg: sticker.rotateDeg,
        };

  return {
    ...base,
    y: Math.min(92, base.y + STICKER_Y_OFFSET),
  };
}
