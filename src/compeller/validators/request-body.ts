import Ajv, { JSONSchemaType } from 'ajv';
import { FromSchema } from 'json-schema-to-ts';

export const requestBodyValidator = <BodySchema>(
  schema: Record<string, unknown>
) => {
  const unsafeSchema = (schema || {}) as JSONSchemaType<FromSchema<BodySchema>>;

  const ajv = new Ajv({
    allErrors: true,
  });

  return ajv.compile<FromSchema<BodySchema>>(unsafeSchema);
};
