export class DI {
  private routes:IRoute[]
  [key: string]: any
  constructor() {
    this.routes = [];
    this.controllers = {};
    this.services = {};
  };

  set(diName: string, diValue: any) {
    this[diName] = diValue;
    return this;
  }
  get(diName: string) {
    return this[diName];
  }
  setService<T>(key: string, service: T):void {
    this.services[key] = service;
  }
  getIstance(key: string) {
    return this.services[key];
  } 
}