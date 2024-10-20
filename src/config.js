
const { config } = require('dotenv')

config()

module.exports = {
    PORT: process.env.DB_PORT || '3000',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '1234',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_DATABASE: process.env.DB_NAME || 'menu_system',
    DB_PORT: process.env.DB_PORT || 3306,
    MYSQL_URL: process.env.MYSQL_URL || 'mysql://root:1234@localhost:3306/menu_system',
    SECRET_KEY: process.env.SECRET_KEY || 'your_secret_key',
    NODE_ENV: process.env.NODE_ENV || 'production'
}

/* process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'test',
    port: process.env.DB_PORT || 3306 */