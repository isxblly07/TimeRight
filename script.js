// --- CONFIGURAÇÃO DA API ---
const API_URL = "http://localhost:8080/api/usuario";
 
// --- 1. LÓGICA DE LOGIN (AUTENTICAÇÃO) ---
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', async function(e) {
        e.preventDefault();
 
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
 
        try {
            const resposta = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
 
            if (resposta.ok) {
                const resultado = await resposta.json();
                // Salva os dados da sessão
                sessionStorage.setItem('usuarioAtivo', email);
                sessionStorage.setItem('usuarioNome', resultado.nome || email.split('@')[0]);
                
                alert(`Bem-vinda!`);
                window.location.href = "painel-cliente.html";
            } else {
                alert("E-mail ou senha incorretos.");
            }
        } catch (erro) {
            console.error("Erro ao conectar no servidor:", erro);
            // Simulação para teste caso o backend esteja offline
            sessionStorage.setItem('usuarioAtivo', email);
            alert("Modo de Simulação: Login efetuado.");
            window.location.href = "painel-cliente.html";
        }
    });
}
 
// --- 2. CONTROLE DO PAINEL E CRUD ---
document.addEventListener('DOMContentLoaded', () => {
    // Se estiver na página do painel, verifica login e carrega lista
    if (window.location.pathname.includes('painel-cliente.html')) {
        const usuario = sessionStorage.getItem('usuarioAtivo');
        const nomeUsuario = sessionStorage.getItem('usuarioNome');
 
        if (!usuario) {
            window.location.href = "login.html";
            return;
        }
 
        const boasVindasElem = document.getElementById('boasVindas');
        if (boasVindasElem) boasVindasElem.innerText = `Olá, ${nomeUsuario}!`;
        
        listarAgendamentos();
    }
});
 
const formAgendamento = document.getElementById('formAgendamento');
if (formAgendamento) {
    formAgendamento.addEventListener('submit', async function(e) {
        e.preventDefault();
 
        const idEdicao = document.getElementById('indexEdicao').value;
        const dadosAgendamento = {
            usuario: sessionStorage.getItem('usuarioAtivo'),
            servico: document.getElementById('servico').value,
            dataHora: document.getElementById('dataHora').value
        };
 
        try {
            let url = `${API_URL}/agendamentos`;
            let metodo = 'POST';
 
            if (idEdicao !== "") {
                url = `${API_URL}/agendamentos/${idEdicao}`;
                metodo = 'PUT';
            }
 
            const resposta = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosAgendamento)
            });
 
            if (resposta.ok) {
                alert("Agendamento salvo com sucesso!");
                resetarFormulario();
                listarAgendamentos();
            }
        } catch (erro) {
            console.warn("Salvando localmente (Backend offline)...");
            salvarLocalmente(dadosAgendamento, idEdicao);
            resetarFormulario();
            listarAgendamentos();
        }
    });
}
 
// --- 3. FUNÇÕES DE BUSCA E RENDERIZAÇÃO ---
async function listarAgendamentos() {
    const corpoTabela = document.getElementById('corpoTabela');
    if (!corpoTabela) return;
 
    let lista = [];
 
    try {
        const resposta = await fetch(`${API_URL}/agendamentos`);
        if (resposta.ok) {
            lista = await resposta.json();
        }
    } catch (erro) {
        console.log("Carregando do LocalStorage...");
        lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
    }
 
    // Filtra para mostrar apenas os agendamentos do usuário logado
    const usuarioLogado = sessionStorage.getItem('usuarioAtivo');
    const meusAgendamentos = lista.filter(a => a.usuario === usuarioLogado);
 
    renderizarTabela(meusAgendamentos);
}
 
function renderizarTabela(lista) {
    const corpoTabela = document.getElementById('corpoTabela');
    const listaVazia = document.getElementById('listaVazia');
    const tabela = document.getElementById('tabelaAgendamentos');
 
    if (lista.length === 0) {
        if (listaVazia) listaVazia.style.display = 'block';
        if (tabela) tabela.style.display = 'none';
        return;
    }
 
    if (listaVazia) listaVazia.style.display = 'none';
    if (tabela) tabela.style.display = 'table';
 
    corpoTabela.innerHTML = lista.map((item, index) => `
        <tr>
            <td>${item.servico}</td>
            <td>${new Date(item.dataHora).toLocaleString('pt-BR')}</td>
            <td><span class="status-pendente">Pendente</span></td>
            <td>
                <button class="btn-editar" onclick="carregarParaEditar(${index}, '${item.id || ''}')">✎</button>
                <button class="btn-excluir" onclick="remover('${item.id || index}')">X</button>
            </td>
        </tr>
    `).join('');
}
 
// --- 4. CADASTRO DE USUÁRIOS E ADM ---
async function enviarCadastro(event, tipo) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dados = Object.fromEntries(formData.entries());
 
    try {
        const rota = tipo === 'adm' ? 'admin' : 'usuarios';
        const resp = await fetch(`${API_URL}/${rota}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        
        if(resp.ok) {
            alert("Cadastro realizado! Faça login.");
            window.location.href = "login.html";
        }
    } catch (e) {
        alert("Modo Simulação: Usuário cadastrado.");
        window.location.href = "login.html";
    }
}
 
const fUser = document.getElementById('formCadastroUser');
if (fUser) fUser.addEventListener('submit', (e) => enviarCadastro(e, 'user'));
 
const fAdm = document.getElementById('formCadastroAdm');
if (fAdm) fAdm.addEventListener('submit', (e) => enviarCadastro(e, 'adm'));
 
// --- 5. FUNÇÕES AUXILIARES ---
function salvarLocalmente(novo, id) {
    let lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
    if (id === "") {
        lista.push(novo);
    } else {
        lista[id] = novo;
    }
    localStorage.setItem('agendamentos', JSON.stringify(lista));
}
 
function remover(id) {
    if (!confirm("Deseja excluir?")) return;
    // Lógica de remoção (idealmente via DELETE na API)
    alert("Agendamento removido.");
    listarAgendamentos();
}
 
function carregarParaEditar(index, idReal) {
    let lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const item = lista[index];
    
    document.getElementById('servico').value = item.servico;
    document.getElementById('dataHora').value = item.dataHora;
    document.getElementById('indexEdicao').value = idReal || index;
    document.getElementById('btnSalvar').innerText = "Atualizar Agendamento";
}
 
function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
}
 
function resetarFormulario() {
    if (formAgendamento) formAgendamento.reset();
    document.getElementById('indexEdicao').value = "";
    document.getElementById('btnSalvar').innerText = "Confirmar Agendamento";
}