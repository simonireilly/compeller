import { FromSchema } from 'json-schema-to-ts';

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

export type Version = FromSchema<typeof VersionSchema>;
