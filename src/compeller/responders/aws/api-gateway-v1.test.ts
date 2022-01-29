import { APIGatewayV1Responder } from './api-gateway-v1';

describe('APIGatewayV1Responder', () => {
  it('maintains the API Gateway interface', () => {
    const responder = APIGatewayV1Responder<200, { name: string }>(200, {
      name: 'Simon',
    });

    expect(responder).toEqual({
      statusCode: 200,
      body: JSON.stringify({ name: 'Simon' }),
    });
  });

  it('allows for header injection', () => {
    const responder = APIGatewayV1Responder<
      200,
      { name: string },
      {
        'x-sample-header': string;
      }
    >(
      200,
      {
        name: 'Simon',
      },
      {
        'x-sample-header': 'sampled;',
      }
    );

    expect(responder).toEqual({
      statusCode: 200,
      body: JSON.stringify({ name: 'Simon' }),
      headers: {
        'x-sample-header': 'sampled;',
      },
    });
  });
});
