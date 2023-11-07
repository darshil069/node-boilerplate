const Joi = require('joi');

module.exports = {
    listOfUserValidation: Joi.object().keys({
    condition: Joi.object().empty().optional().messages({
      'object.base' : `Condition should be a type of object`,
      'object.empty': 'Condition is not allowed to be empty',
    }),
  }),
};
