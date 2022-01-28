import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { ApiGatewayV2 } from 'aws-sdk';
import deepmerge = require('deepmerge');
import { OpenAPISpecification } from '../openapi/spec';

const apiGatewayV2 = new ApiGatewayV2();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const apiId = event.requestContext.apiId;

  const apiSpec = await apiGatewayV2
    .exportApi({
      ApiId: apiId,
      OutputType: 'JSON',
      Specification: 'OAS30',
    })
    .promise();

  const apiDocs = apiSpec.body?.toString();
  const documentationObject = apiDocs && JSON.parse(apiDocs);

  const docs = deepmerge(OpenAPISpecification, documentationObject, {
    clone: true,
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(docs),
  };
};
