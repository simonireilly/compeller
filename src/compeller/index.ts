import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import { FromSchema } from 'json-schema-to-ts';
import {
  OpenAPIObject,
  ParameterObject,
  PathItemObject,
  ReferenceObject,
} from 'openapi3-ts';

import { defaultResponder } from './responders';
import { writeSpecification } from './file-utils/write-specification';
import { requestBodyValidator } from './validators';

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
  responder: <
    T extends string | number | symbol,
    U,
    V extends { [header: string]: string | number | boolean } = {}
  >(
    statusCode: T,
    body: U,
    headers?: V,
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
  ContentType extends string = 'application/json'
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
    RequestPath extends keyof T['paths'],
    RequestMethod extends keyof T['paths'][RequestPath],
    Responses extends T['paths'][RequestPath][RequestMethod]['responses'],
    Request extends T['paths'][RequestPath][RequestMethod]
  >(
    route: RequestPath,
    method: RequestMethod
  ) => {
    const path = route as string;
    const {
      requestBody: {
        content: { [contentType]: { schema = undefined } = {} } = {},
      } = {},
    } = spec.paths[path][method];
    const { parameters } = spec.paths[path][method] as PathItemObject;

    /**
     * Build a response object for the API with the required status and body
     * format
     *
     * @param statusCode The response code that the API returns
     * @param body The JSON body for the API that is associated with that response code
     * @param headers The key, value map of the headers required for the response
     *
     * @returns
     */
    const response = <
      ResponseCode extends keyof Responses,
      ResponseSchema extends Responses[ResponseCode]['content'][ContentType]['schema'],
      ResponseHeadersAlias extends Responses[ResponseCode]['headers'],
      // Headers are a simple type, so we will not use FromSchema, their type will either be number, string, or boolean
      ResponseHeaders extends {
        [U in keyof ResponseHeadersAlias]: ResponseHeadersAlias[U]['schema']['type'] extends 'string'
          ? string
          : ResponseHeadersAlias[U]['schema']['type'] extends 'number'
          ? number
          : ResponseHeadersAlias[U]['schema']['type'] extends 'boolean'
          ? boolean
          : never;
      } & { 'Content-Type': ContentType }
    >(
      statusCode: ResponseCode,
      body: FromSchema<ResponseSchema>,
      headers?: ResponseHeaders
    ) => {
      return responder<
        ResponseCode,
        FromSchema<ResponseSchema>,
        ResponseHeaders
      >(statusCode, body, headers);
    };

    /**
     * The request validator attaches request body validation to the request
     * handler for a path.
     *
     * @returns Ajv validation function for the inferred schema
     */
    const validateRequestBody = <
      SC extends Request['requestBody']['content'][ContentType]['schema']
    >(
      schema: Record<string, unknown>
    ) => {
      return requestBodyValidator<SC>(schema);
    };

    /**
     * The parameters validator validates the parameters section of the template
     * and returns the parameters object, or a schema with errors
     */
    const validateRequestParameters = <
      Parameters extends Request['parameters'],
      AllowedParameters extends Array<
        Parameters[number] extends ParameterObject ? Parameters[number] : never
      >
    >(
      parameters: Parameters
    ): AllowedParameters => {
      const removeRefTypes = <T extends Parameters[number]>(
        param: T
      ): T extends ParameterObject ? T : never => {
        if (param.$ref) {
          throw Error('Only parameter types are supported');
        }
        return param;
      };

      return parameters;

      // Parameters is an array
      // Each member can be a Ref or Param Obj
      // We want to return a type as
      // { [key: P[number]['name']]: ValidateFunction<P[number]['schema'] }

      // Mapped type of parameters
      // type Validators<T extends keyof Parameters> = {
      //   [key in T]: ValidateFunction<
      //     JSONSchemaType<FromSchema<Parameters[T]['schema']>>
      //   >;
      // };

      // return (p: Parameters[number]) => {};
    };

    const validateBody = validateRequestBody(schema);
    const validateParameters = validateRequestParameters(parameters);

    return {
      response,
      request: {
        validateBody,
        validateParameters,
      },
    };
  };
};
