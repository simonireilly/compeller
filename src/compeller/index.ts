import Ajv, { JSONSchemaType } from 'ajv';
import { FromSchema } from 'json-schema-to-ts';
import { OpenAPIObject } from 'openapi3-ts';

import { defaultResponder } from './responders';
import { writeSpecification } from './file-utils/write-specification';

export interface ICompellerOptions {
  /**
   * The content type for the responses, currently only 'application/json' is
   * supported
   */
  contentType?: string;
  /**
   * If boolean the default file location will be used
   *
   * @default false
   */
  jsonSpecFile?: string | boolean;
  /**
   * Bind the relative path where compeller is used, to enable storing the
   * specification along side the compeller entity
   */
  relativePath?: string;
  /**
   * The responder formats the response of an adapter. Without a responder, the
   * statusCode and response body are returned in an object
   */
  responder: <T extends string | number | symbol, U>(
    statusCode: T,
    body: U,
    ...args: any
  ) => any;
}

/**
 * For now this is a mask on the OpenAPIObject, but later some fields will
 * become mandatory.
 *
 * This is to enforce configuration, and remove the option for some fields to
 * be any type, which is not the desired behavior for compeller.
 */
export interface ICompellerOpenAPIObject extends OpenAPIObject {}

const DEFAULT_OPTIONS: ICompellerOptions = {
  contentType: 'application/json',
  jsonSpecFile: false,
  responder: defaultResponder,
};

/**
 * The open API Compiler will take in an OpenAPI specification and return type-
 * safe utilities for handling requests, and responses.
 *
 * It does this by requiring the OpenAPI schema to be composed of Typescript
 * classes that define the Components and Schema's of the paths.
 *
 * @param {OpenAPIObject} spec - The OpenAPI specification document
 * @param {ICompellerOptions} options - Compeller options
 * @returns
 */
export const compeller = <
  T extends ICompellerOpenAPIObject,
  U extends string = 'application/json'
>(
  spec: T,
  {
    contentType = 'application/json',
    jsonSpecFile = false,
    responder = defaultResponder,
  }: ICompellerOptions = DEFAULT_OPTIONS
) => {
  if (jsonSpecFile) {
    writeSpecification(jsonSpecFile, spec);
  }

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
     * TODO - Responders need to handle headers
     *
     * Build a response object for the API with the required status and body
     * format
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
    ) => {
      return responder<R, FromSchema<SC>>(statusCode, body);
    };

    /**
     * TODO - Validators need to be abstracted like responders
     *
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

      // TODO: We need to handle the request not a requestBody
      //
      // Some users might abstract the functional components into a generic
      // wrapper, therefore gets might hit the validator path
      //
      // We don't want to loose type safety
      const unsafeSchema = (schema || {}) as JSONSchemaType<FromSchema<SC>>;

      const ajv = new Ajv({
        allErrors: true,
      });

      return ajv.compile<FromSchema<SC>>(unsafeSchema);
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
