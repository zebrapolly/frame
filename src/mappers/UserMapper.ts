import { MySQLMapper } from "../framework/lib/MySQLMapper";
import { User } from "../models/User";

export class UserMapper extends MySQLMapper{
  constructor(di: DI) {
    super(di)
    this.connection = di.getIstance('postgres');
    this.Model = User;
    this.table = this.di.get('config').sources.users;
  }
}