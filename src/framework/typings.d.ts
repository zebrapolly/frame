declare interface IRoute {
  path: string
  method: string
  controller: string
  action: string
  rules: {
    [key: string]: any;
  }
}

declare interface DI {
  [key: string]: any;
}

declare enum orderDirection{
  ASC,
  DESC
}

declare interface IParams {
  limit: number
  offset: number
  orderBy: string
  orderDirection: orderDirection
}
declare interface IConfig {
  apiVersion: string
  apiHost: string
  protocol: string
  host: string
  port: number
  debug: boolean
  db?: {
    [key: string]: dbConfig
  },
  sources: {
    [key: string]: string
  }
}

declare interface dbConfig {
  host?: string
  port?: number
  user?: string
  password?: string
  database?: string
  driver: string
  charset?: string
}

declare interface IService {
  load<T>(params: T): any
  create<T>(params: T, payload: T): any
  update<T>(params: T, payload: T): any
  get<T>(params: T): any
  del<T>(params: T): any
}