import { UserService } from "../services/UserService";
import { Controller } from "../framework/lib/Controller";

export class UsersController extends Controller{
  protected service: UserService
  constructor(di: DI) {
    super(di)
    this.service = new UserService(di);
  }
}