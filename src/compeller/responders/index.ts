/**
 TODO:
 *
 * Responders are adapters that handle the responder interface and produce a
 * response that is compliant with their domain.
 *
 * Whilst currently the responder returns an object, it might be wiser in the
 * future to return a function.
 *
 * In that way the responder can be bound to the `statusCode, body, headers`
 * of the response but responder would still support forms of injection.
 */

export * from './default';
export * from './aws/api-gateway-v1';
