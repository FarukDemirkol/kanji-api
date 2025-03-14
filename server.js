require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});


// Kanji listesi çekme
app.get("/kanji", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Kanji");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/", (req, res) => {
    res.send("Kanji API'ya hoş geldiniz!");
});

// Belirli bir kanji çekme
app.get("/kanji/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Kanji WHERE id = $1", [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/lessons", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Lessons"); // Lessons tablosundaki tüm verileri çek
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API'yı dinleme
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
