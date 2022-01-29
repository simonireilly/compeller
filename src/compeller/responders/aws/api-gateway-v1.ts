import { APIGatewayProxyResult } from 'aws-lambda';
import { ICompellerOptions } from '../..';

export const APIGatewayV1Responder: ICompellerOptions['responder'] = <
  T extends string | number | symbol,
  U,
  V extends { [header: string]: string | number | boolean }
>(
  statusCode: T,
  body: U,
  headers?: V,
  isBase64Encoded?: APIGatewayProxyResult['isBase64Encoded'],
  multiValueHeaders?: APIGatewayProxyResult['multiValueHeaders']
): APIGatewayProxyResult => {
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
