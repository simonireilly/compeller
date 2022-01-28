import { handler } from '../fixtures';

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
