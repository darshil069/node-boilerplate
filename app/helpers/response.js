const { GeneralResponse } = require('../utils/response');
const { StatusCodes } = require('http-status-codes');

const handleResponse = (response, req, res, next) => {
  if (response instanceof GeneralResponse) {
    return res.status(StatusCodes.OK).json({
      statusCode: response.statusCode,
      status: response.status,
      message: response.message,
      data: response.data,
    });
  }
  next(response);
};

module.exports = handleResponse;
