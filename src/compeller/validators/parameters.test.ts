import { validateParameters } from './parameters';

describe('parameters based validation', () => {
  describe('coordination of parameter collection', () => {
    it('arranges all required parameters', () => {
      const collection = validateParameters([
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'number',
            maximum: 10,
          },
          required: true,
        },
        {
          in: 'query',
          name: 'offset',
          schema: {
            type: 'number',
            minimum: 0,
          },
          required: true,
        },
      ]);

      expect(collection.query).toEqual({
        limit: {
          required: true,
          schema: {
            maximum: 10,
            type: 'number',
          },
        },
        offset: {
          required: true,
          schema: {
            minimum: 0,
            type: 'number',
          },
        },
      });
    });
  });
});
