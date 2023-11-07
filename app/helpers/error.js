const { GeneralError } = require('../utils/error');
const { StatusCodes } = require('http-status-codes');
const logger = require('../loggers/logger');
let statusToSet = 400;

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res
      .status(err.statusCode !== '' ? err.statusCode : err.getCode())
      .json({
        statusCode: err.statusCode !== '' ? err.statusCode : err.getCode(),
        status: err.status,
        message: err.message,
        result: err.result !== '' ? err.result : undefined,
      });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode:
    err.statusCode !== ''
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR,
    status: err.status,
    message: err.message,
  });
};
const handleJoiErrors = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    logger.error(err.error);
    const customErrorResponse = {};
    if (err.error.details.length !== 0) {
      err.error.details.forEach((item) => {
        customErrorResponse[`${item.context.key}`] = {
          message: item.message,
          context: item.context.label,
          type: item.type,
        };
      });
    }
    res.status(statusToSet).json({
      statusCode: StatusCodes.BAD_REQUEST,
      status: 'error',
      message: 'Validation Error',
      data: customErrorResponse,
    });
    res.status(StatusCodes.BAD_REQUEST).send(customErrorResponse);
  } else {
    next(err);
  }
};

module.exports = { handleErrors, handleJoiErrors };
