import { compeller } from '../../src';
import { OpenAPISpecification } from './openapi/spec';

const customerCompeller = compeller(OpenAPISpecification, {
  responder: (statusCode, body) => {
    return typeof statusCode === 'string'
      ? {
          statusCode: parseInt(statusCode),
          body: JSON.stringify(body),
        }
      : {
          statusCode,
          body: JSON.stringify(body),
        };
  },
});

const body: Record<string, unknown> = {};
const headers: Record<string, unknown> = {};
const queryObject: Record<string, unknown> = {};

console.info(customerCompeller('v1/version', 'post').request.validator({}));
