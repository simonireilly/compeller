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

console.info(
  customerCompeller('v1/version', 'get').response(
    '200',
    {
      version: '1.0.0',
    },
    {
      'x-rate-limit': 120,
      'x-request-id': '<uuid>',
    }
  )
);
