import { isNil } from 'ramda';
import { mapping } from './file-mapping';
import { DataContainer } from './data-container';
import { EFileNames } from '../../entity/common/enums';

class TransformerDataPacker {
    wrap(
        data: Record<string, any> | string, 
        { name }: { name: EFileNames }
    ): DataContainer {
        const handler = this.hasHandler({ name });

        if (isNil(handler)) {
            throw new Error("HANDLER_NOT_FOUND");
        }
        if (typeof data === 'string') {
            return new DataContainer(JSON.parse(data), handler);
        }

        return new DataContainer(data, handler);
    }

    hasHandler({ name }: { name: EFileNames }) {
        return mapping.find(m => m.name === name)?.handler;
    }
}

export { TransformerDataPacker as TDP };