![Compeller basic logo](./assets/logo.drawio.svg)
# Compeller

A strong typescript binding for your OpenAPI Schema that doesn't need generation.

- [Compeller](#compeller)
  - [About](#about)
    - [Usage](#usage)
  - [Shoulders](#shoulders)

## About

Compeller tries to infer your OpenAPI validations and responses, from a typed OpenAPI specification.



### Usage

Create a Schema specification with :

```ts
import { FromSchema } from 'json-schema-to-ts';

export const PetSchema = {
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

export type Pet = FromSchema<typeof PetSchema>;
```

Next, create a top level document:

```ts
import { PetSchema } from './schemas/pet.schema';

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
                schema: PetSchema,
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
import { openAPISpec } from './spec';
const api = compeller(spec);

const { response } = api('/test', 'get');

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
