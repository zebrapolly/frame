export class MySQLMapper implements IService{
  protected di: DI
  protected connection: any
  protected table: string
  protected Model: any
  constructor(di: DI) {
    this.di = di
    this.connection = null
    this.table = null
    this.Model = null
  }
  public async get<T>(params: T & IParams): Promise<any> {
    const res = await this.load(params)
    return res[0]
  }
  public async del<T>(params: T & IParams): Promise<any> {
    const res = this.connection.from(this.table).where(params).del()
    return res
  }
  async load<T>(params: T & IParams) {
    console.log(params)
    const p = Object.assign({}, params);
    if (params.limit) delete p.limit
    if (params.offset) delete p.offset
    if (params.orderBy) delete p.orderBy
    if (params.orderDirection) delete p.orderDirection

    const rows = this.connection
    .select()
    .from(this.table)
    .where(p)
    if (params.limit && params.offset) {
      rows.limit(params.limit, params.offset)
    }
    if (params.orderBy) {
      const orderDirection = params.orderDirection || 'ASC'
      rows.orderBy(params.orderBy, orderDirection)
    }
    return this.createCollection<T>(await rows)
  }
  public async create<T>(params: T, payload: T): Promise<any> {
    const rows = new this.Model(payload)
    const res = await this.connection.insert(rows).into(this.table)
    return {
      ...rows
    }
  }
  public async update<T>(params: T, payload: T): Promise<any> {
    const rows = new this.Model(payload)
    const res = await this.connection(this.table)
      .where(params)
      .update(payload)
      return Object.assign({}, params, payload)
  }
  createCollection<T>(rows: any) {
    return rows.map((row: T) => new this.Model(row))
  }
}