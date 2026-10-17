import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Notes } from './collections/Notes'
import { Playground } from './collections/Playground'
import { Projects } from './collections/Projects'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { About } from './globals/About'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function parseOrigins(value: string | undefined, fallback: string): string[] {
  const raw = value?.trim() || fallback
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

const frontendOrigins = parseOrigins(
  process.env.FRONTEND_URL,
  'http://localhost:5173,https://madebysatyam.vercel.app,https://madebysatyam.com,https://www.madebysatyam.com',
)
const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Admin runs on the CMS origin — must be trusted for cookies/CSRF or uploads hang on "Submitting…"
const trustedOrigins = Array.from(
  new Set(
    [
      ...frontendOrigins,
      serverURL,
      process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : '',
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    ].filter(Boolean),
  ),
)

const postgresUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL || ''
const usesPostgres = /^(postgres|postgresql):\/\//i.test(postgresUrl)
const blobToken = process.env.BLOB_READ_WRITE_TOKEN || ''

const db = usesPostgres
  ? vercelPostgresAdapter({
      pool: {
        connectionString: postgresUrl,
      },
      // On Vercel production, prefer migrations; push stays on for first deploys / preview.
      push: process.env.PAYLOAD_DATABASE_PUSH !== 'false',
    })
  : sqliteAdapter({
      client: {
        url: process.env.DATABASE_URL || 'file:./payload.db',
      },
    })

export default buildConfig({
  serverURL,
  cors: trustedOrigins,
  csrf: trustedOrigins,
  admin: {
    user: Users.slug,
    theme: 'dark',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeLogin: ['/components/HideForgotPassword.tsx'],
      graphics: {
        Logo: '/components/graphics/Logo.tsx',
        Icon: '/components/graphics/Icon.tsx',
      },
      views: {
        forgot: {
          Component: '/components/ForgotPasswordDisabled.tsx',
        },
      },
    },
    meta: {
      titleSuffix: '— Madebysatyam CMS',
    },
    livePreview: {
      collections: ['notes', 'projects'],
      globals: ['about'],
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 375, height: 667 },
        { name: 'tablet', label: 'Tablet', width: 768, height: 1024 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
      url: ({ data, collectionConfig, globalConfig }) => {
        const frontend =
          process.env.FRONTEND_URL?.split(',')[0]?.trim() || 'http://localhost:5173'
        if (collectionConfig?.slug === 'notes' && data?.slug) {
          return `${frontend}/notes/${data.slug}`
        }
        if (collectionConfig?.slug === 'projects' && data?.slug) {
          return `${frontend}/projects/${data.slug}`
        }
        if (globalConfig?.slug === 'about') {
          return `${frontend}/about`
        }
        return frontend
      },
    },
  },
  collections: [Users, Media, Projects, Notes, Playground, Testimonials],
  globals: [About, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(blobToken),
      collections: {
        media: true,
      },
      token: blobToken,
      // Bypass Vercel’s ~4.5MB serverless upload limit for larger images.
      clientUploads: true,
    }),
  ],
})
