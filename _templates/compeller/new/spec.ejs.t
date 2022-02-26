---
to: <%= directory %>/openapi/spec.ts
---
import { versionPath } from './paths/version.path';

export const OpenAPISpecification = {
  info: {
    title: '<%= title %>',
    version: '1.0.0',
  },
  openapi: '3.1.0',
  paths: {
    ...versionPath
  },
};
