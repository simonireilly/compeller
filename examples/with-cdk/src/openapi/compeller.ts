import { compeller } from 'compeller/dist/compeller/index';
import { APIGatewayV1Responder } from 'compeller';
import { OpenAPISpecification } from './spec';

export const compelled = compeller(OpenAPISpecification, {
  responder: APIGatewayV1Responder,
});
