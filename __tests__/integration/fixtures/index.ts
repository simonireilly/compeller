import { OpenAPISpecification } from './openapi/spec';
import { APIGatewayV1Responder, compeller } from '../../../src';

const API = compeller(OpenAPISpecification, {
  responder: APIGatewayV1Responder,
});
const { response, request } = API('/pets', 'post');

export const handler = (data: Record<string, unknown>) => {
  if (request.validator(data)) {
    return response('201', {});
  } else {
    const { errors } = request.validator;

    if (errors) {
      return response('422', {
        title: 'Schema validation failure for request body',
        details: errors,
      });
    }
  }
};
