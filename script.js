// --- 1. LÓGICA DE LOGIN ---
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulação: se o login for feito, redireciona para a página de agendar
        alert("Login efetuado com sucesso!");
        window.location.href = "agendar.html";
    });
}

// --- 2. LÓGICA DO CRUD (Agendamentos) ---
const formAgendamento = document.getElementById('formAgendamento');
const corpoTabela = document.getElementById('corpoTabela');

// Sempre que a página carregar, mostra a lista atualizada
document.addEventListener('DOMContentLoaded', listarAgendamentos);

if (formAgendamento) {
    formAgendamento.addEventListener('submit', function(e) {
        e.preventDefault();

        const cliente = document.getElementById('cliente').value;
        const servico = document.getElementById('servico').value;
        const dataHora = document.getElementById('dataHora').value;
        const index = document.getElementById('indexEdicao').value;

        const novoDado = { cliente, servico, dataHora };

        // Pega os dados que já existem no navegador ou cria uma lista vazia
        let lista = JSON.parse(localStorage.getItem('agendamentos')) || [];

        if (index === "") {
            // Ação: CREATE (Adicionar)
            lista.push(novoDado);
        } else {
            // Ação: UPDATE (Editar)
            lista[index] = novoDado;
            document.getElementById('indexEdicao').value = ""; // Limpa o ID de edição
        }

        // Guarda a lista de volta no navegador (localStorage)
        localStorage.setItem('agendamentos', JSON.stringify(lista));
        
        formAgendamento.reset();
        document.getElementById('btnSalvar').innerText = "Confirmar Horário";
        listarAgendamentos();
    });
}

// Ação: READ (Ler/Mostrar)
function listarAgendamentos() {
    if (!corpoTabela) return;
    
    let lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
    corpoTabela.innerHTML = ""; // Limpa para não repetir

    lista.forEach((item, index) => {
        corpoTabela.innerHTML += `
            <tr>
                <td>${item.cliente}</td>
                <td>${item.servico}</td>
                <td>${item.dataHora}</td>
                <td>
                    <button class="btn-editar" onclick="carregarParaEditar(${index})">Editar</button>
                    <button class="btn-excluir" onclick="remover(${index})">Apagar</button>
                </td>
            </tr>
        `;
    });
}

// Ação: DELETE (Remover)
function remover(index) {
    if (confirm("Deseja apagar este agendamento?")) {
        let lista = JSON.parse(localStorage.getItem('agendamentos'));
        lista.splice(index, 1); // Remove da lista
        localStorage.setItem('agendamentos', JSON.stringify(lista));
        listarAgendamentos();
    }
}

// Ação: UPDATE (Preparar para editar)
function carregarParaEditar(index) {
    let lista = JSON.parse(localStorage.getItem('agendamentos'));
    const item = lista[index];

    document.getElementById('cliente').value = item.cliente;
    document.getElementById('servico').value = item.servico;
    document.getElementById('dataHora').value = item.dataHora;
    document.getElementById('indexEdicao').value = index;
    
    document.getElementById('btnSalvar').innerText = "Atualizar Dados";
}