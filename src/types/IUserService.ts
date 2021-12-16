import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../entity/User';
import { IService } from './IService';

export interface IUserService extends IService<User> {
    create: (
        data: {
            email: string;
            phone: string;
            username: string;
            password: string;
        }
    ) => Promise<{
        accessToken: string;
        id: number;
        username: string;
        role: string;
    }>;

    read: (identificators: { 
        id?: number, 
        username?: string,
        refreshToken?: string
    }) => Promise<User[]>;

    readOne: (identificators: { 
        id?: number, 
        username?: string,
        refreshToken?: string
    }) => Promise<User>;

    update: (
        identificators: { 
            id?: number, 
            username?: string,
            refreshToken?: string
        }, 
        editableFields: {
            email?: string,
            phone?: string,
            username?: string,
            role?: string
        }
    ) => Promise<UpdateResult>;

    delete: (identificators: { 
        id?: number, 
        username?: string,
        refreshToken?: string
    }) => Promise<DeleteResult>;
}