import { AbstractBaseService } from "../../core/abstract-base-service";
import { Group } from "../../entity/group";

export class GroupService extends AbstractBaseService<Group> {
    constructor() {
        super(Group);
    }
}