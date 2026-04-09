// Dashboard do Administrador: cadastro de salão e visualização da agenda
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './DashboardAdmin.css';

// Agendamentos simulados para demonstração
const agendamentosIniciais = [
  { id: 1, cliente: 'Ana Silva', servico: 'Corte + Escova', data: '2025-07-10', hora: '09:00', status: 'Confirmado' },
  { id: 2, cliente: 'Maria Souza', servico: 'Manicure', data: '2025-07-10', hora: '10:30', status: 'Pendente' },
  { id: 3, cliente: 'Julia Lima', servico: 'Coloração', data: '2025-07-11', hora: '14:00', status: 'Confirmado' },
  { id: 4, cliente: 'Carla Mendes', servico: 'Hidratação', data: '2025-07-12', hora: '11:00', status: 'Pendente' },
];

const DashboardAdmin = () => {
  const { user } = useAuth();

  // Aba ativa: 'salao' ou 'agenda'
  const [abaAtiva, setAbaAtiva] = useState('salao');

  // Estado do formulário do salão
  const [salao, setSalao] = useState({
    nome: '',
    endereco: '',
    cidade: '',
    telefone: '',
    descricao: '',
    servicos: '',
    horario: '',
  });

  // Controla se o salão foi salvo
  const [salaoSalvo, setSalaoSalvo] = useState(false);

  // Agendamentos da agenda
  const [agendamentos] = useState(agendamentosIniciais);

  // Atualiza campo do formulário do salão
  const handleChange = (e) => setSalao({ ...salao, [e.target.name]: e.target.value });

  // Salva as informações do salão
  const handleSalvarSalao = (e) => {
    e.preventDefault();
    setSalaoSalvo(true);
  };

  return (
    <div className="admin-page">
      <Navbar />

      <div className="admin-container">
        {/* Cabeçalho de boas-vindas */}
        <div className="admin-header">
          <h1>Olá, {user.nome}! 💼</h1>
          <p>Gerencie seu salão e acompanhe os agendamentos</p>
        </div>

        {/* Abas de navegação */}
        <div className="admin-abas">
          <button
            className={`aba-btn ${abaAtiva === 'salao' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('salao')}
          >
            🏪 Meu Salão
          </button>
          <button
            className={`aba-btn ${abaAtiva === 'agenda' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('agenda')}
          >
            📅 Agenda
          </button>
        </div>

        {/* Aba: Cadastro do Salão */}
        {abaAtiva === 'salao' && (
          <div className="card admin-card">
            <h2>Informações do Salão</h2>
            <p className="admin-subtitulo">Preencha os dados do seu salão de beleza</p>

            {/* Mensagem de sucesso ao salvar */}
            {salaoSalvo && (
              <div className="sucesso-msg">✅ Salão salvo com sucesso!</div>
            )}

            <form onSubmit={handleSalvarSalao} className="salao-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nome do Salão</label>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Ex: Salão da Maria"
                    value={salao.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    placeholder="(00) 00000-0000"
                    value={salao.telefone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Endereço</label>
                <input
                  type="text"
                  name="endereco"
                  placeholder="Rua, número, bairro"
                  value={salao.endereco}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    placeholder="Sua cidade"
                    value={salao.cidade}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Horário de Funcionamento</label>
                  <input
                    type="text"
                    name="horario"
                    placeholder="Ex: Seg-Sex 9h às 19h"
                    value={salao.horario}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Serviços Oferecidos</label>
                <input
                  type="text"
                  name="servicos"
                  placeholder="Ex: Corte, Escova, Manicure, Coloração"
                  value={salao.servicos}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descrição do Salão</label>
                <textarea
                  name="descricao"
                  placeholder="Conte um pouco sobre seu salão..."
                  value={salao.descricao}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <button type="submit" className="btn-primary">Salvar Informações</button>
            </form>
          </div>
        )}

        {/* Aba: Agenda de Agendamentos */}
        {abaAtiva === 'agenda' && (
          <div className="card admin-card">
            <h2>Agenda de Clientes</h2>
            <p className="admin-subtitulo">Veja todos os agendamentos marcados</p>

            {/* Tabela de agendamentos */}
            <div className="agenda-tabela">
              <div className="tabela-header">
                <span>Cliente</span>
                <span>Serviço</span>
                <span>Data</span>
                <span>Hora</span>
                <span>Status</span>
              </div>

              {agendamentos.map(ag => (
                <div key={ag.id} className="tabela-linha">
                  <span>{ag.cliente}</span>
                  <span>{ag.servico}</span>
                  <span>{ag.data.split('-').reverse().join('/')}</span>
                  <span>{ag.hora}</span>
                  <span className={`status-badge ${ag.status === 'Confirmado' ? 'confirmado' : 'pendente'}`}>
                    {ag.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
