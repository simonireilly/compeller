import { compeller } from '../../src';
import { OpenAPISpecification } from './openapi/spec';

const defaultCompeller = compeller(OpenAPISpecification);

console.info(
  defaultCompeller('v1/version', 'get').response('200', {
    version: '1.0.0',
  })
);
