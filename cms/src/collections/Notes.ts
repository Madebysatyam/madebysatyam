import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { notesBodyField } from '../fields/notesBody'

export const Notes: CollectionConfig = {
  slug: 'notes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: {
        description: 'Display date, e.g. 03.10.2026',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Essay', value: 'essay' },
        { label: 'Systems', value: 'systems' },
        { label: 'Process', value: 'process' },
        { label: 'Research', value: 'research' },
        { label: 'Product', value: 'product' },
      ],
    },
    notesBodyField,
  ],
}
