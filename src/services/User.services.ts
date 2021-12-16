import { getRepository } from 'typeorm';
import { User } from './../entity/User';
import { IUserService } from '../types/IUserService'
import UserDto from '../dtos/User.dto';
import TokenService from './Token.services';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import createError from 'http-errors';


class UserService implements IUserService {
    async create(data) {
        const isExist = await this.readOne({ username: data.username });
        
        if (isExist) {
            throw new createError.BadRequest(`${isExist}`)
        }

        const { email, phone, username } = data
        const hashPassword = bcryptjs.hashSync(data.password)
        const userRepo = getRepository(User)
        const { accessToken, refreshToken } = TokenService.generateTokens({ 
            email, 
            username
        })
        const saved = await userRepo.save({
            email, 
            phone, 
            username, 
            password: hashPassword, 
            refreshToken
        })
        const user = new UserDto(saved)

        return { refreshToken, accessToken, ...user.dto }
    }

    async read(identificators) {
        const userRepo = getRepository(User)

        if(!identificators) {
            return await userRepo.find()
        }

        const users = await userRepo.find(identificators)

        return users
    }

    async readOne(identificators) {
        const [user] = await this.read(identificators)

        return user
    }

    async update(identificators, editableFields) {
        const userRepo = getRepository(User)
        const updated = await userRepo.update(
            identificators,
            editableFields
        )

        return updated
    }

    async delete(identificators) {
        const userRepo = getRepository(User)
        const deleted = await userRepo.delete(identificators)

        return deleted
    }

    async login(email, password) {
        const user = await this.readOne({ email })

        if (!user) {
            throw new createError.BadRequest()
        }

        const confirm = bcryptjs.compareSync(password, user.password)

        if (!confirm) {
            throw createError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
        }

        const userDto = new UserDto(user)
        const { accessToken, refreshToken } = TokenService.generateTokens({ userDto })

        await this.update({ id: userDto.id }, { refreshToken })

        return {
            ...userDto,
            accessToken,
            refreshToken
        }
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(token) {
        if (!token) {
            throw new Error(ReasonPhrases.UNAUTHORIZED)
        }
        
        const {userDto: dto} = TokenService.validateRefreshToken(token)
        const tokenFromDb = await TokenService.findToken(token)

        if (!dto || !tokenFromDb) {
            throw new createError.Unauthorized()
        }

        const user = await this.readOne({ id: dto.id })
        const userDto = new UserDto(user)
        const {accessToken, refreshToken} = TokenService.generateTokens(userDto.dto)
        
        await TokenService.saveToken(userDto.id, refreshToken)

        return {
            ...userDto.dto,
            refreshToken,
            accessToken
        }
    }
}

export default new UserService();