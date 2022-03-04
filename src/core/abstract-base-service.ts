import { BaseFilters } from '../entity/common/types';
import { EntityTarget, getMongoRepository, MongoRepository } from "typeorm";
import { BasicEntity } from '../entity/common/basic-entity';
import { omit } from 'ramda';

export abstract class AbstractBaseService<E extends BasicEntity> {
  protected repo: MongoRepository<E>;

  constructor(
    private _entity: EntityTarget<E>,
  ) {
    this.repo = getMongoRepository(this._entity);
  }

  async saveItem(data: Partial<E>): Promise<E> {
    if ('_id' in data) {
      return this.updateItem(data as E);
    } else {
      return this.createItem(data);
    }
  }

  protected async createItem(data: Partial<E>): Promise<E> {
    const omitFields = ['_id', 'createdAt', 'updatedAt'];
    const item = omit(omitFields, data);

    return this.repo.save(item as any);
  }

  protected async updateItem(data: Partial<E> & Pick<E, '_id'>): Promise<E> {
    const omitFields = ['createdAt', 'updatedAt'];
    const item = omit(omitFields, data) as any;
    await this.repo.save(item);

    return this.getItem(item._id);
  }

  protected abstract getItem({ conditions }: BaseFilters<E>): Promise<E>;

  protected abstract getList({ conditions, pagination, order }: BaseFilters<E>): Promise<E[]>;

  async deleteItem(id: string): Promise<E> {
    const item = await this.getItem({ conditions: id });
    await this.repo.remove(item);

    return item;
  }
}