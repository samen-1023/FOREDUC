import { body } from "koa-req-validation";

class AuthValidator {
  email(key = "email") {
    return body(key)
      .isEmail()
      .isLength({ min: 5, max: 255 })
      .withMessage(
        "Email не соответствует паттерну или установленной длине (от 5 до 255)"
      )
      .build();
  }

  phone(key = "phone") {
    return body(key)
      .isMobilePhone()
      .withMessage("Phone не соответствует требованиям")
      .build();
  }

  username(key = "username") {
    return body(key)
      .isLength({ min: 3, max: 40 })
      .withMessage("Username не соответствует требованиям длины (от 3 до 40)")
      .build();
  }

  password(key = "password") {
    return body(key)
      .isLength({ min: 6, max: 40 })
      .withMessage("Password не соответствует требованиям длины (от 6 до 40)")
      .build();
  }
}

export default new AuthValidator();
