import { ICompellerOptions } from '../..';

export const defaultResponder: ICompellerOptions['responder'] = <T, U>(
  statusCode: T,
  body: U
) => ({
  statusCode,
  body,
});
