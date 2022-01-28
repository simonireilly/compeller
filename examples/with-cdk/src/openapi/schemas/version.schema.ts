export const VersionSchema = {
  type: 'object',
  required: ['version'],
  additionalProperties: false,
  properties: {
    version: {
      type: 'string',
    },
  },
} as const;
