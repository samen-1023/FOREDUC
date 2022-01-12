import { User } from './../../entity/User';
import { ReadProp } from './../../types/Service.d';
import { EditableFields, EducatorData } from './Educator';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Context, Next } from 'koa';
import { validationResults } from 'koa-req-validation';
import EducatorService from "./Educator.services";
import { Educator } from '../../entity/Educator';
import ValidationResult from 'koa-req-validation/dist/lib/ValidationResult';
import UserServices from '../user/User.services';
import TokenServices from '../token/Token.services';

class EducatorController {
    /**
     * Сохраняет данные о преподавателе и связывает с ним
     * @param {EducatorInfo} ctx.request.body
     */
    async create(ctx: Context, next: Next) {
        try {
            const validated: ValidationResult = validationResults(ctx)

            if (validated.hasErrors()) {
                ctx.throw(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
            }

            const { surname, name, patronymic, department, accessToken }: EducatorData = ctx.request.body
            const {create} = new EducatorService()
            const educator: Educator = await create({
                surname, name, patronymic, department, accessToken
            })

            ctx.body = educator
        } catch (err) {
            console.log(err);
            
            await next()
        }
    }

    /**
     * 
     * @param {EducatorSearchOpts} ctx.request.body
     */
    async read(ctx: Context, next: Next) {
        try {
            const {read} = new EducatorService()
            const users: Educator[] = await read()
            
            ctx.body = users
        } catch {
            await next()
        }
    }

    async readOne(ctx: Context, next: Next) {
        try {
            const { id }: ReadProp = ctx.params
            const {readOne} = new EducatorService()
            const educator: Educator = await readOne(id)

            ctx.body = educator
        } catch(err) {
            ctx.app.emit('error', err, ctx)
            // await next()
        }
    }

    async update(ctx: Context, next: Next) {
        try {
            const validated: ValidationResult = validationResults(ctx)

            if (validated.hasErrors()) {
                ctx.throw(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
            }

            const { id }: ReadProp = ctx.params
            const editableFields: EditableFields = ctx.request.body
            const service = new EducatorService()
            const updated: Educator = await service.update(
                id, editableFields
            )

            ctx.body = updated
        } catch(err) {
            console.log(err)
            await next()
        }
    }

    async delete(ctx: Context, next: Next) {
        try {
            const { id }: ReadProp = ctx.params
            const service = new EducatorService()
            const deleted: boolean = await service.delete(id)

            ctx.body = { deleted }
        } catch(err) {
            console.log(err)
            await next()
        }
    }
}

export default EducatorController;