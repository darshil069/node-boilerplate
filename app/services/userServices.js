const db = require('../helpers/db');
const userModel = db.userModel;
const logger = require('../loggers/logger');
const message = require('../utils/message');
const { GeneralResponse } = require('../utils/response');
const { GeneralError } = require('../utils/error');
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enums');
const { findAll } = require('./serviceLayer');

module.exports = {
  listOfUserServices: async (req, next) => {
    try {
      const { condition } = req.body;
      const listOfUser = await findAll(
        userModel,
        { exclude: ['password', 'is_deleted'] },
        { ...condition, is_deleted: false },
        [['createdAt', 'DESC']],
      ).catch((err) => {
        logger.error(err);
        next(
          new GeneralError(
            message.SOMETHING_WENT_WRONG,
            undefined,
            StatusCodes.INTERNAL_SERVER_ERROR,
            RESPONSE_STATUS.error,
          ),
        );
      });

      if (listOfUser && listOfUser.length > 0) {
        next(
          new GeneralResponse(
            undefined,
            listOfUser,
            StatusCodes.OK,
            RESPONSE_STATUS.success,
          ),
        );
      } else {
        next(
          new GeneralResponse(
            message.DATA_NOT_FOUND,
            undefined,
            StatusCodes.NOT_FOUND,
            RESPONSE_STATUS.error,
          ),
        );
      }
    } catch (err) {
      logger.error('error', err);
      next(
        new GeneralError(
          `${message.REQUEST_FAILURE} list of user`,
          undefined,
          StatusCodes.INTERNAL_SERVER_ERROR,
          RESPONSE_STATUS.error,
        ),
      );
    }
  },
};
