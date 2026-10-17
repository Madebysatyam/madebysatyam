import React from 'react'

/** Compact nav / favicon mark — left glyph of the Madebysatyam logo. */
export default function Icon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="Madebysatyam"
      className="graphic-icon madebysatyam-icon"
      height={25}
      src="/madebysatyam-logo.svg"
      style={{ objectFit: 'cover', objectPosition: 'left center', width: 25 }}
      width={25}
    />
  )
}
