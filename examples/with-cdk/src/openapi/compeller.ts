import { compeller, APIGatewayV1Responder } from 'compeller';
import { OpenAPISpecification } from './spec';

export const compelled = compeller(OpenAPISpecification, {
  responder: APIGatewayV1Responder,
});
