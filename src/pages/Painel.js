import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './DashboardAdmin.css';

const agendamentosIniciais = [
  { id: 1, cliente: 'Ana Silva', servico: 'Corte + Escova', data: '2025-07-10', hora: '09:00', status: 'Confirmado' },
  { id: 2, cliente: 'Maria Souza', servico: 'Manicure', data: '2025-07-10', hora: '10:30', status: 'Pendente' },
  { id: 3, cliente: 'Julia Lima', servico: 'Coloração', data: '2025-07-11', hora: '14:00', status: 'Confirmado' },
  { id: 4, cliente: 'Carla Mendes', servico: 'Hidratação', data: '2025-07-12', hora: '11:00', status: 'Pendente' },
];

const Painel = () => {
  const [agendamentos, setAgendamentos] = useState(agendamentosIniciais);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({});

  const abrirEdicao = (ag) => {
    setEditando(ag.id);
    setForm({ hora: ag.hora, status: ag.status });
  };

  const salvarEdicao = (id) => {
    setAgendamentos(prev => prev.map(ag => ag.id === id ? { ...ag, ...form } : ag));
    setEditando(null);
  };

  const cancelarAgendamento = (id) => {
    setAgendamentos(prev => prev.map(ag => ag.id === id ? { ...ag, status: 'Cancelado' } : ag));
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <div className="admin-header">
          <h1>Painel 📅</h1>
          <p>Acompanhe e gerencie os agendamentos dos seus clientes</p>
        </div>

        <div className="card admin-card">
          <h2>Agenda de Clientes</h2>
          <p className="admin-subtitulo">Edite horários, marque como ocupado ou cancele agendamentos</p>

          <div className="agenda-tabela">
            <div className="tabela-header tabela-header-acoes">
              <span>Cliente</span>
              <span>Serviço</span>
              <span>Data</span>
              <span>Hora</span>
              <span>Status</span>
              <span>Ações</span>
            </div>
            {agendamentos.map(ag => (
              <div key={ag.id} className="tabela-linha tabela-linha-acoes">
                <span>{ag.cliente}</span>
                <span>{ag.servico}</span>
                <span>{ag.data.split('-').reverse().join('/')}</span>

                {editando === ag.id ? (
                  <input
                    type="time"
                    value={form.hora}
                    onChange={e => setForm({ ...form, hora: e.target.value })}
                    className="input-hora"
                  />
                ) : (
                  <span>{ag.hora}</span>
                )}

                {editando === ag.id ? (
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                    className="select-status"
                  >
                    <option>Confirmado</option>
                    <option>Pendente</option>
                    <option>Ocupado</option>
                    <option>Cancelado</option>
                  </select>
                ) : (
                  <span className={`status-badge ${ag.status.toLowerCase()}`}>{ag.status}</span>
                )}

                <div className="acoes-btns">
                  {editando === ag.id ? (
                    <>
                      <button className="btn-acao salvar" onClick={() => salvarEdicao(ag.id)}>✔</button>
                      <button className="btn-acao cancelar-acao" onClick={() => setEditando(null)}>✖</button>
                    </>
                  ) : (
                    <>
                      <button className="btn-acao editar" onClick={() => abrirEdicao(ag)} title="Editar">✏️</button>
                      {ag.status !== 'Cancelado' && (
                        <button className="btn-acao cancelar" onClick={() => cancelarAgendamento(ag.id)} title="Cancelar">🚫</button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Painel;
