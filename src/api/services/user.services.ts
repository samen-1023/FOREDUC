import { AbstractBaseService } from "../../core/abstract-base-service";
import { User } from '../../entity/user';


export default class UserService extends AbstractBaseService<User> {
  constructor() {
    super(User); 
  }
}