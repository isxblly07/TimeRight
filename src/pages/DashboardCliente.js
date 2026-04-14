import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './DashboardCliente.css';

const saloesMock = [
  { id: 1, nome: 'Salão da Maria', cidade: 'São Paulo', bairro: 'Moema', endereco: 'Rua das Flores, 123 - Moema', descricao: 'Especialistas em cortes modernos e tratamentos capilares. Ambiente aconchegante e profissionais experientes.', servicos: 'Corte, Escova, Manicure', horario: 'Seg-Sex 9h-19h', avaliacao: 4.8 },
  { id: 2, nome: 'Studio Beleza', cidade: 'São Paulo', bairro: 'Pinheiros', endereco: 'Av. Rebouças, 456 - Pinheiros', descricao: 'Studio completo de beleza com foco em coloração e tratamentos de hidratação profunda.', servicos: 'Coloração, Hidratação, Corte', horario: 'Seg-Sáb 8h-20h', avaliacao: 4.6 },
  { id: 3, nome: 'Espaço Glamour', cidade: 'Campinas', bairro: 'Centro', endereco: 'Rua Barão de Jaguara, 789 - Centro', descricao: 'Referência em manicure e pedicure na região. Atendimento personalizado e produtos de alta qualidade.', servicos: 'Manicure, Pedicure, Sobrancelha', horario: 'Ter-Dom 9h-18h', avaliacao: 4.9 },
  { id: 4, nome: 'Salão Chique', cidade: 'São Paulo', bairro: 'Vila Madalena', endereco: 'Rua Harmonia, 321 - Vila Madalena', descricao: 'Salão boutique com atendimento exclusivo. Especializado em coloração e escova progressiva.', servicos: 'Corte, Escova, Coloração', horario: 'Seg-Sex 10h-20h', avaliacao: 4.7 },
];

const DashboardCliente = () => {
  const { user, atualizarPerfil } = useAuth();
  const [busca, setBusca] = useState('');
  const [salaoSelecionado, setSalaoSelecionado] = useState(null);
  const [agendamento, setAgendamento] = useState({ servico: '', data: '', hora: '' });
  const [agendado, setAgendado] = useState(false);
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [formPerfil, setFormPerfil] = useState({ nome: user.nome, telefone: user.telefone, cidade: user.cidade });
  const [perfilSalvo, setPerfilSalvo] = useState(false);

  const horariosBase = [
    { hora: '09:00', ocupado: false }, { hora: '10:00', ocupado: true },
    { hora: '11:00', ocupado: false }, { hora: '13:00', ocupado: true },
    { hora: '14:00', ocupado: false }, { hora: '15:00', ocupado: true },
    { hora: '16:00', ocupado: false }, { hora: '17:00', ocupado: false },
  ];

  const getHorarios = (data) => {
    if (!data) return horariosBase;
    const dia = parseInt(data.split('-')[2], 10);
    return horariosBase.map((h, i) => ({ ...h, ocupado: (dia + i) % 3 === 0 }));
  };

  const saloesFiltrados = saloesMock.filter(s =>
    s.nome.toLowerCase().includes(busca.toLowerCase()) ||
    s.cidade.toLowerCase().includes(busca.toLowerCase()) ||
    s.bairro.toLowerCase().includes(busca.toLowerCase())
  );

  const handleAgendar = (e) => {
    e.preventDefault();
    setAgendado(true);
    setTimeout(() => {
      setAgendado(false);
      setSalaoSelecionado(null);
      setAgendamento({ servico: '', data: '', hora: '' });
    }, 3000);
  };

  const handleSalvarPerfil = (e) => {
    e.preventDefault();
    atualizarPerfil(formPerfil);
    setEditandoPerfil(false);
    setPerfilSalvo(true);
    setTimeout(() => setPerfilSalvo(false), 3000);
  };

  return (
    <div className="cliente-page">
      <Navbar />
      <div className="cliente-container">
        <div className="cliente-header">
          <h1>Olá, {user.nome.split(' ')[0]}! 🌸</h1>
          <p>Encontre o salão perfeito para você</p>
        </div>

        {perfilSalvo && <div className="perfil-sucesso-inline">✅ Dados atualizados com sucesso!</div>}

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

        <div className="saloes-grid">
          {saloesFiltrados.length === 0 ? (
            <p className="sem-resultados">Nenhum salão encontrado para "{busca}"</p>
          ) : (
            saloesFiltrados.map(salao => (
              <div key={salao.id} className="salao-card card">
                <div className="salao-topo">
                  <span className="salao-emoji">💇‍♀️</span>
                  <div>
                    <h3>{salao.nome}</h3>
                    <span className="salao-local">📍 {salao.endereco}</span>
                  </div>
                  <span className="salao-avaliacao">⭐ {salao.avaliacao}</span>
                </div>

                <p className="salao-descricao">{salao.descricao}</p>
                <p className="salao-servicos">🛠 {salao.servicos}</p>
                <p className="salao-horario">🕐 {salao.horario}</p>

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

              {agendado ? (
                <div className="agendado-msg">✅ Agendamento confirmado! Até logo, {user.nome.split(' ')[0]}!</div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (!agendamento.hora) return; handleAgendar(e); }}>
                  <div className="form-group">
                    <label>Serviço</label>
                    <select value={agendamento.servico} onChange={(e) => setAgendamento({ ...agendamento, servico: e.target.value })} required>
                      <option value="">Selecione um serviço</option>
                      {salaoSelecionado.servicos.split(', ').map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Data</label>
                    <input type="date" value={agendamento.data} onChange={(e) => setAgendamento({ ...agendamento, data: e.target.value })} required />
                  </div>

                  <div className="form-group">
                    <label>Horário</label>
                    <div className="horarios-grid">
                      {getHorarios(agendamento.data).map(({ hora, ocupado }) => (
                        <button
                          key={hora} type="button" disabled={ocupado}
                          className={`horario-btn ${ocupado ? 'ocupado' : agendamento.hora === hora ? 'selecionado' : ''}`}
                          onClick={() => !ocupado && setAgendamento({ ...agendamento, hora })}
                        >
                          {hora}
                          {ocupado && <span className="horario-tag">Ocupado</span>}
                        </button>
                      ))}
                    </div>
                    {!agendamento.hora && <p className="horario-aviso">Selecione um horário disponível</p>}
                  </div>

                  <div className="modal-botoes">
                    <button type="button" className="btn-secondary" onClick={() => setSalaoSelecionado(null)}>Cancelar</button>
                    <button type="submit" className="btn-primary">Confirmar</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Modal de edição de perfil */}
        {editandoPerfil && (
          <div className="modal-overlay" onClick={() => setEditandoPerfil(false)}>
            <div className="modal-card card" onClick={e => e.stopPropagation()}>
              <h3>Meus Dados ✏️</h3>
              <p className="modal-subtitulo">Atualize suas informações pessoais</p>
              <form onSubmit={handleSalvarPerfil}>
                <div className="form-group">
                  <label>Nome completo</label>
                  <input type="text" value={formPerfil.nome} onChange={e => setFormPerfil({ ...formPerfil, nome: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>E-mail (não editável)</label>
                  <input type="email" value={user.email} disabled className="input-disabled" />
                </div>
                <div className="form-group">
                  <label>Telefone</label>
                  <input type="tel" value={formPerfil.telefone} onChange={e => setFormPerfil({ ...formPerfil, telefone: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Cidade</label>
                  <input type="text" value={formPerfil.cidade} onChange={e => setFormPerfil({ ...formPerfil, cidade: e.target.value })} required />
                </div>
                <div className="modal-botoes">
                  <button type="button" className="btn-secondary" onClick={() => setEditandoPerfil(false)}>Cancelar</button>
                  <button type="submit" className="btn-primary">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCliente;
