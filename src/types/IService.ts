import { DeleteResult, UpdateResult } from "typeorm";

export interface IService<T> {
    create: (data: { [key: string]: any }) => Promise<{ [key: string]: any }>;

    read: (identificators: { [key: string]: any }) => Promise<T[]>;

    readOne: (identificators: { [key: string]: any }) => Promise<T>;

    update: (
        identificators: { [key: string]: any },
        editableFields: {
            [key: string]: any
        }
    ) => Promise<UpdateResult>;

    delete: (identificators: { [key: string]: any }) => Promise<DeleteResult>;
}