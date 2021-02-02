const dotenv = require('dotenv')
dotenv.config();

module.exports = {

    'database': 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME,


}