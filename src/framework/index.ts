import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import {
  Context
} from 'koa';
import { DI } from './di';
import responder from './middlewares/responder';
import { validator } from './middlewares/validator';
import { dbAdapter } from './dbAdapter';
import { Controller } from './lib/Controller';
import { ServerError } from './ServerError';

interface IRouter extends Router {
  [key: string]: any;
}

export class Airborne {
  private port: number;
  private app: Koa;
  private router: IRouter;
  private config: IConfig;
  public di: DI;
  public constructor(config: any) {
    this.port = config.port;
    this.app = new Koa();
    this.di = new DI();
    this.router = new Router();
    this.di.set('config', config);
    this.config = this.di.get('config');
    if (this.di.get('config').db) {
      this.database();
    }
  }
  routes(routes: IRoute[]) {
    this.di.set('routes', routes)
    return this
  }
  controllers(controllers: { [key: string]: IService }) {
    for (const key in controllers) {
      const controller: IService = controllers[key];
      console.log(controller)
      const controllerInstence = new controller(this.di);
      this.di.setService(key, controllerInstence)
    }
    return this
  }
  database() {
    new dbAdapter(this.di).init()

  }
  start() {
    const routes = this.di.get('routes');

    routes.forEach((route: IRoute) => 
      this.router[route.method](
      route.path,
      validator(route.rules),
      async (ctx: Context) => {
        const controller = this.di.getIstance(route.controller);
        if (controller === undefined) {
          throw new ServerError('Controller not defined', 500);
        }
        if (controller[route.action] === undefined) {
          throw new ServerError('Action not defined', 500);
        }
        console.log('route', route);
        console.log('controller', controller[route.action]);
        const res = await controller[route.action](ctx.request.query, ctx.request.body)
        ctx.status = 200;
        return res;
      }
    ));
    
    this.app
      .use(bodyParser())
      .use(responder(this.config))
      .use(this.router.routes())
      .use(this.router.allowedMethods());
    this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`));
  }
}