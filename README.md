# Compel

A strong typescript binding for your OpenAPI Schema that doesn't need generation.

- [Compel](#compel)
  - [About](#about)
  - [Shoulders](#shoulders)

## About

Compel tries to infer your OpenAPI validations and responses, from a typed OpenAPI specification.

Say you had the following specification:

```ts
// ./spec.ts
const openAPISpec = {
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
```

With compel you can compile this into a typed request and response handler like:

```ts
import {openAPISpec} from './spec';
const stuff = APICompiler(spec);

const { response } = stuff('/test', 'get');

const resp = response('200', { name: 'Type-safe reply' });
```

Compel will tell you want `statusCode`'s are acceptable for the path, and it will bind the response body type to that `statusCode`.

When you need to make changes, you will be compelled to keep them in your central `spec.ts` file, maintaining parity between your OpenAPI and your code.

## Shoulders

Compell is built on top of some great libraries, at it's core it relies on:

- [openapi3-ts](https://github.com/metadevpro/openapi3-ts)
- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts)

It also layers on request and response validation powered by:

- [ajv](https://github.com/ajv-validator/ajv)

I'm grateful for these libraries
