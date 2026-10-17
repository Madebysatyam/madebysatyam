import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    forgotPassword: {
      generateEmailSubject: () => 'Reset your Madebysatyam CMS password',
      generateEmailHTML: (args) => {
        const token = args?.token || ''
        const user = args?.user
        const serverURL =
          process.env.PAYLOAD_PUBLIC_SERVER_URL?.replace(/\/$/, '') || 'http://localhost:3000'
        const resetURL = `${serverURL}/admin/reset/${token}`
        const email = typeof user?.email === 'string' ? user.email : 'there'

        return `
          <!doctype html>
          <html>
            <body style="font-family: Inter, system-ui, sans-serif; background:#080a0a; color:#e2e4e3; padding:32px;">
              <p>Hi ${email},</p>
              <p>Someone requested a password reset for your Madebysatyam CMS account.</p>
              <p><a href="${resetURL}" style="color:#5e6ad2;">Reset your password</a></p>
              <p style="color:#8a8f98;font-size:13px;">If you didn’t ask for this, you can ignore this email.</p>
            </body>
          </html>
        `
      },
    },
  },
  fields: [],
}
