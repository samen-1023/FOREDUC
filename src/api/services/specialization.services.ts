import { AbstractBaseService } from "../../core/abstract-base-service";
import { BaseFilters } from "../../entity/common/types";
import { Specialization } from "../../entity/specialization";

export class SpecializationService extends AbstractBaseService<Specialization> {
    constructor() {
        super(Specialization);
    }

    async getItem({ conditions }: BaseFilters<Specialization>) {
        conditions = typeof conditions === 'string' ? { _id: conditions } : conditions;

        return this.repo.findOne({
            where: conditions,
        });
    }

    async getList({ conditions, pagination, order }: BaseFilters<Specialization>) {
        conditions = typeof conditions === 'string' ? { _id: conditions } : conditions;

        return this.repo.find({
            where: conditions,
            order,
            take: pagination?.take || 0,
            skip: pagination?.skip || 0,
        });
    }
}