import { UserMapper } from "../mappers/UserMapper";
import { Service } from "../framework/lib/Service";

export class UserService extends Service{
  protected mapper: UserMapper
  constructor(di: DI) {
    super(di)
    this.mapper = new UserMapper(di);
  }
  login<T>(params: T) {
    return this.mapper.load(params);
  }
}