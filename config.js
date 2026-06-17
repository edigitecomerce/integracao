var cors = require('cors');
const bodyParser = require('body-parser');
var express = require('express');
const logger = require('morgan');
const app = express();
multiparty = require('connect-multiparty');

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

const corsOptions = {
     origin: '*',
     method: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
     exposedHeaders: [
          'Autorization',
          'X-Requested-With',
          'Content-Type',
          'Cache-Control:no-cache'
     ],
     preflightContinue: false,

};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());


module.exports = {app};