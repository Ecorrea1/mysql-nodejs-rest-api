const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
// Settings
app.set('port', process.env.PORT || 3000 );

// Middlewares]
app.use(morgan('dev'));
app.use( express.json());
app.use( cors() );

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/registers', require('./routes/registers'));
app.use('/api/cristals', require('./routes/cristals'));
app.use('/api/treatment', require('./routes/treatment'));
app.use('/api/professionals', require('./routes/professionals'));
app.use('/api/configs', require('./routes/configs'));

// Starting the server
app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));