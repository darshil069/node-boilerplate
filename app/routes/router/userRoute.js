const express = require('express');
const router = express.Router();
const message = require('../../utils/message');
const { validator } = require('../../helpers/validator');
const { listOfUserController } = require('../../controllers/userController');
// const { authenticate } = require('../../authentication/auth');
const { listOfUserValidation } = require('../../validations/userValidation');
const { RESPONSE_STATUS, ROLE_STATUS } = require('../../utils/enums');
const { StatusCodes } = require('http-status-codes');
const { GeneralResponse } = require('../../utils/response');

// This commented line is a use of authentication.
router
  .post(
    '/listOfUser',
    /**authenticate([ROLE_STATUS.ADMIN])**/
    validator.body(listOfUserValidation),
    listOfUserController,
  )
  .all('/listOfUser', (req, res, next) => {
    next(
      new GeneralResponse(
        `${req.method} ${message.METHOD_NOT_ALLOWED}`,
        undefined,
        StatusCodes.METHOD_NOT_ALLOWED,
        RESPONSE_STATUS.error,
      ),
    );
  });

module.exports = router;
