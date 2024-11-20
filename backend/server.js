const express = require("express");
const db = require("./knex");
const cors = require("cors");
const axios = require("axios");

function setupServer() {
    const app = express();
    app.use(express.json());
    // app.use("/", express.static("./public"));

    return app;
}

module.exports = { setupServer };