import { OpenAPIObject } from 'openapi3-ts';

export const OpenAPISpecification = {
  info: {
    title: 'New API generated with compeller',
    version: '1.0.0',
  },
  openapi: '3.1.0',
  paths: {
    'v1/version': {
      post: {
        parameters: [
          {
            name: 'tags',
            in: 'query',
            description: 'tags to filter by',
            required: false,
            style: 'form',
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
          {
            name: 'limit',
            in: 'query',
            description: 'maximum number of results to return',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description: 'Get the current API version',
            headers: {
              'x-rate-limit': {
                description:
                  'The number of allowed requests in the current period',
                schema: {
                  type: 'number',
                } as const,
              },
              'x-request-id': {
                description: 'The unique request id header',
                schema: {
                  type: 'string',
                } as const,
              },
            },
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['version'],
                  additionalProperties: false,
                  properties: {
                    version: {
                      type: 'string',
                    },
                  },
                } as const,
              },
            },
          },
        },
      },
    },
  },
};
