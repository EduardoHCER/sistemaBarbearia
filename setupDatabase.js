const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

// Usamos uma função anônima auto-invocável com async
(async () => {
    try {
        // Abre a conexão com o banco de dados
        const db = await open({
            filename: './api/barbearia.db',
            driver: sqlite3.Database
        });

        console.log('Conectado ao banco de dados SQLite.');

        // Garante que as tabelas existam. O 'await' força o script a esperar a conclusão.
        await db.exec(`CREATE TABLE IF NOT EXISTS servicos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL,
            duracao_minutos INTEGER NOT NULL
        )`);

        await db.exec(`CREATE TABLE IF NOT EXISTS barbeiros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL
        )`);

        await db.exec(`CREATE TABLE IF NOT EXISTS agendamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            barbeiro_id INTEGER,
            servico_id INTEGER,
            data_hora DATETIME NOT NULL,
            nome_cliente TEXT NOT NULL,
            FOREIGN KEY(barbeiro_id) REFERENCES barbeiros(id),
            FOREIGN KEY(servico_id) REFERENCES servicos(id)
        )`);
        
        console.log('Tabelas verificadas/criadas com sucesso.');

        // Verifica se o banco já tem dados
        const { count } = await db.get("SELECT count(*) as count FROM servicos");

        if (count === 0) {
            console.log('Banco de dados vazio, inserindo dados de exemplo...');

            const servicos = [
                { nome: 'Corte de Cabelo', preco: 40.00, duracao: 30 },
                { nome: 'Barba', preco: 25.00, duracao: 20 },
                { nome: 'Corte + Barba', preco: 60.00, duracao: 50 }
            ];
            const barbeiros = [ { nome: 'Roberto' }, { nome: 'Fernando' }, { nome: 'Carlos' } ];

            // Insere os dados de forma segura, aguardando a conclusão
            await Promise.all([
                ...servicos.map(s => db.run('INSERT INTO servicos (nome, preco, duracao_minutos) VALUES (?, ?, ?)', s.nome, s.preco, s.duracao)),
                ...barbeiros.map(b => db.run('INSERT INTO barbeiros (nome) VALUES (?)', b.nome))
            ]);
            
            console.log('Dados de exemplo inseridos com sucesso!');
        } else {
            console.log('Banco de dados já populado.');
        }

        // Fecha a conexão com segurança após tudo ter sido concluído
        await db.close();
        console.log('Conexão com o banco de dados fechada.');

    } catch (error) {
        console.error('Ocorreu um erro no script do banco de dados:', error.message);
    }
})();