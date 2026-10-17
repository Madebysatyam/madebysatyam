import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
  hooks: {
    beforeOperation: [
      ({ operation }) => {
        if (operation === 'forgotPassword') {
          throw new APIError('Password reset is disabled.', 404)
        }
      },
    ],
  },
}
