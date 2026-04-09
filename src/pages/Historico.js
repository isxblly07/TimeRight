import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Historico.css';

const agendamentosExemplo = [
  {
    id: 1,
    salao: 'Salão da Maria',
    bairro: 'Moema, São Paulo',
    servico: 'Corte + Escova',
    data: '2025-07-18',
    hora: '10:00',
    status: 'agendado',
  },
  {
    id: 2,
    salao: 'Studio Beleza',
    bairro: 'Pinheiros, São Paulo',
    servico: 'Coloração',
    data: '2025-06-25',
    hora: '14:00',
    status: 'concluido',
  },
  {
    id: 3,
    salao: 'Espaço Glamour',
    bairro: 'Centro, Campinas',
    servico: 'Manicure + Pedicure',
    data: '2025-06-10',
    hora: '09:00',
    status: 'concluido',
  },
];

const statusInfo = {
  agendado: { label: 'Agendado', classe: 'status-agendado', icone: '📅' },
  concluido: { label: 'Concluído', classe: 'status-concluido', icone: '✅' },
  cancelado: { label: 'Cancelado', classe: 'status-cancelado', icone: '❌' },
};

const Historico = () => {
  const { user } = useAuth();

  return (
    <div className="historico-page">
      <Navbar />
      <div className="historico-container">
        <div className="historico-header">
          <h1>Meus Agendamentos 📋</h1>
          <p>Veja o histórico e os próximos horários marcados</p>
        </div>

        <div className="historico-lista">
          {agendamentosExemplo.map(ag => {
            const { label, classe, icone } = statusInfo[ag.status];
            return (
              <div key={ag.id} className="historico-card card">
                <div className="historico-card-topo">
                  <div>
                    <h3>{ag.salao}</h3>
                    <span className="historico-local">📍 {ag.bairro}</span>
                  </div>
                  <span className={`status-badge ${classe}`}>{icone} {label}</span>
                </div>

                <div className="historico-detalhes">
                  <span>✂️ {ag.servico}</span>
                  <span>📅 {ag.data.split('-').reverse().join('/')}</span>
                  <span>🕐 {ag.hora}</span>
                </div>

                {ag.status === 'agendado' && (
                  <button className="btn-secondary btn-cancelar">Cancelar agendamento</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Historico;
