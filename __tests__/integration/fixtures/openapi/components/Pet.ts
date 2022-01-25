import { SchemaObject } from 'ajv';

export const PetAPIComponent = {
  type: 'object',
  required: ['id', 'name'],
  properties: {
    id: {
      type: 'integer',
      format: 'int64',
    },
    name: {
      type: 'string',
    },
    tag: {
      type: 'string',
    },
  },
} as const;
export const PetAPISchema = PetAPIComponent as SchemaObject;

export const NewPetAPIComponent = {
  type: 'object',
  required: ['name'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
    },
    tag: {
      type: 'string',
    },
  },
} as const;
export const NewPetAPISchema = NewPetAPIComponent as SchemaObject;

export const PetsAPIComponent = {
  type: 'array',
  items: PetAPIComponent,
} as const;
export const PetsAPISchema = PetsAPIComponent as SchemaObject;
