document.addEventListener('DOMContentLoaded', () => {
    const estado = {
        servico: null,
        barbeiro: null,
        data: null,
        hora: null,
        nomeCliente: ''
    };

    const passo1 = document.getElementById('passo1');
    const passo2 = document.getElementById('passo2');
    const passo3 = document.getElementById('passo3');
    const passo4 = document.getElementById('passo4');
    const confirmacaoFinal = document.getElementById('confirmacao-final');

    const listaServicos = document.getElementById('lista-servicos');
    const listaBarbeiros = document.getElementById('lista-barbeiros');
    const inputData = document.getElementById('data-agendamento');
    const listaHorarios = document.getElementById('lista-horarios');
    const resumoAgendamento = document.getElementById('resumo-agendamento');
    const inputNomeCliente = document.getElementById('nome-cliente');
    const btnConfirmar = document.getElementById('btn-confirmar');
    
    // --- Funções de Carregamento ---

    async function carregarServicos() {
        try {
            const response = await fetch('/api/servicos');
            const servicos = await response.json();
            listaServicos.innerHTML = '';
            servicos.forEach(servico => {
                const div = document.createElement('div');
                div.className = 'opcao';
                div.textContent = `${servico.nome} - R$ ${servico.preco.toFixed(2)}`;
                div.dataset.id = servico.id;
                div.dataset.nome = servico.nome;
                div.addEventListener('click', () => selecionarServico(servico, div));
                listaServicos.appendChild(div);
            });
        } catch (error) {
            console.error('Erro ao carregar serviços:', error);
            listaServicos.innerHTML = '<p>Erro ao carregar serviços. Tente novamente mais tarde.</p>';
        }
    }
    
    async function carregarBarbeiros() {
        try {
            const response = await fetch('/api/barbeiros');
            const barbeiros = await response.json();
            listaBarbeiros.innerHTML = '';
            barbeiros.forEach(barbeiro => {
                const div = document.createElement('div');
                div.className = 'opcao';
                div.textContent = barbeiro.nome;
                div.dataset.id = barbeiro.id;
                div.dataset.nome = barbeiro.nome;
                div.addEventListener('click', () => selecionarBarbeiro(barbeiro, div));
                listaBarbeiros.appendChild(div);
            });
        } catch (error) {
            console.error('Erro ao carregar barbeiros:', error);
            listaBarbeiros.innerHTML = '<p>Erro ao carregar barbeiros. Tente novamente mais tarde.</p>';
        }
    }

    async function carregarHorarios() {
        if (!estado.barbeiro || !estado.data) return;
        
        listaHorarios.innerHTML = '<p>Carregando horários...</p>';
        
        try {
            const response = await fetch(`/api/agenda?barbeiroId=${estado.barbeiro.id}&data=${estado.data}`);
            const horarios = await response.json();
            
            listaHorarios.innerHTML = '';
            if (horarios.length === 0) {
                listaHorarios.innerHTML = '<p>Nenhum horário disponível para esta data.</p>';
                return;
            }
            horarios.forEach(hora => {
                const div = document.createElement('div');
                div.className = 'opcao';
                div.textContent = hora;
                div.addEventListener('click', () => selecionarHorario(hora, div));
                listaHorarios.appendChild(div);
            });
        } catch (error) {
            console.error('Erro ao carregar horários:', error);
            listaHorarios.innerHTML = '<p>Erro ao buscar horários.</p>';
        }
    }

    // --- Funções de Seleção ---

    function selecionarServico(servico, elemento) {
        if (estado.servico) {
            document.querySelector(`#lista-servicos .opcao[data-id='${estado.servico.id}']`).classList.remove('selecionado');
        }
        estado.servico = servico;
        elemento.classList.add('selecionado');
        passo2.classList.remove('hidden');
        carregarBarbeiros();
    }

    function selecionarBarbeiro(barbeiro, elemento) {
        if (estado.barbeiro) {
            document.querySelector(`#lista-barbeiros .opcao[data-id='${estado.barbeiro.id}']`).classList.remove('selecionado');
        }
        estado.barbeiro = barbeiro;
        elemento.classList.add('selecionado');
        passo3.classList.remove('hidden');
        // Define a data mínima como hoje
        inputData.min = new Date().toISOString().split('T')[0];
    }
    
    function selecionarHorario(hora, elemento) {
        if(estado.hora) {
            const selecionadoAnterior = Array.from(listaHorarios.children).find(el => el.textContent === estado.hora);
            if(selecionadoAnterior) selecionadoAnterior.classList.remove('selecionado');
        }
        estado.hora = hora;
        elemento.classList.add('selecionado');
        passo4.classList.remove('hidden');
        mostrarResumo();
    }
    
    function mostrarResumo() {
        resumoAgendamento.innerHTML = `
            <p><strong>Serviço:</strong> ${estado.servico.nome}</p>
            <p><strong>Barbeiro:</strong> ${estado.barbeiro.nome}</p>
            <p><strong>Data:</strong> ${new Date(estado.data + 'T00:00:00').toLocaleDateString()}</p>
            <p><strong>Hora:</strong> ${estado.hora}</p>
        `;
    }
    
    async function confirmarAgendamento() {
        estado.nomeCliente = inputNomeCliente.value.trim();
        if (!estado.nomeCliente) {
            alert('Por favor, digite seu nome.');
            return;
        }

        const dataHoraISO = `${estado.data}T${estado.hora}:00`;

        try {
            const response = await fetch('/api/agendar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    servicoId: estado.servico.id,
                    barbeiroId: estado.barbeiro.id,
                    dataHora: dataHoraISO,
                    nomeCliente: estado.nomeCliente
                })
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.error || 'Erro desconhecido');
            }

            const resultado = await response.json();
            console.log(resultado.message);
            
            passo1.classList.add('hidden');
            passo2.classList.add('hidden');
            passo3.classList.add('hidden');
            passo4.classList.add('hidden');
            confirmacaoFinal.classList.remove('hidden');

        } catch (error) {
            alert(`Erro ao confirmar agendamento: ${error.message}`);
        }
    }
    
    // --- Event Listeners ---
    inputData.addEventListener('change', () => {
        estado.data = inputData.value;
        carregarHorarios();
    });
    
    btnConfirmar.addEventListener('click', confirmarAgendamento);

    // Iniciar
    carregarServicos();
});