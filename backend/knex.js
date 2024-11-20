
const config = require("./knexfile");
const knex = require("knex");

const knexConfig =
    process.env.NODE_ENV === "production"
        ? config["production"]
        : config["development"];

console.log("knexConfig",knexConfig)
module.exports = knex(knexConfig);