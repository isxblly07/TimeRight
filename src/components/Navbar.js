// Navbar: barra de navegação exibida em todas as páginas
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Realiza logout e redireciona para home
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Logo da aplicação */}
      <Link to="/" className="navbar-logo">
        🌸 TimeRight
      </Link>

      {/* Links de navegação */}
      <div className="navbar-links">
        {!user ? (
          // Usuário não logado: mostra Login e Cadastro
          <>
            <Link to="/login" className="nav-link">Entrar</Link>
            <Link to="/cadastro" className="btn-primary">Cadastrar</Link>
          </>
        ) : (
          // Usuário logado: mostra nome, link do painel e logout
          <>
            <span className="nav-usuario">Olá, {user.nome.split(' ')[0]}!</span>
            {user.tipo === 'admin' && (
              <>
                <Link to="/admin" className="nav-link">Início</Link>
                <Link to="/admin/cadastro-salao" className="nav-link">Meu Salão</Link>
                <Link to="/admin/painel" className="nav-link">Painel</Link>
              </>
            )}
            {user.tipo === 'cliente' && (
              <>
                <Link to="/cliente" className="nav-link">Buscar Salões</Link>
                <Link to="/historico" className="nav-link">Histórico</Link>
                <Link to="/perfil" className="nav-link">Perfil</Link>
              </>
            )}
            <button onClick={handleLogout} className="btn-secondary">Sair</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
