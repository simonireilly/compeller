import { OpenAPIObject, SchemaObject } from 'openapi3-ts';
import { APICompiler } from './../lib/compiler';

const spec = {
  info: {
    title: 'Test API',
    version: '1.0.0',
  },
  openapi: '3.1.0',
  paths: {
    '/test': {
      get: {
        responses: {
          '200': {
            description: 'Test response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                    },
                  },
                  additionalProperties: false,
                  required: ['name'],
                } as const,
              },
            },
          },
        },
      },
    },
  },
};

describe('API Compiler tests', () => {
  describe('get requests', () => {
    it('requires a valid API document', () => {
      const stuff = APICompiler(spec);

      const { response } = stuff('/test', 'get');

      const resp = response('200', { name: 'Simon' });

      expect(resp).toEqual({});
    });
  });
});
