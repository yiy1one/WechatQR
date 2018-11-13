
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/wechat';

mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});

module.exports = mongoose