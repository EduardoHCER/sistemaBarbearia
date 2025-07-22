const express = require('express');
 const path = require('path');
 const { open } = require('sqlite');
 const sqlite3 = require('sqlite3');
 const app = express();
 app.use(express.json()); // Habilitar o parse de JSON no corpo da requisição

 app.post('*', async (req, res) => {
     const { barbeiroId, servicoId, dataHora, nomeCliente } = req.body;

     if (!barbeiroId || !servicoId || !dataHora || !nomeCliente) {
         return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
     }

     try {
         const db = await open({
             filename: path.resolve(process.cwd(), 'barbearia.db'),
             driver: sqlite3.Database
         });

         const result = await db.run(
             'INSERT INTO agendamentos (barbeiro_id, servico_id, data_hora, nome_cliente) VALUES (?, ?, ?, ?)',
             [barbeiroId, servicoId, dataHora, nomeCliente]
         );

         res.status(201).json({ message: 'Agendamento criado com sucesso!', agendamentoId: result.lastID });
     } catch (error) {
         res.status(500).json({ error: 'Erro ao criar agendamento. O horário pode já estar ocupado.' });
     }
 });

 module.exports = app;
