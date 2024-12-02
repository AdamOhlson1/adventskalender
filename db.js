// db.js
const { Client } = require("pg");
require('dotenv').config();

// Anslut till PostgreSQL-databasen
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL");

    // Testa genom att köra en enkel query
    return client.query("SELECT NOW()");
  })
  .then((res) => {
    console.log("Current time from DB:", res.rows[0]);
  })
  .catch((err) => console.error("Connection error", err.stack));

module.exports = client;
