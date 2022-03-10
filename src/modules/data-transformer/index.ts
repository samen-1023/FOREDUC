import { EFileNames, mapping } from './file-mapping';
import { DataContainer } from './data-container';
import { Document } from '../../entity/Document';
import { DocumentService } from '../../api/services/document.services';

class TransformerDataPacker {
    static parse(
        data: Record<string, any> | string, 
        { name }: { name: EFileNames }
    ): DataContainer {
        const { handler } = mapping.find(m => m.name === name);

        if (typeof data === 'string') {
            return new DataContainer(JSON.parse(data), handler);
        }

        return new DataContainer(data, handler);
    }
}

export { TransformerDataPacker as TDP };