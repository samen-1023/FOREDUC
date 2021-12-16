import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Context, Next } from "koa";
import { validationResults } from "koa-req-validation";
import UserServices from "../services/User.services";

class UserController {
    async registration(ctx: Context) {
        try {
            const res = validationResults(ctx)

            if (res.hasErrors()) {
                ctx.throw(
                    StatusCodes.BAD_REQUEST,
                    ReasonPhrases.BAD_REQUEST,
                    res.mapped()
                );
            }

            const { email, phone, username, password } = ctx.request.body
            const user = await UserServices.create({
                email, phone, username, password
            })

            ctx.cookies.set('refreshToken', user.refreshToken, {
                httpOnly: true,
                maxAge: +process.env.JWT_REFRESH_EXPIRES_IN
            })
            ctx.body = user
        } catch (err) {
            console.log(err);

            ctx.throw(err.status, err.message, err)
        }
    }

    async getUsers(ctx: Context) {
        try {
            const users = await UserServices.read({})

            ctx.body = users
        } catch (err) {
            console.log(err);

            ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
        }
    }

    async login(ctx: Context) {
        try {
            const res = validationResults(ctx)

            if (res.hasErrors()) {
                ctx.throw(
                    StatusCodes.BAD_REQUEST,
                    ReasonPhrases.BAD_REQUEST,
                    res.mapped()
                );
            }

            const { email, password } = ctx.request.body;
            const user = await UserServices.login(email, password);

            ctx.cookies.set(
                'refreshToken',
                user.refreshToken,
                { maxAge: +process.env.JWT_REFRESH_EXPIRES_IN, httpOnly: true }
            )

            ctx.body = user
        } catch (err) {
            console.log(err);

            ctx.throw(err.status, err.message)
        }
    }

    async logout(ctx: Context) {
        try {
            const refreshToken = ctx.cookies.get('refreshToken')
            const token = await UserServices.logout(refreshToken)
            ctx.cookies.set('refreshToken', null)

            ctx.body = token
        } catch (err) {
            console.log(err)
            ctx.throw(err.status, err.message)
        }
    }

    async refresh(ctx: Context) {
        try {
            const token = ctx.cookies.get('refreshToken')
            const {
                id, email, phone, username, accessToken, role, refreshToken
            } = await UserServices.refresh(token)

            ctx.cookies.set('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: +process.env.JWT_REFRESH_EXPIRES_IN
            })

            ctx.body = { id, email, phone, username, role, accessToken }
        } catch (err) {
            console.log(err)
            ctx.throw(err.status, err.message)
        }
    }

    async delete(ctx: Context) {
        const {username} = ctx.request.body
        const isDeleted = await UserServices.delete({username})

        ctx.body = isDeleted
    }
}

export default new UserController();