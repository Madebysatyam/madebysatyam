import React from 'react'

/** Replaces Payload’s forgot-password view — reset emails are not enabled. */
export default function ForgotPasswordDisabled() {
  return (
    <div className="forgot-password-disabled">
      <p>Password reset is disabled. Ask the site owner to change your password in the CMS.</p>
      <a className="forgot-password-disabled__link" href="/admin/login">
        Back to login
      </a>
    </div>
  )
}
