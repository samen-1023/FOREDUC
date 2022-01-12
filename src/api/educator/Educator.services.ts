import createError from 'http-errors';
import { getRepository } from 'typeorm';
import { Educator } from '../../entity/Educator';
import { User } from '../../entity/User';
import { ReadProp } from '../../types/Service';
import TokenServices from '../token/Token.services';
import UserServices from '../user/User.services';
import { EditableFields, EducatorData } from './Educator';

export default class EducatorServices {
    /**
     * вносит данные и привязывает аккаунт к пользовательским данным
     * @param payload - данные об учителе, которого зарегистрировали
     */
    async create(data: EducatorData) {
        const user: any = TokenServices.validateAccessToken(data.accessToken)

        if (!user) {
            throw new createError.BadRequest("Невалидный токен доступа")
        }

        const userData: User = await UserServices.readOne({ id: user.id })

        if (!userData) {
            throw new createError.BadRequest("Пользователя больше не существует")
        }
        
        const educator: Educator = await getRepository(Educator).save({
            surname: data.surname,
            name: data.name,
            patronymic: data.patronymic,
            department: data.department,
            user: userData
        })

        return educator
    }

    /**
     * фильтрует преподавателей по id
     * @param {ReadProps} opts - параметры фильтрации
     * @param {number[]} opts.id_in - массив id
     */
    async read(id_in?: number[]) {
        const repo = getRepository(Educator)

        if(!id_in) {
            const educators: Educator[] = await repo.find()

            return educators
        }

        const educators: Educator[] = await repo.findByIds(id_in)

        return educators
    }

    /**
     * ищет преподавателя
     * @param opts - параметры для поиска
     */
    async readOne(id: number) {
        const [educator]: Educator[] = await this.read([id])

        return educator
    }

    /**
     * редактирует поля найденного преподавателя
     * @param opts - параметры поиска
     * @param editableFields - параметры, которые можно отредактировать
     */
    async update(id: number, editableFields: EditableFields) {
        const updated: Educator = await getRepository(Educator).save({
            id,
            ...editableFields
        })

        return updated
    }

    /**
     * удаляет найденного преподавателя
     * @param opts - параметры поиска
     */
    async delete(id: number) {
        const deleted = await getRepository(Educator).delete({ id })

        return !!deleted.affected
    }
}