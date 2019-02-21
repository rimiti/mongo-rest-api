import {celebrate, Joi} from 'celebrate';
import {UserModel} from '../../db';
import encrypt from '../../common/crypto';
import Acl, {roles} from '../../acl';

/**
 * @description Users controller.
 */
export default class Users {
  /**
   * @description POST.
   * @param req
   * @param res
   * @param next
   * @return {Promise<*>}
   */
  static async create(req, res, next) {
    const {login, password} = req.body;

    const exists = await UserModel.findOne({login, password: encrypt(password)});
    if (exists !== null) {
      return res.status(400).send();
    }

    const User = new UserModel({login, password: encrypt(password)});
    const user = await User.save();
    await Acl.addUserRoles(user._id, roles.gestionnaire);

    // TODO: Send email confirmation with token to verify account
    return res.status(204).send();
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
          password: Joi.string()
            .min(6)
            .required(),
        },
      },
      {abortEarly: false},
    );
  }
}
