import jwt from 'jsonwebtoken';
import UserServices from './User.services';
import ITokenService from '../types/IToken';

class TokenService implements ITokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(
            payload, 
            process.env.JWT_ACCESS_SECRET, 
            {expiresIn: +process.env.JWT_ACCESS_EXPIRES_IN}
        );
        const refreshToken = jwt.sign(
            payload, 
            process.env.JWT_REFRESH_SECRET, 
            {expiresIn: +process.env.JWT_REFRESH_EXPIRES_IN}
        );

        return {accessToken, refreshToken};
    }

    validateAccessToken(token) {
        try {
            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

            return user;
        } catch {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            
            return user;
        } catch {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const user = await UserServices.readOne({id: userId})

        if(!user.refreshToken) {
            return await UserServices.update({id: userId}, {refreshToken})
        }

        return user.refreshToken
    }

    async removeToken(refreshToken) {
        const user = await UserServices.update({refreshToken}, {refreshToken: null})

        return user;
    }

    async findToken(refreshToken) {
        const user = await UserServices.readOne({refreshToken})

        return user.refreshToken
    }
}

export default new TokenService();