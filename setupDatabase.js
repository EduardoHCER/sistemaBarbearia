const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./barbearia.db');

db.serialize(() => {
    // Criar tabela de Serviços
    db.run(`CREATE TABLE IF NOT EXISTS servicos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        duracao_minutos INTEGER NOT NULL
    )`);

    // Criar tabela de Barbeiros
    db.run(`CREATE TABLE IF NOT EXISTS barbeiros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL
    )`);

    // Criar tabela de Agendamentos
    db.run(`CREATE TABLE IF NOT EXISTS agendamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        barbeiro_id INTEGER,
        servico_id INTEGER,
        data_hora DATETIME NOT NULL,
        nome_cliente TEXT NOT NULL,
        FOREIGN KEY(barbeiro_id) REFERENCES barbeiros(id),
        FOREIGN KEY(servico_id) REFERENCES servicos(id)
    )`);

    // Inserir dados de exemplo (apenas se as tabelas estiverem vazias)
    const popularDados = () => {
        const servicos = [
            { nome: 'Corte de Cabelo', preco: 40.00, duracao: 30 },
            { nome: 'Barba', preco: 25.00, duracao: 20 },
            { nome: 'Corte + Barba', preco: 60.00, duracao: 50 }
        ];
        const barbeiros = [
            { nome: 'Roberto' },
            { nome: 'Fernando' },
            { nome: 'Carlos' }
        ];

        const stmtServico = db.prepare("INSERT INTO servicos (nome, preco, duracao_minutos) VALUES (?, ?, ?)");
        servicos.forEach(s => stmtServico.run(s.nome, s.preco, s.duracao));
        stmtServico.finalize();

        const stmtBarbeiro = db.prepare("INSERT INTO barbeiros (nome) VALUES (?)");
        barbeiros.forEach(b => stmtBarbeiro.run(b.nome));
        stmtBarbeiro.finalize();

        console.log('Dados de exemplo inseridos com sucesso!');
    };

    db.get("SELECT count(*) as count FROM servicos", (err, row) => {
        if (row.count === 0) {
            popularDados();
        } else {
            console.log('Banco de dados já populado.');
        }
    });
});

db.close();