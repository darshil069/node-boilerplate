const message = require('../utils/message');
const logger = require('../loggers/logger');
const { GeneralError } = require('../utils/error');
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enums');
const { listOfUserServices } = require('../services/userServices');

module.exports = {
  listOfUserController: async (req, res, next) => {
    try {
      return await listOfUserServices(req, next);
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
