import { APIGatewayProxyResult } from 'aws-lambda';
import { ICompellerOptions, TResponder } from '../..';

export const APIGatewayV1Responder: TResponder<APIGatewayProxyResult> = <T, U>({
  statusCode,
  body,
  headers,
  isBase64Encoded,
  multiValueHeaders,
}: {
  statusCode: string | number | symbol;
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

  if (typeof statusCode === 'symbol')
    throw new Error(
      'Status codes cannot be symbols for the APIGatewayResponder'
    );

  const parsedStatusCode = parseInt(statusCode);

  if (isNaN(parsedStatusCode))
    throw new Error(
      'Status codes cannot be symbols for the APIGatewayResponder'
    );

  return {
    statusCode: parsedStatusCode,
    body: JSON.stringify(body),
    headers,
    isBase64Encoded,
    multiValueHeaders,
  };
};
