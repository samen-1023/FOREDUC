import { AbstractBaseService } from "../../core/abstract-base-service";
import { Document } from "../../entity/document";
import { ERoles } from '../../entity/common/enums';

export class DocumentService extends AbstractBaseService<Document> {
    constructor() {
        super(Document);
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