import { OpenAPISpecification } from './openapi/spec';
import { APICompiler } from '../../../src';

const API = APICompiler(OpenAPISpecification);
const { response, request } = API('/pets', 'post');

export const handler = (data: Record<string, unknown>) => {
  if (request.validator(data)) {
    return response('201', {});
  } else {
    const { errors } = request.validator;

    if (errors) {
      return response('default', {
        title: 'Schema validation failure for request body',
        details: errors,
      });
    }
  }
};
