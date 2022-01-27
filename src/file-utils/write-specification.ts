import { writeFileSync } from 'fs';
import { join } from 'path';
import { ICompellerOpenAPIObject, ICompellerOptions } from '../compeller';

export const writeSpecification = (
  jsonSpecFile: ICompellerOptions['jsonSpecFile'],
  spec: ICompellerOpenAPIObject
) => {
  if (typeof jsonSpecFile === 'string') {
    writeFileSync(jsonSpecFile, JSON.stringify(spec, undefined, 2));
  } else {
    writeFileSync(
      join(process.cwd(), 'openapi.json'),
      JSON.stringify(spec, undefined, 2)
    );
  }
};
