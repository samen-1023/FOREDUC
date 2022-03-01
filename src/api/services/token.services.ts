import { ExegesisPluginContext } from "exegesis";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { sign, verify } from "jsonwebtoken";
import { getMongoRepository } from "typeorm";
import { Payload } from "../../entity/common/types";
import { User } from "../../entity/User";
import UserService from "./user.services";

export default class TokenService {
  private _service: UserService

  constructor() {
    this._service = new UserService(
      User
    );
  }

  checkToken(ctx: ExegesisPluginContext) {
    const token = ctx.req.headers.authorization || null;

    if (!token) {
      return {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: ReasonPhrases.UNAUTHORIZED,
      }
    }

    //TODO верификация токена
    
    // return {
    //   type: 'success',
    //   user,
    //   roles: user.roles,
    // };
  }

  // generateToken(payload: Payload) {
  //   const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, {
  //     expiresIn: +process.env.JWT_ACCESS_EXPIRES_IN,
  //   });

  //   return accessToken;
  // }

  // validateAccessToken(token: string) {
  //   try {
  //     return verify(token, process.env.JWT_ACCESS_SECRET);
  //   } catch {
  //     return null;
  //   }
  // }

  // async saveToken(accessToken: string) {
  //   const user = await this._service.readOne({ id: userId });

  //   // if (!user) {
  //   //   throw new createError.BAD_REQUEST();
  //   // }

  //   const newUser = await this._service.update({ id: userId }, { refreshToken });

  //   return newUser;
  // }

  // async removeToken(refreshToken: string) {
  //   const user = await this._service.update(
  //     { refreshToken },
  //     { refreshToken: null }
  //   );

  //   return user;
  // }

  // async findToken(refreshToken: string) {
  //   const user = await this._service.readOne({ refreshToken });

  //   return user.refreshToken;
  // }
}
