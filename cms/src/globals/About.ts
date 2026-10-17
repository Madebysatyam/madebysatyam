import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About page',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'story',
      type: 'array',
      label: 'Story paragraphs',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'beliefs',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'accent',
          type: 'select',
          required: true,
          options: [
            { label: 'Orange', value: 'orange' },
            { label: 'Pink', value: 'pink' },
            { label: 'Teal', value: 'teal' },
            { label: 'Purple', value: 'purple' },
          ],
        },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'experience',
      type: 'array',
      fields: [
        { name: 'company', type: 'text', required: true },
        {
          name: 'roles',
          type: 'array',
          fields: [
            { name: 'role', type: 'text', required: true },
            { name: 'duration', type: 'text', required: true },
            { name: 'isCurrent', type: 'checkbox', defaultValue: false },
            { name: 'note', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'awards',
      type: 'array',
      fields: [
        { name: 'company', type: 'text', required: true, label: 'Award name' },
        { name: 'duration', type: 'text', required: true, label: 'Date' },
        {
          name: 'badge',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'badgeAlt', type: 'text' },
      ],
    },
    {
      name: 'closing',
      type: 'array',
      label: 'Closing / looking for',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
