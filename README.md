# Sistema de Agendamento para Barbearia

![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/license-MIT-blue.svg)

<br>

![Demonstração do Projeto](./caminho/para/sua/demo.gif)

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-como-executar">Como Executar</a> •
  <a href="#-endpoints-da-api">API</a> •
  <a href="#-licença">Licença</a>
</p>

---

## 📖 Sobre o Projeto

O **Sistema de Agendamento para Barbearia** é uma aplicação web desenvolvida para automatizar e otimizar o processo de marcação de horários em uma barbearia. A plataforma oferece uma interface intuitiva para que os clientes possam escolher serviços, selecionar seu barbeiro de preferência e visualizar a agenda para marcar um horário de forma rápida e eficiente.

Este projeto foi construído com uma arquitetura moderna, utilizando um frontend estático e um backend serverless, hospedado na Vercel para garantir performance e escalabilidade.

---

## ✨ Funcionalidades

-   **Seleção de Serviços:** Cliente pode visualizar a lista de serviços oferecidos pela barbearia com seus respectivos preços.
-   **Escolha de Barbeiros:** Permite que o cliente selecione o profissional de sua preferência.
-   **Agenda Dinâmica:** Apresenta um calendário e os horários disponíveis em tempo real para o barbeiro selecionado.
-   **Confirmação de Agendamento:** Um fluxo simples para o cliente inserir seu nome e confirmar o horário escolhido.

---

## 🛠️ Tecnologias

As seguintes ferramentas e tecnologias foram utilizadas na construção do projeto:

#### **Frontend**

-   **HTML5**
-   **CSS3**
-   **JavaScript (Vanilla)**

#### **Backend (Serverless)**

-   **Node.js**
-   **Express.js**
-   **Vercel** como plataforma de deploy

#### **Banco de Dados**

-   **SQLite**

---

## 🚀 Como Executar

Para executar este projeto localmente, siga os passos abaixo. Você precisará ter o [Node.js](https://nodejs.org/en/) e o [Git](https://git-scm.com/) instalados em sua máquina.

```bash
# 1. Clone o repositório
$ git clone [https://github.com/EduardoHCER/sistemaBarbearia.git](https://github.com/EduardoHCER/sistemaBarbearia.git)

# 2. Navegue até o diretório do projeto
$ cd sistemaBarbearia

# 3. Instale as dependências
$ npm install

# 4. (Apenas na primeira vez) Configure o banco de dados
# Este comando cria o arquivo do banco e insere os dados de exemplo.
$ node setupDatabase.js

# 5. Execute o projeto em ambiente de desenvolvimento local
# Será necessário instalar a Vercel CLI, caso ainda não a tenha: npm install -g vercel
$ vercel dev
Após executar vercel dev, a aplicação estará rodando localmente, geralmente no endereço http://localhost:3000.

🔗 Endpoints da API
A API do sistema segue uma arquitetura REST e possui os seguintes endpoints:

Método	Endpoint	Descrição
GET	/api/servicos	Retorna a lista de todos os serviços disponíveis.
GET	/api/barbeiros	Retorna a lista de todos os barbeiros.
GET	/api/agenda	Retorna os horários livres para um barbeiro em uma data.
POST	/api/agendar	Cria um novo agendamento no banco de dados.

Exportar para as Planilhas
📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.




Feito com ❤️ por Eduardo Henrique







