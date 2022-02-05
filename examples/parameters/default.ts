import { compeller } from '../../src';
import { OpenAPISpecification } from './openapi/spec';

const defaultCompeller = compeller(OpenAPISpecification);

const { response, request } = defaultCompeller('v1/users/{id}', 'post');

// JSON Schema body validation
request.validateBody({});
// Validate path and query object
// request.validateParameters[0].;
// Validate headers
// request.validateHeaders({ 'x-api-key': '123aef-231' });

const res = response(
  '201',
  {
    version: '1.0.0',
  },
  {
    'x-rate-limit': 123,
    'x-request-id': 'uuid',
    'Content-Type': 'application/json',
  }
);

console.info('Formatted default response', res);
