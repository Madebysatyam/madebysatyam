import type { Block } from 'payload'

export const SectionHeading: Block = {
  slug: 'sectionHeading',
  labels: { singular: 'Section heading', plural: 'Section headings' },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      label: 'Heading',
    },
  ],
}

export const Subheading: Block = {
  slug: 'subheading',
  labels: { singular: 'Subheading', plural: 'Subheadings' },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      label: 'Subheading',
    },
  ],
}

export const Body: Block = {
  slug: 'body',
  labels: { singular: 'Body', plural: 'Body blocks' },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Body text',
    },
  ],
}

export const PullQuote: Block = {
  slug: 'pullQuote',
  labels: { singular: 'Pull quote', plural: 'Pull quotes' },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Quote',
    },
  ],
}

export const FigureImage: Block = {
  slug: 'figure',
  labels: { singular: 'Image', plural: 'Images' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      admin: {
        description: 'Shown under the image on the site (notes and projects use the same caption style)',
      },
    },
  ],
}

export const InsightCards: Block = {
  slug: 'insightCards',
  labels: { singular: 'Insight cards', plural: 'Insight card grids' },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'copy',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Card image',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Image caption',
          admin: {
            description: 'Optional caption under the card image',
          },
        },
      ],
    },
  ],
}

export const Divider: Block = {
  slug: 'divider',
  labels: { singular: 'Divider', plural: 'Dividers' },
  fields: [],
}

export const caseStudyBlocks = [
  SectionHeading,
  Subheading,
  Body,
  PullQuote,
  FigureImage,
  InsightCards,
  Divider,
]
