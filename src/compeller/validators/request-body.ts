import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import { FromSchema } from 'json-schema-to-ts';

/**
 * The request body wraps AJV schema validation with a safe failure to using an
 * empty object (get, options, head requests etc.)
 *
 * @param schema A JSON Schema
 * @returns {ValidateFunction} A validator function that holds schema errors
 */
export const requestBodyValidator = <BodySchema>(
  schema: Record<string, unknown>
) => {
  const unsafeSchema = (schema || {}) as JSONSchemaType<FromSchema<BodySchema>>;

  // TODO: We have an AJV instance here, if we make the body, path and headers
  // validator share a single AJV instance we will have a faster code, with a
  // smaller memory allocation. However, we will need to have all the same error
  // handling, and configuration
  const ajv = new Ajv({
    allErrors: true,
  });

  return ajv.compile(unsafeSchema);
};
