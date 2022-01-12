import { TokenPair } from '../../types/TokenService';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { EditableFields, Opts, UserData } from '../../types/UserService';
import TokenService from '../token/Token.services';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import createError from 'http-errors';
import UserDto from './User.dto';

class UserService {
    async create(data: UserData) {
        const isExist = await this.readOne({ username: data.username });
        
        if (isExist) {
            throw new createError.BadRequest(`${isExist}`)
        }

        const { email, phone, username } = data
        const hashPassword = bcryptjs.hashSync(data.password)
        const userRepo = getRepository(User)
        const saved = await userRepo.save({
            email, 
            phone, 
            username, 
            password: hashPassword
        })
        const user = new UserDto(saved)
        
        const { accessToken, refreshToken } = TokenService.generateTokens({...user.dto})
        await this.update({username}, {refreshToken})

        return { refreshToken, accessToken, ...user.dto }
    }

    async read(identificators: Opts) {
        const userRepo = getRepository(User)

        if(!identificators) {
            return await userRepo.find()
        }

        const users = await userRepo.find(identificators)

        return users
    }

    async readOne(identificators: Opts) {
        const [user] = await this.read(identificators)

        return user
    }

    async update(identificators: Opts, editableFields: EditableFields) {
        const userRepo = getRepository(User)
        const updated = await userRepo.update(
            identificators,
            editableFields
        )

        return updated
    }

    async delete(identificators: Opts) {
        const userRepo = getRepository(User)
        const deleted = await userRepo.delete(identificators)

        return deleted
    }

    async login(email: string, password: string) {
        const user = await this.readOne({ email })

        if (!user) {
            throw new createError.BadRequest()
        }

        const confirm = bcryptjs.compareSync(password, user.password)

        if (!confirm) {
            throw createError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
        }

        const userDto = new UserDto(user)
        const { accessToken, refreshToken } = TokenService.generateTokens({ ...userDto.dto })

        await this.update({ id: userDto.id }, { refreshToken })

        return {
            ...userDto,
            accessToken,
            refreshToken
        }
    }

    async logout(refreshToken: string) {
        const token = await TokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(token: string) {
        if (!token) {
            throw new createError.Unauthorized()
        }
        
        const validated: any = TokenService.validateRefreshToken(token)
        const tokenFromDb: string = await TokenService.findToken(token)

        if (!validated || !tokenFromDb) {
            throw new createError.Unauthorized()
        }
        
        const user: User = await this.readOne({ id: validated.id })
        const userDto: UserDto = new UserDto(user)
        const {
            accessToken, 
            refreshToken
        }: TokenPair = TokenService.generateTokens({...userDto.dto})
        
        await TokenService.saveToken(userDto.id, refreshToken)

        return {
            ...userDto.dto,
            refreshToken,
            accessToken
        }
    }
}

export default new UserService();