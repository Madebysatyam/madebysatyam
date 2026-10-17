import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'footer',
      type: 'group',
      fields: [
        { name: 'email', type: 'text' },
        { name: 'status', type: 'text' },
        { name: 'response', type: 'text' },
        { name: 'based', type: 'text' },
      ],
    },
  ],
}
