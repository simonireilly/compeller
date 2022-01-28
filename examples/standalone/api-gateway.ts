import { APIGatewayV1Responder, compeller } from '../../src';
import { OpenAPISpecification } from './openapi/spec';

const apiGatewayV1Compeller = compeller(OpenAPISpecification, {
  responder: APIGatewayV1Responder,
});

console.info(
  apiGatewayV1Compeller('v1/version', 'get').response('200', {
    version: '1.0.0',
  })
);
