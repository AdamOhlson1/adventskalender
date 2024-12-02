const express = require("express");
const app = express();
const cors = require("cors");
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
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

// Middleware
app.use(cors());
app.use(express.json());

// API-endpoint för att spara användarens svar
app.post("/api/save-answer", async (req, res) => {
  const { email, guess } = req.body; // Förväntar JSON med 'email' och 'guess'

  console.log("Request received with data:", { email, guess }); // Kontrollera vad som tas emot

  try {
    const result = await client.query(
      'INSERT INTO "Answers" (datum, email, guess) VALUES (CURRENT_DATE, $1, $2)',
      [email, guess] // Lägger in email och guess i databasen
    );
    console.log("Database insert result:", result); // Debug-info
    res.status(200).json({ message: "Answer saved successfully!" });
  } catch (error) {
    console.error("Error saving answer:", error); // Visa fel
    res.status(500).json({ message: "Error saving answer.", error: error.message });
  }
});

// Starta servern
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});


app.get("/", (req, res) => {
  res.send("Server is running!");
});

