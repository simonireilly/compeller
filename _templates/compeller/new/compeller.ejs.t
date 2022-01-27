---
to: <%= directory %>/openapi/compeller.ts
---
import { compeller } from 'compeller'
import { OpenAPISpecification } from './spec'

cont compelled = compeller(OpenAPISpecification)
