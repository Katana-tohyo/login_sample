require("dotenv").config();//migrate,seed用

module.exports = {
    development: {
        client: "postgresql",
        connection: {
            user: process.env.USER_NAME,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: "./db/migrations",
        },
        seeds: { directory:"./db/seeds" },
    },
    production: {
        client: "postgresql",
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: "./db/migrations",
        },
        seeds: { directory: "./db/seeds" },
    },
};
