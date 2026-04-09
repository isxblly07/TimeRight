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
  const [agendamentos] = useState(agendamentosIniciais);

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <div className="admin-header">
          <h1>Painel 📅</h1>
          <p>Acompanhe os agendamentos dos seus clientes</p>
        </div>

        <div className="card admin-card">
          <h2>Agenda de Clientes</h2>
          <p className="admin-subtitulo">Veja todos os agendamentos marcados</p>

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
      </div>
    </div>
  );
};

export default Painel;
