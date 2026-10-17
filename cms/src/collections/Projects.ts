import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { caseStudyBlocks } from '../blocks/caseStudyBlocks'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'shortTitle',
    defaultColumns: ['shortTitle', 'slug', 'updatedAt'],
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
      admin: {
        description: 'URL segment, e.g. aural → /projects/aural',
      },
    },
    {
      name: 'shortTitle',
      type: 'text',
      required: true,
      label: 'Short title',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          fields: [
            {
              name: 'card',
              type: 'group',
              fields: [
                { name: 'tag', type: 'text', required: true },
                { name: 'role', type: 'text', required: true },
                { name: 'title', type: 'textarea', required: true },
                { name: 'metricValue', type: 'text', required: true },
                { name: 'metricLabel', type: 'text', required: true },
                { name: 'readTime', type: 'text', required: true },
                { name: 'shipped', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Page',
          fields: [
            {
              name: 'page',
              type: 'group',
              fields: [
                { name: 'dek', type: 'textarea', required: true, label: 'Page title / dek' },
                { name: 'lead', type: 'textarea', label: 'Lead paragraph' },
                { name: 'role', type: 'text', required: true },
                { name: 'company', type: 'text', required: true },
                { name: 'timeline', type: 'text', required: true },
                { name: 'scope', type: 'text' },
                { name: 'platformScale', type: 'text' },
                {
                  name: 'stats',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'value', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Body',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Case study blocks',
              blocks: caseStudyBlocks,
              admin: {
                description:
                  'Preferred. Use block types (heading, body, image…) — the site maps them to text styles.',
              },
            },
            {
              name: 'bodyMarkdown',
              type: 'textarea',
              label: 'Markdown body (fallback)',
              admin: {
                description:
                  'Optional. Used when no blocks are present. Same markdown format as the current aural.md file.',
              },
            },
          ],
        },
      ],
    },
  ],
}
