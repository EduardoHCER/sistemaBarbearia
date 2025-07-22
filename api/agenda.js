const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const app = express();

// Lógica para gerar horários disponíveis
const getHorariosDisponiveis = (agendamentosDoDia) => {
    const horariosTrabalho = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const horariosOcupados = agendamentosDoDia.map(a => {
        const data = new Date(a.data_hora);
        return `${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}`;
    });

    return horariosTrabalho.filter(h => !horariosOcupados.includes(h));
};

app.get('*', async (req, res) => {
    const { barbeiroId, data } = req.query; // Ex: ?barbeiroId=1&data=2025-07-25

    if (!barbeiroId || !data) {
        return res.status(400).json({ error: 'barbeiroId e data são obrigatórios' });
    }

    try {
        const db = await open({
            filename: path.resolve(process.cwd(), 'barbearia.db'),
            driver: sqlite3.Database
        });

        // Busca agendamentos para o barbeiro e data específicos
        const agendamentos = await db.all(
            `SELECT data_hora FROM agendamentos WHERE barbeiro_id = ? AND date(data_hora) = ?`,
            [barbeiroId, data]
        );

        const horariosDisponiveis = getHorariosDisponiveis(agendamentos);
        res.status(200).json(horariosDisponiveis);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;