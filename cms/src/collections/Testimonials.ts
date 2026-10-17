import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Company logo',
    },
    {
      name: 'logoAlt',
      type: 'text',
      label: 'Logo alt text',
    },
    {
      name: 'logoLayout',
      type: 'select',
      defaultValue: 'mark',
      options: [
        { label: 'Mark', value: 'mark' },
        { label: 'Wordmark', value: 'wordmark' },
      ],
    },
  ],
}