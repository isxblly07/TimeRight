import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './DashboardAdmin.css';

const DashboardAdmin = () => {
  const { user } = useAuth();

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <div className="admin-boas-vindas">
          <h1>Bem-vinda, {user.nome.split(' ')[0]}! 💼</h1>
          <p>O que você deseja fazer hoje?</p>
        </div>

        <div className="admin-atalhos">
          <Link to="/admin/cadastro-salao" className="atalho-card">
            <span className="atalho-icone">🏪</span>
            <strong>Cadastrar Salão</strong>
            <span>Adicione as informações do seu salão</span>
          </Link>
          <Link to="/admin/painel" className="atalho-card">
            <span className="atalho-icone">📅</span>
            <strong>Painel</strong>
            <span>Veja os agendamentos dos clientes</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
