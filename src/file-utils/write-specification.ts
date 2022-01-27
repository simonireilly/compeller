import { writeFileSync } from 'fs';
import { join } from 'path';
import { ICompellerOpenAPIObject, ICompellerOptions } from '../compeller';

/**
 * Write a JSON object to file if a valid path if provided
 *
 * @default `${__dirname}/openapi.json`
 *
 * @param jsonSpecFile If true a default path will be used as provided, other provide a fully qualified path
 * @param spec The OpenAPI specification object
 */
export const writeSpecification = (
  jsonSpecFile: ICompellerOptions['jsonSpecFile'],
  spec: ICompellerOpenAPIObject
) => {
  let fileName;

  if (['production', 'prod'].includes(process?.env?.NODE_ENV || '')) return;

  try {
    fileName =
      typeof jsonSpecFile === 'string'
        ? jsonSpecFile
        : join(__dirname, 'openapi.json');

    writeFileSync(fileName, JSON.stringify(spec, undefined, 2));
  } catch (err) {
    console.warn(
      'Compeller could not write your schema to a file and has rescued to prevent unwanted runtime side-effects',
      {
        fileName,
        error: err,
      }
    );
  }
};
