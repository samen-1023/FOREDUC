import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import UserServices from '../user/User.services';
import ITokenService, { Payload } from '../../types/TokenService';


class TokenService implements ITokenService {
    generateTokens(payload: Payload) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: +process.env.JWT_ACCESS_EXPIRES_IN }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: +process.env.JWT_REFRESH_EXPIRES_IN }
        );

        return { accessToken, refreshToken };
    }

    validateAccessToken(token: string) {
        try {
            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

            return user;
        } catch {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

            return user;
        } catch {
            return null;
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const user = await UserServices.readOne({ id: userId })

        if (!user) {
            throw new createError.BAD_REQUEST()
        }

        const newUser = await UserServices.update({ id: userId }, { refreshToken });

        return newUser
    }

    async removeToken(refreshToken: string) {
        const user = await UserServices.update({ refreshToken }, { refreshToken: null })

        return user;
    }

    async findToken(refreshToken: string) {
        const user = await UserServices.readOne({ refreshToken })

        return user.refreshToken
    }
}

export default new TokenService();