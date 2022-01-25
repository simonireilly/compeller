# Compeller

A strong typescript binding for your OpenAPI Schema that doesn't need generation.

- [Compeller](#compeller)
  - [About](#about)
  - [Shoulders](#shoulders)

## About

Compeller tries to infer your OpenAPI validations and responses, from a typed OpenAPI specification.

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
const stuff = compeller(spec);

const { response } = stuff('/test', 'get');

const resp = response('200', { name: 'Type-safe reply' });
```

Compeller will tell you what combinations of status codes and bodies are compatible when building responses.

When you need to make changes, you will be compelled to keep them in your central `spec.ts` file, maintaining parity between your OpenAPI and your code.

## Shoulders

Compell is built on top of some great libraries, at it's core it relies on:

- [openapi3-ts](https://github.com/metadevpro/openapi3-ts)
- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts)

It also layers on request and response validation powered by:

- [ajv](https://github.com/ajv-validator/ajv)

I'm grateful for these libraries
