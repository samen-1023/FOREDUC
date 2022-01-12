import { UpdateResult } from "typeorm";

export type Payload = {
    id: number
    email: string,
    phone: string,
    username: string,
    role: string
}

export type TokenPair = {
    accessToken: string,
    refreshToken: string
}

export default interface ITokenService {
    generateTokens: (payload) => TokenPair;

    validateAccessToken: (token: string) => any;

    validateRefreshToken: (token: string) => any;

    saveToken: (userId: number, refreshToken: string) => Promise<string | UpdateResult>;

    removeToken: (refreshToken: string) => Promise<UpdateResult>;

    findToken: (refreshToken: string) => Promise<string>;
}