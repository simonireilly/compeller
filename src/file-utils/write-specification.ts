import { writeFileSync } from 'fs';
import { join } from 'path';
import { ICompellerOpenAPIObject, ICompellerOptions } from '../compeller';

export const writeSpecification = (
  jsonSpecFile: ICompellerOptions['jsonSpecFile'],
  spec: ICompellerOpenAPIObject
) => {
  let fileName;

  try {
    fileName =
      typeof jsonSpecFile === 'string'
        ? jsonSpecFile
        : join(process.cwd(), 'openapi.json');

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
