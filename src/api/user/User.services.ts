import { BaseFindFilters, BaseFilters } from './../../entity/common/types';
import { AbstractBaseService } from "../../core/AbstractBaseService";
import { User } from "../../entity/User";

export default class UserService extends AbstractBaseService<User> {
  async getItem(filters: BaseFindFilters<User>) {
    return this.repo.findOne(filters);
  }

  async getList(filters: BaseFilters<User>) {
    return this.repo.find(filters);
  }
}