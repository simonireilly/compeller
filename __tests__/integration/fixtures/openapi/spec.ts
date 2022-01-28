import { ErrorAPIComponent, ErrorAPISchema } from './components/Error';
import {
  NewPetAPIComponent,
  NewPetAPISchema,
  PetAPIComponent,
  PetAPISchema,
  PetsAPIComponent,
  PetsAPISchema,
} from './components/Pet';

export const OpenAPISpecification = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Type secure specification',
    license: {
      name: 'MIT',
    },
  },
  servers: [
    {
      url: 'http://petstore.swagger.io/v1',
    },
  ],
  paths: {
    '/pets': {
      get: {
        summary: 'List all pets',
        operationId: 'listPets',
        tags: ['pets'],
        parameters: [
          {
            name: 'limit',
            in: 'query',
            description: 'How many items to return at one time (max 100)',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A paged array of pets',
            headers: {
              'x-next': {
                description: 'A link to the next page of responses',
                schema: {
                  type: 'string',
                },
              },
            },
            content: {
              'application/json': {
                schema: PetsAPIComponent,
              },
            },
          },
          '422': {
            description: 'unexpected error',
            content: {
              'application/json': {
                schema: ErrorAPIComponent,
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a pet',
        operationId: 'createPets',
        tags: ['pets'],
        requestBody: {
          description: 'Create pet body',
          content: {
            'application/json': {
              schema: NewPetAPIComponent,
            },
          },
        },
        responses: {
          '201': {
            description: 'Null response',
          },
          '422': {
            description: 'unexpected error',
            content: {
              'application/json': {
                schema: ErrorAPIComponent,
              },
            },
          },
        },
      },
    },
    '/pets/{petId}': {
      get: {
        summary: 'Info for a specific pet',
        operationId: 'showPetById',
        tags: ['pets'],
        parameters: [
          {
            name: 'petId',
            in: 'path',
            required: true,
            description: 'The id of the pet to retrieve',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Expected response to a valid request',
            content: {
              'application/json': {
                schema: PetAPIComponent,
              },
            },
          },
          '422': {
            description: 'unexpected error',
            content: {
              'application/json': {
                schema: ErrorAPIComponent,
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Pet: PetAPISchema,
      NewPet: NewPetAPISchema,
      Pets: PetsAPISchema,
      Error: ErrorAPISchema,
    },
  },
};
