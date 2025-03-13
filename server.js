require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
DATABASE_URL = "postgresql://postgres:tcHSdYxVulApbMKpvdpUplxQBhghEeAK@postgres.railway.internal:5432/railway"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Supabase bağlantı URL'in
    ssl: { rejectUnauthorized: false },
});

console.log("Server running on port 8080")

// Kanji listesi çekme
app.get("/kanji", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Kanji");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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

// API'yı dinleme
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
