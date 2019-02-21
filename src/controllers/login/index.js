import {celebrate, Joi} from 'celebrate';
import jwt from 'jsonwebtoken';
import {UserModel} from '../../db';
import {encrypt} from '../../common/crypto';

/**
 * @description Login controller.
 */
export default class Login {
  /**
   * @description POST.
   * @param req
   * @param res
   * @param next
   * @return {Promise<*>}
   */
  static async create(req, res, next) {
    const {login, password} = req.body;

    const user = await UserModel.findOne({login, password: encrypt(password)});

    // TODO: Return an error for wrong password AND login not found instead of global error.
    if(user === null) {
      return res.status(400).send();
    }

    const token = jwt.sign({sub: user._id}, process.env.API_JWT_SECRET, {
      algorithm: process.env.API_JWT_ALGORITHM,
      expiresIn: process.env.API_JWT_EXPIRATION,
      audience: "foncia.com",
      issuer: "api.foncia.com"
    });

    // TODO: Store token + provide token cleanup feature
    return res.status(200).send({
      token,
    });
  }

  /**
   * @description POST validator.
   * @return {}
   */
  static createValidator() {
    return celebrate(
      {
        body: {
          login: Joi.string().required(),
          password: Joi.string().min(6).required(),
        },
      },
      {abortEarly: false},
    );
  }
}
