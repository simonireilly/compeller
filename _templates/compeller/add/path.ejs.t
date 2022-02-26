---
to: <%= directory %>/openapi/paths/<%= h.inflection.dasherize(h.inflection.underscore( name )) %>.path.ts
---
import { <%= h.inflection.classify( name )%>Schema } from '../components/schemas/<%= h.inflection.dasherize(h.inflection.underscore( name )) %>.schema'

export const path = {
  '<%= path %>': {
    <%= method %>: {
      responses: {
        200: {
          description: 'Get the current API version',
          content: {
            'application/json': {
              schema: <%= h.inflection.classify( name )%>Schema,
            },
          },
        },
      },
    },
  },
};

