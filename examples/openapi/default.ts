import { compeller } from '../../src';
import { OpenAPISpecification } from './spec';

const defaultCompeller = compeller(OpenAPISpecification);

console.info(
  defaultCompeller('v1/version', 'get').response('200', {
    version: '1.0.0',
  })
);
