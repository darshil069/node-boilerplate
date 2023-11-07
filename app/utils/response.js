const { StatusCodes } = require('http-status-codes');
const logger = require('../loggers/logger');

class GeneralResponse {
  constructor(status, statusCode = '', message, data) {
    logger.info(`${message}`);
    this.status = status;
    this.statusCode = statusCode == '' ? StatusCodes.OK : statusCode;
    this.message = message;
    this.data = data;
  }
}

module.exports = {
  GeneralResponse,
};
