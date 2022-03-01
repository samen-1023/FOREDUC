import { BaseFilters, BaseFindFilters } from './../entity/common/types';
import { DeepPartial, EntityTarget, FindManyOptions, getMongoRepository, MongoRepository, ObjectID } from "typeorm";
import { omit } from 'ramda';
import { BasicEntity } from '../entity/common/BasicEntity';

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
    const item = omit(['_id', 'createdAt', 'updatedAt'], data)

    return await this.repo.save(item as any);
  }

  protected async updateItem(data: Partial<E> & Pick<E, '_id'>): Promise<E> {
    const item = omit(['createdAt', 'updatedAt'], data);
    await this.repo.save(item as DeepPartial<E>);

    return await this.getItem(item._id);
  }

  protected abstract getItem(filters: BaseFindFilters<E>): Promise<E>;

  protected abstract getList(filters: BaseFilters<E>): Promise<E[]>;

  async deleteItem(id: string): Promise<E> {
    const item = await this.getItem(id);
    await this.repo.remove(item);

    return item;
  }
}