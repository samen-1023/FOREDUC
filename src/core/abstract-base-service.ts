import { BaseFilters, BaseFindOneOptions } from '../entity/common/types';
import { DeepPartial, EntityTarget, In, Repository } from "typeorm";
import { BasicEntity } from '../entity/common/basic-entity';
import { omit } from 'ramda';
import { dataSource } from '../data-source';

type TUpdateRequest<E> = Partial<E> & Pick<E, keyof E>;

export abstract class AbstractBaseService<E extends BasicEntity> {
  protected repo: Repository<E>;

  constructor(
    private _entity: EntityTarget<E>,
  ) {
    this.repo = dataSource.getRepository(this._entity);
  }

  async saveItem(data: Partial<E>): Promise<E> {
    if ('id' in data) {
      let {id, ...rest} = data;

      return this.updateItem({id, ...rest} as E);
    } else {
      return this.createItem(data);
    }
  }

  protected async createItem(data: Partial<E>): Promise<E> {
    const omitFields = ['createdAt', 'updatedAt'];
    const item = omit(omitFields, data);

    return this.repo.save(item as any);
  }

  protected async updateItem(data: TUpdateRequest<E>): Promise<E> {
    const omitFields = ['createdAt', 'updatedAt'];
    const item = omit(omitFields, data) as TUpdateRequest<E>;

    await this.repo.save({ ...item } as DeepPartial<E>);

    return this.getItem({ id: item.id as string });
  }

  async getItem(conditions: BaseFindOneOptions<E>): Promise<E> {
    const {id, ...rest} = conditions;

    return this.repo.findOne({ where: { id } as any, ...rest });
}

  async getList({ conditions, pagination }: BaseFilters<E>) {
    conditions = typeof conditions === 'string' ? { id: conditions } : conditions;
    
    for (const key in conditions) {
      let elem = conditions[key];
      
      if (Array.isArray(elem)) {
        elem = In(elem);
      }

      conditions[key] = elem;
    }

    const elems = await this.repo.find({
        where: conditions as any,
        take: pagination?.take || 0,
        skip: pagination?.skip || 0,
    });        

    return elems;
  }

  async deleteItem(id: string): Promise<E> {
    const item = await this.getItem({ id });
    await this.repo.remove(item);

    return item;
  }
}