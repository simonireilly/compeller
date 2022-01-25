import Ajv, { JSONSchemaType } from 'ajv';
import { FromSchema } from 'json-schema-to-ts';
import { OpenAPIObject } from 'openapi3-ts';

/**
 * The open API Compiler will take in an OpenAPI specification and return type-
 * safe utilities for handling requests, and responses.
 *
 * It does this by requiring the OpenAPI schema to be composed of Typescript
 * classes that define the Components and Schema's of the paths.
 *
 * @param {OpenAPIObject} spec - The OpenAPI specification document
 * @param {string} contentType - The content type of requests and responses
 * @default 'application/json'
 * @returns
 */
export const APICompiler = <
  T extends OpenAPIObject,
  U extends string = 'application/json'
>(
  spec: T,
  contentType = 'application/json'
) => {
  return <
    P extends keyof T['paths'],
    M extends keyof T['paths'][P],
    S extends T['paths'][P][M]['responses']
  >(
    route: P,
    method: M
  ) => {
    const path = route as string;

    const response = <
      R extends keyof S,
      SC extends T['paths'][P][M]['responses'][R]['content'][U]['schema']
    >(
      statusCode: R,
      body: FromSchema<SC>
    ) => ({
      statusCode,
      body: JSON.stringify(body),
    });

    const validateRequestBody = <
      SC extends T['paths'][P][M]['requestBody']['content'][U]['schema']
    >() => {
      const requestSchema = spec.paths[path][method]['requestBody']['content'][
        contentType
      ]['schema'] as JSONSchemaType<FromSchema<SC>>;
      const ajv = new Ajv({
        allErrors: true,
      });
      return ajv.compile(requestSchema);
    };

    const validator = validateRequestBody();

    return {
      response,
      request: {
        validator,
      },
    };
  };
};
