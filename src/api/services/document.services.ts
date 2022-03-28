import { BaseFilters } from './../../entity/common/types';
import { AbstractBaseService } from "../../core/abstract-base-service";
import { Document } from "../../entity/document";
import { ERoles } from '../../entity/common/enums';

export class DocumentService extends AbstractBaseService<Document> {
    constructor() {
        super(Document);
    }

    async getItem({ conditions }: BaseFilters<Document>) {
        conditions = typeof conditions === 'string' ? { _id: conditions } : conditions;

        return this.repo.findOne({
            where: conditions
        });
    }

    async getList({ conditions, pagination, order }: BaseFilters<Document>) {
        conditions = typeof conditions === 'string' ? { _id: conditions } : conditions;
        
        return this.repo.find({
            where: conditions,
            order,
            take: pagination?.take || 0,
            skip: pagination?.skip || 0,
        });
    }

    private removeExtraRoles(list: ERoles[]): ERoles[] {
        return list.includes(ERoles.All) ? [ERoles.All] : list;
    }

    /**
     * По-умолчанию, при создании обрабатываются параметры canEdit
     * и canRead методом removeExtraRoles
     */
    async createItem(data: Partial<Document>) {
        let {canEdit, canRead, ...rest} = data;
        canEdit = this.removeExtraRoles(canEdit);
        canRead = this.removeExtraRoles(canRead);

        return super.createItem({
            ...rest,
            canEdit,
            canRead,
        });
    }
}