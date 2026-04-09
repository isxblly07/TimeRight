// Dashboard do Cliente: busca de salões e agendamento
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './DashboardCliente.css';

// Salões simulados para demonstração
const saloesMock = [
  { id: 1, nome: 'Salão da Maria', cidade: 'São Paulo', bairro: 'Moema', servicos: 'Corte, Escova, Manicure', horario: 'Seg-Sex 9h-19h', avaliacao: 4.8 },
  { id: 2, nome: 'Studio Beleza', cidade: 'São Paulo', bairro: 'Pinheiros', servicos: 'Coloração, Hidratação, Corte', horario: 'Seg-Sáb 8h-20h', avaliacao: 4.6 },
  { id: 3, nome: 'Espaço Glamour', cidade: 'Campinas', bairro: 'Centro', servicos: 'Manicure, Pedicure, Sobrancelha', horario: 'Ter-Dom 9h-18h', avaliacao: 4.9 },
  { id: 4, nome: 'Salão Chique', cidade: 'São Paulo', bairro: 'Vila Madalena', servicos: 'Corte, Escova, Coloração', horario: 'Seg-Sex 10h-20h', avaliacao: 4.7 },
];

const DashboardCliente = () => {
  const { user } = useAuth();

  // Estado da busca
  const [busca, setBusca] = useState('');

  // Salão selecionado para agendamento
  const [salaoSelecionado, setSalaoSelecionado] = useState(null);

  // Dados do agendamento
  const [agendamento, setAgendamento] = useState({ servico: '', data: '', hora: '' });

  // Confirmação de agendamento
  const [agendado, setAgendado] = useState(false);

  // Filtra salões pelo nome ou cidade digitado
  const saloesFiltrados = saloesMock.filter(s =>
    s.nome.toLowerCase().includes(busca.toLowerCase()) ||
    s.cidade.toLowerCase().includes(busca.toLowerCase()) ||
    s.bairro.toLowerCase().includes(busca.toLowerCase())
  );

  // Confirma o agendamento
  const handleAgendar = (e) => {
    e.preventDefault();
    setAgendado(true);
    setTimeout(() => {
      setAgendado(false);
      setSalaoSelecionado(null);
      setAgendamento({ servico: '', data: '', hora: '' });
    }, 3000);
  };

  return (
    <div className="cliente-page">
      <Navbar />

      <div className="cliente-container">
        {/* Cabeçalho de boas-vindas */}
        <div className="cliente-header">
          <h1>Olá, {user.nome.split(' ')[0]}! 🌸</h1>
          <p>Encontre o salão perfeito para você</p>
        </div>

        {/* Barra de pesquisa */}
        <div className="busca-container">
          <div className="busca-input-wrapper">
            <span className="busca-icone">🔍</span>
            <input
              type="text"
              className="busca-input"
              placeholder="Busque por nome do salão, cidade ou bairro..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {/* Lista de salões encontrados */}
        <div className="saloes-grid">
          {saloesFiltrados.length === 0 ? (
            <p className="sem-resultados">Nenhum salão encontrado para "{busca}"</p>
          ) : (
            saloesFiltrados.map(salao => (
              <div key={salao.id} className="salao-card card">
                {/* Ícone e nome */}
                <div className="salao-topo">
                  <span className="salao-emoji">💇‍♀️</span>
                  <div>
                    <h3>{salao.nome}</h3>
                    <span className="salao-local">📍 {salao.bairro}, {salao.cidade}</span>
                  </div>
                  {/* Avaliação */}
                  <span className="salao-avaliacao">⭐ {salao.avaliacao}</span>
                </div>

                <p className="salao-servicos">🛠 {salao.servicos}</p>
                <p className="salao-horario">🕐 {salao.horario}</p>

                {/* Botão para abrir agendamento */}
                <button
                  className="btn-primary salao-btn"
                  onClick={() => { setSalaoSelecionado(salao); setAgendado(false); }}
                >
                  Agendar Horário
                </button>
              </div>
            ))
          )}
        </div>

        {/* Modal de agendamento */}
        {salaoSelecionado && (
          <div className="modal-overlay" onClick={() => setSalaoSelecionado(null)}>
            <div className="modal-card card" onClick={(e) => e.stopPropagation()}>
              <h3>Agendar em {salaoSelecionado.nome}</h3>
              <p className="modal-subtitulo">Escolha o serviço, data e horário</p>

              {/* Confirmação de sucesso */}
              {agendado ? (
                <div className="agendado-msg">
                  ✅ Agendamento confirmado! Até logo, {user.nome.split(' ')[0]}!
                </div>
              ) : (
                <form onSubmit={handleAgendar}>
                  <div className="form-group">
                    <label>Serviço</label>
                    <select
                      value={agendamento.servico}
                      onChange={(e) => setAgendamento({ ...agendamento, servico: e.target.value })}
                      required
                    >
                      <option value="">Selecione um serviço</option>
                      {salaoSelecionado.servicos.split(', ').map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Data</label>
                    <input
                      type="date"
                      value={agendamento.data}
                      onChange={(e) => setAgendamento({ ...agendamento, data: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Horário</label>
                    <select
                      value={agendamento.hora}
                      onChange={(e) => setAgendamento({ ...agendamento, hora: e.target.value })}
                      required
                    >
                      <option value="">Selecione um horário</option>
                      {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  <div className="modal-botoes">
                    <button type="button" className="btn-secondary" onClick={() => setSalaoSelecionado(null)}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">Confirmar</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCliente;
