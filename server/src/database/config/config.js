require('dotenv').config();
module.exports = {
    development: {
        username: 'root',
        password: process.env.DB_PWD || '9193999',
        database: 'Devnology',
        host: 'localhost',
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: true
    },
};