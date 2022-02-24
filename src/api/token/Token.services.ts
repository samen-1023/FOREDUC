import { sign, verify } from "jsonwebtoken";
import { Payload } from "../../entity/common/types";
import UserService from "../user/User.services";

export default class TokenService {
  constructor(
    private _service: UserService
  ) {
    this._service = new UserService();
  }

  generateToken(payload: Payload) {
    const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: +process.env.JWT_ACCESS_EXPIRES_IN,
    });

    return accessToken;
  }

  validateAccessToken(token: string) {
    try {
      return verify(token, process.env.JWT_ACCESS_SECRET);
    } catch {
      return null;
    }
  }

  async saveToken(accessToken: string) {
    const user = await this._service.readOne({ id: userId });

    // if (!user) {
    //   throw new createError.BAD_REQUEST();
    // }

    const newUser = await this._service.update({ id: userId }, { refreshToken });

    return newUser;
  }

  async removeToken(refreshToken: string) {
    const user = await this._service.update(
      { refreshToken },
      { refreshToken: null }
    );

    return user;
  }

  async findToken(refreshToken: string) {
    const user = await this._service.readOne({ refreshToken });

    return user.refreshToken;
  }
}
