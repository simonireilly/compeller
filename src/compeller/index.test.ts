import { join } from 'path';
import { compeller } from '.';

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
      const stuff = compeller(spec);

      const { response } = stuff('/test', 'get');

      const resp = response('200', { name: 'Type-safe reply' });

      expect(resp).toEqual({
        body: { name: 'Type-safe reply' },
        statusCode: '200',
      });
    });

    it('keeps a local specification json when true', () => {
      const stuff = compeller(spec, {
        jsonSpecFile: join(__dirname, 'tmp', 'openapi.json'),
      });

      const { response } = stuff('/test', 'get');

      const resp = response('200', { name: 'Type-safe reply' });

      expect(resp).toEqual({
        body: { name: 'Type-safe reply' },
        statusCode: '200',
      });
    });
  });
});
