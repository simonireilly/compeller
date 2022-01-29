import { ICompellerOptions } from '../..';

export const defaultResponder: ICompellerOptions['responder'] = <T, U, V>(
  statusCode: T,
  body: U,
  headers?: V
): {
  statusCode: T;
  body: U;
  headers?: V;
} => ({
  statusCode,
  body,
  headers,
});
