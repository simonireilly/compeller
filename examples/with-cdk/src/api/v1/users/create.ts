import { APIGatewayProxyHandler } from 'aws-lambda';
import { compelled } from '../../../openapi/compeller';

const { request, response } = compelled('/v1/users', 'post');

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const data = JSON.parse(event.body || '{}');

  if (request.validator(data)) {
    data.name;

    return response('201', {
      name: data.name,
      age: data.age,
      id: '1',
    });
  } else {
    const { errors } = request.validator;

    if (errors) {
      return response('422', {
        title: 'Unprocessable entity',
        details: errors,
      });
    } else {
      return response('422', {
        title: 'Unknown error',
        details: [
          {
            message: 'Validation failed with unknown error',
            instancePath: '#/',
            keyword: 'unknown',
            params: {},
            schemaPath: '#',
          },
        ],
      });
    }
  }

  return;
};
