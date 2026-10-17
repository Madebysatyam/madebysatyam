import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Playground: CollectionConfig = {
  slug: 'playground',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: {
        description: 'Display date, e.g. 00.00.0000',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on the homepage playground strip',
      },
    },
  ],
}
