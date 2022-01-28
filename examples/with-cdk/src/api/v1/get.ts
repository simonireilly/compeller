import { APIGatewayProxyHandler } from 'aws-lambda';
import { compelled } from '../../openapi/compeller';

const { request, response } = compelled('/v1/version', 'get');

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const data = JSON.parse(event.body || '{}');

  if (request.validator(data)) {
    return response('200', {
      version: '1.0.1',
    });
  }

  return response('200', {
    version: '1.0.0',
  });
};
