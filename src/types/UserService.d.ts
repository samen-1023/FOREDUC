import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../entity/User';
import { IService } from './Service';

export type UserData = {
    email: string,
    phone: string,
    username: string,
    password: string
}

export type Opts = { 
    id?: number,
    email?: string,
    username?: string,
    refreshToken?: string,
    accessToken?: string
}

export type EditableFields = {
    email?: string,
    phone?: string,
    username?: string,
    role?: string,
    refreshToken: string
}