import { User } from './../../entity/User';
export type EducatorData = {
    surname: string,
    name: string,
    patronymic: string,
    department: string,
    accessToken?: string,
    user?: User
}

export type EditableFields = Partial<Omit<EducatorData, 'accessToken'>>