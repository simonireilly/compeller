import { APIGatewayProxyResult } from 'aws-lambda';

export const APIGatewayV1Responder = <T, U>({
  statusCode,
  body,
  headers,
  isBase64Encoded,
  multiValueHeaders,
}: {
  statusCode: T extends string ? string : number;
  body: U;
} & Omit<
  APIGatewayProxyResult,
  'statusCode' | 'body'
>): APIGatewayProxyResult => {
  if (typeof statusCode === 'number') {
    return {
      statusCode,
      body: JSON.stringify(body),
      headers,
      isBase64Encoded,
      multiValueHeaders,
    };
  }

  return {
    statusCode: parseInt(statusCode),
    body: JSON.stringify(body),
    headers,
    isBase64Encoded,
    multiValueHeaders,
  };
};
