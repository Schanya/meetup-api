import dotenv from 'dotenv';
dotenv.config();

module.exports = {
    "production": {
        "username": process.env.POSTGRES_DB_USERNAME,
        "password": process.env.POSTGRES_DB_PASSWORD,
        "database": process.env.POSTGRES_DB_NAME,
        "host": process.env.POSTGRES_DB_HOST,
        "dialect": "postgres",
    }
}