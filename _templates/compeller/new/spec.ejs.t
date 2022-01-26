---
to: <%= directory %>/openapi/spec.ts
---
import { VersionSchema } from './schemas/version.schema';

export const OpenAPISpecification = {
  info: {
    title: '<%= title %>',
    version: '1.0.0',
  },
  openapi: '3.1.0',
  paths: {
    'v1//version': {
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
  },
};



