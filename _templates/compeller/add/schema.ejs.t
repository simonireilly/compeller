---
to: <%= directory %>/openapi/components/schemas/<%= h.inflection.dasherize(h.inflection.underscore( name )) %>.schema.ts
unless_exists: true
---
import { FromSchema } from 'json-schema-to-ts';

export const <%= h.inflection.classify( name )%>Schema = {} as const;

export type <%= h.inflection.classify( name )%> = FromSchema<typeof <%= h.inflection.classify( name )%>Schema>;

