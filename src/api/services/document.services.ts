import { BaseFilters } from './../../entity/common/types';
import { AbstractBaseService } from "../../core/abstract-base-service";
import { Document } from "../../entity/Document";

export class DocumentService extends AbstractBaseService<Document> {
    constructor() {
        super(Document);
    }

    async getItem({ conditions }: BaseFilters<Document>) {
        conditions = typeof conditions === 'string' ? { _id: conditions } : conditions;

        const item = await this.repo.findOne({
            where: conditions
        });

        return item;
    }

    async getList({
        conditions,
        pagination,
        order,
    }: BaseFilters<Document>) {
        conditions = typeof conditions === 'string' ? { _id: conditions } : conditions;
        
        const items = await this.repo.find({
            where: conditions,
            ...pagination,
            order: { ...order }
        });

        return items;
    }
}