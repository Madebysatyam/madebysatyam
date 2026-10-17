import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

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
    {
      name: 'sections',
      type: 'array',
      label: 'Article sections',
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'p',
          options: [
            { label: 'Paragraph (body)', value: 'p' },
            { label: 'Heading', value: 'h2' },
            { label: 'Image', value: 'image' },
          ],
        },
        {
          name: 'text',
          type: 'textarea',
          admin: {
            condition: (_, siblingData) => siblingData?.type !== 'image',
            description: 'Heading or body copy',
          },
          validate: (value, { siblingData }) => {
            if (siblingData?.type === 'image') return true
            if (!value || !String(value).trim()) return 'Text is required'
            return true
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
          validate: (value, { siblingData }) => {
            if (siblingData?.type !== 'image') return true
            if (!value) return 'Image is required'
            return true
          },
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
            description: 'Shown under the image on the site',
          },
        },
      ],
    },
  ],
}
