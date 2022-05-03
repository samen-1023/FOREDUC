import { BaseFilters, BaseFindOneOptions } from '../entity/common/types';
import { DeepPartial, EntityTarget, MongoRepository, ObjectID } from "typeorm";
import { BasicEntity } from '../entity/common/basic-entity';
import { omit } from 'ramda';
import { getDataSource } from './get-datasource';
import { toObjectID } from '../functions/to-object-id';
import { transformConditions } from '../functions/transform-conditions';

type TUpdateRequest<E> = Partial<E> & Pick<E, keyof E>;

export abstract class AbstractBaseService<E extends BasicEntity> {
  protected repo: MongoRepository<E>;

  constructor(
    private _entity: EntityTarget<E>,
  ) {
    this.repo = getDataSource.getMongoRepository(this._entity);
  }

  async saveItem(data: Partial<E>): Promise<E> {
    if ('id' in data) {
      const {id, ...rest} = data;
      const oid = toObjectID(id);

      return this.updateItem({id: oid, ...rest} as E);
    } else {
      return this.createItem(data);
    }
  }

  protected async createItem(data: Partial<E>): Promise<E> {
    const omitFields = ['_id', 'createdAt', 'updatedAt'];
    const item = omit(omitFields, data);

    return this.repo.save(item as any);
  }

  protected async updateItem(data: TUpdateRequest<E>): Promise<E> {
    const {id, ...rest} = data;
    const oid = toObjectID(id);
    const omitFields = ['createdAt', 'updatedAt'];
    const item = omit(omitFields, rest) as TUpdateRequest<E>;

    await this.repo.save({id: oid, ...rest} as DeepPartial<E>);

    return this.getItem({ id: oid });
  }

  async getItem(conditions: BaseFindOneOptions<E>): Promise<E> {
    const {id, ...rest} = conditions;
    const oid = (typeof id === 'string' ? toObjectID(id): id) as any;

    return this.repo.findOne({
        where: { id: oid },
        ...rest,
    });
}

  async getList({ conditions, pagination }: BaseFilters<E>) {
    conditions = typeof conditions === 'string' ? { id: conditions } : conditions;
    conditions = transformConditions(conditions as any);

    const elems = await this.repo.find({
        where: conditions,
        take: pagination?.take || 0,
        skip: pagination?.skip || 0,
    });        

    return elems;
  }

  async deleteItem(id: string): Promise<E> {
    const oid = toObjectID(id);
    const item = await this.getItem({ id: oid });
    await this.repo.remove(item);

    return item;
  }
}