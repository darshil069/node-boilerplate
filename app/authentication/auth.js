const jwt = require('jsonwebtoken');
const message = require('../utils/message');
const logger = require('../loggers/logger');
const { StatusCodes } = require('http-status-codes');
const { GeneralError } = require('../utils/error');
const { GeneralResponse } = require('../utils/response');
const { RESPONSE_STATUS } = require('../utils/enums');

module.exports = {
  authenticate: (roles = []) => {
    return (req, res, next) => {
      try {
        const token = req.headers.authorization;
        if (token == undefined) {
          return next(
            new GeneralResponse(
              message.AUTH_MISSING,
              undefined,
              StatusCodes.UNAUTHORIZED,
              RESPONSE_STATUS.error,
            ),
          );
        }

        jwt.verify(token, process.env.PRIVATEKEY, (err, decode) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              return next(
                new GeneralResponse(
                  message.TOKEN_EXPIRED,
                  undefined,
                  StatusCodes.FORBIDDEN,
                  RESPONSE_STATUS.error,
                ),
              );
            } else {
              return next(
                new GeneralResponse(
                  message.VALID_TOKEN_REQUIRED,
                  undefined,
                  StatusCodes.UNAUTHORIZED,
                  RESPONSE_STATUS.error,
                ),
              );
            }
          }
          // Check if decode is defined before accessing its properties
          if (
            decode &&
            roles.length > 0 &&
            roles.some((role) => role === decode.role)
          ) {
            req.user = decode;
            return next();
          } else {
            return next(
              new GeneralResponse(
                message.VALID_TOKEN_REQUIRED,
                undefined,
                StatusCodes.UNAUTHORIZED,
                RESPONSE_STATUS.error,
              ),
            );
          }
        });
      } catch (err) {
        logger.error(err);
        return next(
          new GeneralError(
            `${message.REQUEST_FAILURE} authenticate`,
            undefined,
            StatusCodes.INTERNAL_SERVER_ERROR,
            RESPONSE_STATUS.error,
          ),
        );
      }
    };
  },
  generateToken: async (req, res, next) => {
    try {
      return jwt.sign(
        { id: req.id, email: req.email, role: req.role },
        process.env.PRIVATEKEY,
        { expiresIn: '24h' },
      );
    } catch (err) {
      logger.error(err);
      next(
        new GeneralError(
          `${message.REQUEST_FAILURE} authenticate`,
          undefined,
          StatusCodes.INTERNAL_SERVER_ERROR,
          RESPONSE_STATUS.error,
        ),
      );
    }
  },
};
