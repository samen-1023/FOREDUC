import { isNil } from 'ramda';
import { EExtention } from './../../entity/common/types';
import { AbstractBaseHandler } from './handlers/abstract-base-handler';

export class DataContainer {
    constructor(
        private _data: Record<string, any>,
        private _handler: AbstractBaseHandler,
    ) {}

    to({ format }: { format: EExtention }) {
        let handlerFn: (data: Record<string, any>) => string;

        switch (format) {
            case EExtention.Json:
                handlerFn = this._handler.toJson;
            break;
            case EExtention.Xlsx:
                handlerFn = this._handler?.toXlsx;
            break;
            case EExtention.Xml:
                handlerFn = this._handler?.toXml;
            break;
        }

        if (isNil(handlerFn)) {
            throw new Error("Обработчика данных для этого формата не существует");
        }

        return handlerFn(this._data);
    }
}