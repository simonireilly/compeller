import { OpenAPISpecification } from '../fixtures/openapi/spec';
import { APIGatewayV1Responder, compeller } from '../../../src';

const API = compeller(OpenAPISpecification, {
  responder: APIGatewayV1Responder,
});
const { response, request } = API('/pets', 'post');

export const handler = (data: Record<string, unknown>) => {
  let body = data;

  if (request.validateBody(body)) {
    console.info('Type-safe object destructured from post request', {
      name: body.name,
    });

    return response('201', {});
  } else {
    const { errors } = request.validateBody;

    if (errors) {
      return response('422', {
        title: 'Schema validation failure for request body',
        details: errors,
      });
    }
  }
};

describe('integration tests', () => {
  it('with missing data', () => {
    const data = {};
    const response = handler(data);

    expect(response?.statusCode).toEqual(422);
    expect(JSON.parse(response.body)).toEqual({
      details: [
        {
          instancePath: '',
          keyword: 'required',
          message: "must have required property 'name'",
          params: {
            missingProperty: 'name',
          },
          schemaPath: '#/required',
        },
      ],
      title: 'Schema validation failure for request body',
    });
  });

  it('with additional fields', () => {
    const data = {
      id: 12012,
      name: 'Simon',
    };
    const response = handler(data);

    expect(response?.statusCode).toEqual(422);
    expect(JSON.parse(response.body)).toEqual({
      details: [
        {
          instancePath: '',
          keyword: 'additionalProperties',
          message: 'must NOT have additional properties',
          params: {
            additionalProperty: 'id',
          },
          schemaPath: '#/additionalProperties',
        },
      ],
      title: 'Schema validation failure for request body',
    });
  });

  it('with valid data', () => {
    const data = {
      name: 'Simon',
    };
    const response = handler(data);

    expect(response?.statusCode).toEqual(201);
    expect(response.body).toEqual('{}');
  });
});
