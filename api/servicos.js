const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const app = express();

app.get('*', async (req, res) => {
    try {
        const db = await open({
            filename: path.resolve(process.cwd(), 'barbearia.db'),
            driver: sqlite3.Database
        });
        const servicos = await db.all('SELECT * FROM servicos');
        res.status(200).json(servicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;