import { AbstractBaseService } from "../../core/abstract-base-service";
import { BaseFilters } from "../../entity/common/types";
import { Group } from "../../entity/group";

export class GroupService extends AbstractBaseService<Group> {
    constructor() {
        super(Group);
    }

    async getItem({ conditions }: BaseFilters<Group>) {
        conditions = typeof conditions === 'string' ? { _id: conditions } : conditions;

        return this.repo.findOne({
            where: conditions
        });
    }

    async getList({ conditions, pagination, order }: BaseFilters<Group>) {
        conditions = typeof conditions === 'string' ? { _id: conditions } : conditions;

        return this.repo.find({
            where: conditions,
            order,
            take: pagination?.take || 0,
            skip: pagination?.skip || 0,
        });
    }
}