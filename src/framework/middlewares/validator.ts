import * as joi from 'joi';
import { Context } from 'koa';
import { ServerError } from '../ServerError';

export function validator(rules: any): any {
  if (rules === undefined || !rules) {
    throw new Error('Schema cannot be empty.');
  }
  const fields = Object.keys(rules);
  return (ctx: Context, next: Function) => {
  const result = joi.validate(Object.assign({}, ctx.request.body, ctx.request.query), rules);
    if (result.error) {
      console.log(result)
      throw new ServerError(result.error.message, 400)
    }
    return next();
  };

}