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

const frontendOrigins = parseOrigins(process.env.FRONTEND_URL, 'http://localhost:5173')
const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

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
  cors: frontendOrigins,
  csrf: frontendOrigins,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Madebysatyam CMS',
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
