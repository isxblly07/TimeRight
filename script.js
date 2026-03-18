// --- CONFIGURAÇÃO DA API ---
// Substitua pela URL real do seu back-end quando ele estiver no ar
const API_URL = "http://localhost:8080/api/usuario"; 

// --- 1. LÓGICA DE LOGIN (AUTENTICAÇÃO) ---
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const dados = {
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value
        };

        try {
            const resposta = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                const resultado = await resposta.json();
                // Guardamos um "token" ou o nome para saber que estamos logados
                sessionStorage.setItem('usuarioLogado', resultado.nome);
                alert(`Bem-vinda, ${resultado.nome}!`);
                window.location.href = "agendar.html";
            } else {
                alert("E-mail ou senha incorretos.");
            }
        } catch (erro) {
            console.error("Erro ao conectar no servidor:", erro);
            alert("Servidor offline. Usando modo de teste.");
            window.location.href = "agendar.html"; // Redireciona mesmo assim para você não travar no teste
        }
    });
}

// --- 2. LÓGICA DO CRUD COM BACK-END ---
const formAgendamento = document.getElementById('formAgendamento');
const corpoTabela = document.getElementById('corpoTabela');

document.addEventListener('DOMContentLoaded', listarAgendamentos);

if (formAgendamento) {
    formAgendamento.addEventListener('submit', async function(e) {
        e.preventDefault();

        const idEdicao = document.getElementById('indexEdicao').value;
        const dadosAgendamento = {
            cliente: document.getElementById('cliente').value,
            servico: document.getElementById('servico').value,
            dataHora: document.getElementById('dataHora').value
        };

        try {
            let resposta;
            if (idEdicao === "") {
                // CREATE: Envia novo para o servidor
                resposta = await fetch(`${API_URL}/agendamentos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosAgendamento)
                });
            } else {
                // UPDATE: Atualiza um existente usando o ID
                resposta = await fetch(`${API_URL}/agendamentos/${idEdicao}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosAgendamento)
                });
            }

            if (resposta.ok) {
                alert("Dados salvos no servidor!");
                resetarFormulario();
                listarAgendamentos();
            }
        } catch (erro) {
            // Se o servidor falhar, o código avisa no console
            console.warn("API indisponível, salvando localmente para teste...");
            salvarLocalmente(dadosAgendamento, idEdicao);
        }
    });
}

// READ: Busca os dados na API
async function listarAgendamentos() {
    if (!corpoTabela) return;
    
    try {
        const resposta = await fetch(`${API_URL}/agendamentos`);
        const lista = await resposta.json();
        renderizarTabela(lista);
    } catch (erro) {
        // Fallback: Se a API falhar, mostra o que está no localStorage
        const listaLocal = JSON.parse(localStorage.getItem('agendamentos')) || [];
        renderizarTabela(listaLocal);
    }
}

// Função auxiliar para desenhar a tabela
function renderizarTabela(lista) {
    corpoTabela.innerHTML = lista.map((item, index) => `
        <tr>
            <td>${item.cliente}</td>
            <td>${item.servico}</td>
            <td>${new Date(item.dataHora).toLocaleString('pt-BR')}</td>
            <td>
                <button class="btn-editar" onclick="carregarParaEditar(${item.id || index})">Editar</button>
                <button class="btn-excluir" onclick="remover('${item.id || index}')">Apagar</button>
            </td>
        </tr>
    `).join('');
}

// DELETE: Apaga na API
async function remover(id) {
    if (!confirm("Confirmar exclusão?")) return;

    try {
        await fetch(`${API_URL}/agendamentos/${id}`, { method: 'DELETE' });
        listarAgendamentos();
    } catch (erro) {
        alert("Erro ao apagar no servidor.");
    }
}

// Funções de Ajuda
function resetarFormulario() {
    formAgendamento.reset();
    document.getElementById('indexEdicao').value = "";
    document.getElementById('btnSalvar').innerText = "Confirmar Horário";
}

// --- 3. LÓGICA DE CADASTRO (CLIENTE E ADM) ---
async function enviarCadastro(event, rota) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData.entries());

    try {
        const resp = await fetch(`${API_URL}/${rota}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        if(resp.ok) {
            alert("Sucesso! Faça seu login.");
            window.location.href = "login.html";
        }
    } catch (e) {
        alert("Simulação: Cadastro realizado!");
        window.location.href = "login.html";
    }
}

const formUser = document.getElementById('formCadastroUser');
if (formUser) formUser.addEventListener('submit', (e) => enviarCadastro(e, 'usuarios'));

const formAdm = document.getElementById('formCadastroAdm');
if (formAdm) formAdm.addEventListener('submit', (e) => enviarCadastro(e, 'admin'));

// --- LOGICA DE REDIRECIONAMENTO NO LOGIN ---
const FormLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        // Simulação de Login: Guarda o e-mail no navegador (SessionStorage)
        sessionStorage.setItem('usuarioAtivo', email);
        
        alert("Login realizado com sucesso!");
        window.location.href = "painel-cliente.html"; // Vai para a nova página
    });
}
 
// --- CONTROLE DO PAINEL (CRUD FOCO EM JS) ---
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('painel-cliente.html')) {
        const usuario = sessionStorage.getItem('usuarioAtivo');
        
        if (!usuario) {
            window.location.href = "login.html"; // Proteção: Se não logou, volta
            return;
        }
 
        document.getElementById('boasVindas').innerText = `Olá, ${usuario.split('@')[0]}!`;
        listarAgendamentos();
    }
});
 
// Função para Sair
function logout() {
    sessionStorage.removeItem('usuarioAtivo');
    window.location.href = "login.html";
}
 
// Renderização Dinâmica com JS
async function listarAgendamentos() {
    const corpoTabela = document.getElementById('corpoTabela');
    if (!corpoTabela) return;
 
    // Aqui você buscaria da sua API futuramente. Por enquanto, usamos localStorage.
    let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    
    // Filtrar agendamentos apenas do usuário logado (Lógica de JS)
    const usuarioAtivo = sessionStorage.getItem('usuarioAtivo');
    const meusAgendamentos = agendamentos.filter(a => a.usuario === usuarioAtivo);
 
    if (meusAgendamentos.length === 0) {
        document.getElementById('listaVazia').style.display = 'block';
        document.getElementById('tabelaAgendamentos').style.display = 'none';
        return;
    }
 
    corpoTabela.innerHTML = meusAgendamentos.map((item, index) => `
        <tr>
            <td>${item.servico}</td>
            <td>${new Date(item.dataHora).toLocaleString('pt-BR')}</td>
            <td><span class="status-pendente">Pendente</span></td>
            <td>
                <button class="btn-editar" onclick="carregarParaEditar(${index})">✎</button>
                <button class="btn-excluir" onclick="remover(${index})">X</button>
            </td>
        </tr>
    `).join('');
}