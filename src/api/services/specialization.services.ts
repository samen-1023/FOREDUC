import { AbstractBaseService } from "../../core/abstract-base-service";
import { Specialization } from "../../entity/specialization";

export class SpecializationService extends AbstractBaseService<Specialization> {
    constructor() {
        super(Specialization);
    }
}