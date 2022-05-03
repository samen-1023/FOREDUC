import { AbstractBaseService } from "../../core/abstract-base-service";
import { BaseFilters, BaseFindOneOptions } from "../../entity/common/types";
import { Specialization } from "../../entity/specialization";
import { toObjectID } from "../../functions/to-object-id";

export class SpecializationService extends AbstractBaseService<Specialization> {
    constructor() {
        super(Specialization);
    }

    async getList({ conditions, pagination }: BaseFilters<Specialization>) {
        conditions = typeof conditions === 'string' ? { _id: conditions } : conditions;

        return this.repo.find({
            where: conditions,
            take: pagination?.take || 0,
            skip: pagination?.skip || 0,
        });
    }
}