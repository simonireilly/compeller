/**
 * Parameters validation needs to validate all entries in an array
  {
    name: 'limit',
    in: 'query',
    required: false,
    schema: {
      type: 'integer',
      format: 'int32',
    },
  }
 */

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

interface INameSchemaMap {
  [key: string]: {
    required: boolean;
    schema: any;
  };
}

interface IParameterSchemaMap {
  query: INameSchemaMap;
  header: INameSchemaMap;
  path: INameSchemaMap;
  cookie: INameSchemaMap;
}

export interface ICompellerParameterObject {
  in: 'query' | 'header' | 'path' | 'cookie';
  name: string;
  schema: JSONSchema;
  required: boolean;
  [key: string]: any;
}

export const validateParameters = (parameters: ICompellerParameterObject[]) => {
  return parameters.reduce((inSchemaMap, parameter) => {
    inSchemaMap[parameter.in] = inSchemaMap[parameter.in] ?? {};

    inSchemaMap[parameter.in][parameter.name] = {
      required: parameter.required ?? false,
      schema: parameter.schema,
    };

    return inSchemaMap;
  }, {} as IParameterSchemaMap);
};
