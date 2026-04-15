import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './DashboardAdmin.css';

const DashboardAdmin = () => {
  const { user, salao, desativarSalao } = useAuth();
  const [confirmDesativar, setConfirmDesativar] = useState(false);
  const [desativado, setDesativado] = useState(false);

  const handleDesativar = () => {
    desativarSalao();
    setConfirmDesativar(false);
    setDesativado(true);
    setTimeout(() => setDesativado(false), 3000);
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <div className="admin-boas-vindas">
          <h1>Bem-vinda, {user.nome.split(' ')[0]}! 💼</h1>
          <p>O que você deseja fazer hoje?</p>
        </div>

        {desativado && <div className="sucesso-msg">✅ Salão desativado com sucesso.</div>}

        <div className="admin-atalhos">
          <Link to="/admin/cadastro-salao" className="atalho-card">
            <span className="atalho-icone">🏪</span>
            <strong>Cadastrar Salão</strong>
            <span>Adicione as informações do seu salão</span>
          </Link>
          <Link to="/admin/painel" className="atalho-card">
            <span className="atalho-icone">📅</span>
            <strong>Painel</strong>
            <span>Veja e edite os agendamentos dos clientes</span>
          </Link>
          <Link to="/admin/atualizar-salao" className="atalho-card">
            <span className="atalho-icone">✏️</span>
            <strong>Atualizar Salão</strong>
            <span>Edite os dados do seu salão</span>
          </Link>
          <Link to="/admin/usuarios" className="atalho-card">
            <span className="atalho-icone">👥</span>
            <strong>Gerenciar Usuários</strong>
            <span>Inclua, edite, inative ou exclua perfis</span>
          </Link>
          <button
            className="atalho-card atalho-card-btn"
            onClick={() => setConfirmDesativar(true)}
            disabled={salao && !salao.ativo}
          >
            <span className="atalho-icone">🔴</span>
            <strong>Desativar Salão</strong>
            <span>{salao && !salao.ativo ? 'Salão já desativado' : 'Suspenda temporariamente seu salão'}</span>
          </button>
        </div>

        {confirmDesativar && (
          <div className="modal-overlay" onClick={() => setConfirmDesativar(false)}>
            <div className="modal-card card" onClick={e => e.stopPropagation()}>
              <h3>Desativar Salão</h3>
              <p className="admin-subtitulo">Tem certeza? Seu salão ficará invisível para os clientes.</p>
              <div className="modal-botoes">
                <button className="btn-secondary" onClick={() => setConfirmDesativar(false)}>Cancelar</button>
                <button className="btn-danger" onClick={handleDesativar}>Desativar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
