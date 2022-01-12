import { DeleteResult, UpdateResult } from "typeorm";

export type ReadProp = { id: number }
export type ReadProps = { id_in: number[] }

export interface IService<T> {
    create: (data: SharedObject) => Promise<T>;

    read: (props: SharedObject) => Promise<T[]>;

    readOne: (props: SharedObject) => Promise<T>;

    update: (props: SharedObject, editableFields: SharedObject) => Promise<UpdateResult>;

    delete: (props: SharedObject) => Promise<DeleteResult>;
}