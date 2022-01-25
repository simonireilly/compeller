# Compel

A strong typescript binding for your OpenAPI Schema that doesn't need generation.

- [Compel](#compel)
  - [About](#about)
  - [Shoulders](#shoulders)

## About

Compel tries to infer your OpenAPI validations and responses, from a typed OpenAPI specification.

## Shoulders

Compell is built on top of some great libraries, at it's core it relies on:

- [openapi3-ts](https://github.com/metadevpro/openapi3-ts)
- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts)

It also layers on request and response validation powered by:

- [ajv](https://github.com/ajv-validator/ajv)

I'm grateful for these libraries
