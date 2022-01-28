export const ErrorAPISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    details: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          instancePath: {
            type: 'string',
          },
          schemaPath: {
            type: 'string',
          },
          keyword: {
            type: 'string',
          },
          params: {
            type: 'object',
            additionalProperties: true,
          },
          message: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: false,
        required: ['params', 'keyword', 'instancePath', 'schemaPath'],
      },
    },
  },
  required: ['title', 'details'],
  additionalProperties: false,
} as const;
