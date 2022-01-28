import { ErrorAPISchema } from './schemas/error.schema';
import { NewUserSchema, UserSchema } from './schemas/user.schema';
import { VersionSchema } from './schemas/version.schema';

const ValidationFailedResponse = {
  '422': {
    description: 'Unprocessable entity',
    content: {
      'application/json': {
        schema: ErrorAPISchema,
      },
    },
  },
};

export const OpenAPISpecification = {
  info: {
    title: 'New API generated with compeller',
    version: '1.0.0',
  },
  openapi: '3.1.0',
  paths: {
    '/v1/version': {
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
    '/v1/users': {
      post: {
        requestBody: {
          description: 'Create user body',
          content: {
            'application/json': {
              schema: NewUserSchema,
            },
          },
        },
        responses: {
          '201': {
            description: 'Created',
            content: {
              'application/json': {
                schema: UserSchema,
              },
            },
          },
          ...ValidationFailedResponse,
        },
      },
    },
  },
};
