import React from 'react'

/** Injected on the login screen so the forgot-password link cannot show. */
export default function HideForgotPassword() {
  return (
    <style>{`
      .login__form > a,
      a[href*="forgot"] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        pointer-events: none !important;
      }
    `}</style>
  )
}
