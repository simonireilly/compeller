import { requestBodyValidator } from './request-body';

describe('validateRequestBody', () => {
  it('errors are null for empty body', () => {
    const validator = requestBodyValidator({});

    validator({});

    expect(validator.errors).toEqual(null);
  });

  it('infers the return type from a JSON schema', () => {
    const testSchema = {
      type: 'object',
      required: ['name', 'meta'],
      additionalProperties: false,
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
          maximum: 200,
          minimum: 100,
        },
        meta: {
          type: 'object',
          required: ['createdAt'],
          additionalProperties: false,
          properties: {
            createdAt: {
              type: 'string',
            },
          },
        },
      },
    } as const;

    const validator = requestBodyValidator<typeof testSchema>(testSchema);

    let data = {};

    if (validator(data)) {
      data.name;
    }

    expect(validator.errors).toEqual([
      {
        instancePath: '',
        keyword: 'required',
        message: "must have required property 'name'",
        params: { missingProperty: 'name' },
        schemaPath: '#/required',
      },
      {
        instancePath: '',
        keyword: 'required',
        message: "must have required property 'meta'",
        params: { missingProperty: 'meta' },
        schemaPath: '#/required',
      },
    ]);
  });
});
