export class Service implements IService{
  protected di: DI
  protected mapper: IService
  constructor(di: DI) {
    this.di = di;
    this.mapper = null;
  }
  load<T>(params: T) {
    return this.mapper.load(params)
  }
  get<T>(params: T) {
    return this.mapper.get(params)
  }
  create<T>(params: T, payload: T) {
    return this.mapper.create(params, payload)
  }
  del<T>(params: T) {
    return this.mapper.del(params)
  }
  update<T>(params: T, payload: T) {
    return this.mapper.update(params, payload)
  }
}