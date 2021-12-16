import { UpdateResult } from "typeorm";

export default interface ITokenService {
    generateTokens: (payload: {
        id: number
        email: string,
        phone: string,
        username: string,
        role: string
    }) => {
        accessToken: string,
        refreshToken: string
    };

    validateAccessToken: (token: string) => {email: string} | null;

    validateRefreshToken: (token: string) => {email: string} | null;

    saveToken: (userId: number, refreshToken: string) => Promise<string | UpdateResult>;

    removeToken: (refreshToken: string) => Promise<UpdateResult>;

    findToken: (refreshToken: string) => Promise<string>;
}