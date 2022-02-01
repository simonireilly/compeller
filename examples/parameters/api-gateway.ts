import { APIGatewayV1Responder, compeller } from '../../src';
import { OpenAPISpecification } from './openapi/spec';

const apiGatewayV1Compeller = compeller(OpenAPISpecification, {
  responder: APIGatewayV1Responder,
});

console.info(
  apiGatewayV1Compeller('v1/users/{id}', 'post').response(
    '201',
    {
      version: '1.0.0',
    },
    {
      'x-request-id': '<uuid>',
      'x-rate-limit': 120,
      'Content-Type': 'application/json',
    }
  )
);
