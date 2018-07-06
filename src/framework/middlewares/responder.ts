import { Context, Response } from 'koa';
import { ServerError } from '../ServerError';

class Responder {
  private version: string
  private host: string
  private debug: boolean
  constructor (config: IConfig) {
    const { apiVersion, apiHost, protocol, debug } = config;
    this.version = apiVersion
    this.host = `${protocol}://${apiHost}`
    this.debug = debug
  }
  public middleware () {
    return async (ctx: Context, next: Function) => {
      try {
        const res = await next();
        const body = ctx.body;
        console.log(ctx.body)
        const status = ctx.status;
        if (ctx.method.toLowerCase() !== 'option' && status !== 404) {
          ctx.body = {
            version: this.version,
            root: this.host,
            data: res
          }
          ctx.status = status
        }
        if (status === 405) {
          Object.assign(ctx.body, { error: { message: 'Route not found' }})
        }
        if (status === 404) {
          // ctx.body = { error: { message: 'Not found' }}
          throw new ServerError("Not found", 404)
        }
      } catch(err) {
        ctx.status = err.status || 500
        const message = err.message || err
        ctx.body = {
          version: this.version,
          root: this.host,
          error: {
            message: err.message || err,
            stack: err.stack || err,
          }
        }
        if (!this.debug) {
          delete ctx.body.stack
        }
      }
    }
  }
}


export default (config: IConfig) => (new Responder(config)).middleware();