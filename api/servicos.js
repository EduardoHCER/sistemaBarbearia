const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

// A função agora é exportada diretamente, sem usar o Express.
module.exports = async (req, res) => {
    try {
        const db = await open({
            filename: path.join(__dirname, 'barbearia.db'),
            driver: sqlite3.Database
        });

        const servicos = await db.all('SELECT * FROM servicos');

        // Adiciona um header de CORS para garantir que o navegador possa acessar a API
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        res.status(200).json(servicos);

    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Adiciona mais detalhes ao erro para nos ajudar a depurar
        res.status(500).json({ 
            error: 'Erro no servidor ao buscar serviços.',
            details: error.message 
        });
    }
};