import { Service } from "./Service";

export class Controller implements IService{
  protected di: DI
  protected service: IService
  public constructor(di: DI) {
    this.di = di;
  }
  load<T>(params: T) {
    return this.service.load(params)
  }
  get<T>(params: T) {
    return this.service.get(params)
  }
  create<T>(params: T, payload: T) {
    return this.service.create(params, payload)
  }
  del<T>(params: T) {
    return this.service.del(params)
  }
  update<T>(params: T, payload: T) {
    return this.service.update(params, payload)
  }
}