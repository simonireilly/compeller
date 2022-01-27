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
export const compeller = <
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

    /**
     *
     * @param statusCode The response code that the API returns
     * @param body The JSON body for the API that is associated with that
     * response code
     *
     * @returns
     */
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

    /**
     * The request validator attaches request body validation to the request
     * handler for a path.
     *
     * @returns Ajv validation function for the inferred schema
     */
    const validateRequestBody = <
      SC extends T['paths'][P][M]['requestBody']['content'][U]['schema']
    >() => {
      const {
        requestBody: {
          content: { [contentType]: { schema = undefined } = {} } = {},
        } = {},
      } = spec.paths[path][method];

      const unsafeSchema = schema as JSONSchemaType<FromSchema<SC>>;

      const ajv = new Ajv({
        allErrors: true,
      });

      if (unsafeSchema) {
        return ajv.compile(unsafeSchema);
      } else {
        return ajv.compile({});
      }
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
