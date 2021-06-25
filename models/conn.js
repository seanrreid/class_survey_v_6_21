require('dotenv').config();

const host = process.env.DB_HOST;
const database = process.env.DB_NAME;

const pgp = require('pg-promise')({
    query: function (event) {
        console.log("QUERY:", event.query);
    }
});

const options = {
    host,
    database
}

const db = pgp(options);

module.exports = db;