import { FromSchema } from 'json-schema-to-ts';

export const Schema = {
  type: 'object',
  required: ['age', 'name'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 12,
    },
    age: {
      type: 'number',
      maximum: 120,
      minimum: 0,
    },
  },
} as const;

export type Pet = FromSchema<typeof Schema>;
