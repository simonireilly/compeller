export const NewUserSchema = {
  type: 'object',
  required: ['name', 'age'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 30,
    },
    age: {
      type: 'number',
      minimum: 0,
      maximum: 100,
    },
  },
} as const;

export const UserSchema = {
  type: 'object',
  required: ['name', 'age', 'id'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 30,
    },
    age: {
      type: 'number',
      minimum: 0,
      maximum: 100,
    },
    id: {
      type: 'string',
    },
  },
} as const;
