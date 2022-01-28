import { writeSpecification } from './write-specification';

describe('writeSpecification', () => {
  it('with directory and not file', () => {
    writeSpecification('./tmp', {
      info: {
        title: 'spec',
        version: '0.0.1',
      },
      openapi: '3.1.0',
      paths: {},
    });
  });
});
