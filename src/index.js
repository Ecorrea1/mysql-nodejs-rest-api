'use strict';
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routerApi = require('./routes');
dotenv.config();
// Settings
app.set('port', process.env.PORT || 3000 );

// Middlewares]
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use( express.json());
app.use(bodyParser.json())

routerApi(app);

// Starting the server
app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));