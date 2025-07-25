const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const app = express();

app.get('*', async (req, res) => {
    try {
        // NOVA LINHA (CORRIGIDA)
        const db = await open({
            filename: path.join(__dirname, 'barbearia.db'), // <-- NOVA LINHA
            driver: sqlite3.Database
        });
        const barbeiros = await db.all('SELECT * FROM barbeiros');
        res.status(200).json(barbeiros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;