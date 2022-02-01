import { compeller } from '../../src';
import { OpenAPISpecification } from './openapi/spec';

const defaultCompeller = compeller(OpenAPISpecification);

const res = defaultCompeller('v1/users/{id}', 'post').response(
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
