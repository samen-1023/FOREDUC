import { BaseFilters } from '../../entity/common/types';
import { AbstractBaseService } from "../../core/abstract-base-service";
import { User } from "../../entity/user";

export default class UserService extends AbstractBaseService<User> {
  constructor() {
    super(User);
  }

  async getList({
    conditions
  }: BaseFilters<User>) {
    const items = this.repo.find({where: conditions});

    return items;
  }

  async getItem({ conditions }: BaseFilters<User>) {
    const item = this.repo.findOne({where: conditions});

    return item;
  }
}