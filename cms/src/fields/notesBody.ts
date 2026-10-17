import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'

/** Shared editor instance — used by the field and by seed conversion. */
export const notesBodyEditor = lexicalEditor({
  features: () => [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2'] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    LinkFeature(),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'text',
              label: 'Caption',
              admin: {
                description: 'Shown under the image on the site',
              },
            },
          ],
        },
      },
    }),
    InlineToolbarFeature(),
    FixedToolbarFeature(),
  ],
})

/** Lexical body for notes — paragraph, h2, inline marks, links, images. */
export const notesBodyField: Field = {
  name: 'body',
  type: 'richText',
  label: 'Body',
  editor: notesBodyEditor,
  admin: {
    description: 'Write the note as a document. Headings, paragraphs, and images map to site text styles.',
  },
}
