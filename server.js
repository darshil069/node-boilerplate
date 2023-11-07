const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('./app/loggers/logger');
require('dotenv').config();
require('path')
require('./app/helpers/db');

const cors = require('cors');
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: '1000mb',
  })
);

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', require('./app/routes/route'));
app.use(require('./app/helpers/response'));
app.use(require('./app/helpers/error').handleJoiErrors);
app.use(require('./app/helpers/error').handleErrors);

const port = process.env.PORT || 4000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
