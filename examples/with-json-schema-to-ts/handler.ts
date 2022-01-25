import { compeller } from '../../src';
import { OpenAPISpecification } from './specification';

const specification = compeller(OpenAPISpecification);

const { response } = specification('/pet', 'get');

response('200', { age: 11, name: 'Bobby' });
