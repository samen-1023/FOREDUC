import { body } from "koa-req-validation";
import { isToken } from "typescript";

export default class EducatorValidator {
    private base(key: string, length: {min: number, max: number} = {min: 2, max: 255}) {
        return body(key)
            .isLength(length)
            .withMessage(`${key} не соответствует длине - от ${length.min} до ${length.max}`)
    }

    surname(key: string = 'surname') {
        return this.base(key).build()
    }

    name(key: string = 'name') {
        return this.base(key).build()
    }

    patronymic(key: string = 'patronymic') {
        return this.base(key).build()
    }

    department(key: string = 'department') {
        return this.base(key).build()
    }

    accessToken(key: string = 'accessToken') {
        return body(key)
            .isJWT()
            .withMessage(`${key} имеет невалидную форму`)
            .build()
    }
}