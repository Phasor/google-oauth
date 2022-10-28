const mongoose = require('mongoose');
require('dotenv').config();

const devConnection = process.env.DB_STRING;
//console.log(devConnection);

mongoose.connect(devConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Development database connected');
});


