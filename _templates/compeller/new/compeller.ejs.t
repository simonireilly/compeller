---
to: <%= directory %>/openapi/compeller.ts
---
import { compeller } from 'compeller'
import { OpenAPISpecification } from './spec'

const compelled = compeller(OpenAPISpecification)
