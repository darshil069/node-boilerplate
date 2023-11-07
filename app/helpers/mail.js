const nodemailer = require('nodemailer');
const logger = require('../loggers/logger');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: false, 
  port: 25, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const otpSend = (Email, otp) => {
  let mailDetail = {
    to: Email,
    subject: 'OTP for new Password',
    html:
      '<h3>Please click on given link to reset youth password </h3>' +
      `<h1 style='font-weight:bold;'>` +
      otp +
      '</h1>',
  };
  transporter.sendMail(mailDetail, function (error, info) {
    if (error) {
      logger.error(error);
    } else {
      logger.info('Email sent: ' + info.response);
    }
  });
};
module.exports = { otpSend };
