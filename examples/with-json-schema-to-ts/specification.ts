import { Schema } from './pet.schema';

export const OpenAPISpecification = {
  info: {
    title: 'AJV Schema Example',
    version: '1.0.0',
  },
  openapi: '3.1.0',
  paths: {
    '/pet': {
      get: {
        responses: {
          '200': {
            description: 'Get the pet',
            content: {
              'application/json': {
                schema: Schema,
              },
            },
          },
        },
      },
    },
  },
};
