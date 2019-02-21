import {LotModel} from '../../db';
import _ from 'lodash';

/**
 * @description Lists controller.
 */
export default class Lists {
  /**
   * @description GET.
   * @param req
   * @param res
   * @param next
   * @return {Promise<*>}
   */
  static async read(req, res, next) {
    // TODO: Aggregate possible
    const LotsClients = await LotModel.find({}, 'surface').populate('client', 'fullname email');

    const arr = LotsClients.map((item) => {
      return {
        email: item.client.email,
        fullname: item.client.fullname,
        surface: item.surface,
      }
    });

    const result = _.chain(arr).groupBy('email').map((item, index) => {
      return {
        email: index,
        fullname: _.get(_.find(item, 'fullname'), 'fullname'),
        lots: _.map(item, 'surface').length,
      }
    }).value();

    return res.status(200).send({result});
  }
}
