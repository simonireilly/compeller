---
to: <%= directory %>/openapi/paths/version.path.ts
---
import { VersionSchema } from '../components/schemas/version.schema';

export const versionPath = {
  'v1/version': {
    get: {
      responses: {
        '200': {
          description: 'Get the current API version',
          content: {
            'application/json': {
              schema: VersionSchema,
            },
          },
        },
      },
    },
  },
}
