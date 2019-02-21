import {celebrate, Joi} from 'celebrate';
import {LotModel} from '../../db';

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
    const aggregate = LotModel.aggregate();
    aggregate
      .lookup({from: 'clients', localField: 'client', foreignField: '_id', as: 'client'})
      .group({_id: '$client.email', lots: {$sum: 1}, fullname: {$addToSet: '$client.fullname'}});

    const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: 10,
    };

    const {data, pageCount, totalCount} = await LotModel.aggregatePaginate(aggregate, options);

    const results = data.map((item) => {
      return {
        email: item._id[0],
        fullname: item.fullname[0][0],
        lots: item.lots,
      };
    });

    return res
      .status(200)
      .send({results, pagination: {current: options.page, pageCount, totalCount}});
  }

  /**
   * @description Read validator.
   * @return {}
   */
  static readValidator() {
    return celebrate(
      {
        query: {
          page: Joi.number().optional(),
        },
      },
      {abortEarly: false},
    );
  }
}
