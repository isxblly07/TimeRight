// Página de Login: permite entrar como Administrador ou Cliente
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Estado do formulário
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');

  // Atualiza campo do formulário
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Submete o login
  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');

    const resultado = login(form.email, form.senha);

    if (resultado.sucesso) {
      // Redireciona conforme o tipo de usuário
      navigate(resultado.tipo === 'admin' ? '/admin' : '/cliente');
    } else {
      setErro('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="auth-page">
      <Navbar />

      <div className="auth-container">
        <div className="auth-card card">
          {/* Cabeçalho do formulário */}
          <div className="auth-header">
            <span className="auth-icone">🌸</span>
            <h2>Bem-vinda de volta!</h2>
            <p>Entre na sua conta para continuar</p>
          </div>

          {/* Formulário de login */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                placeholder="Sua senha"
                value={form.senha}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mensagem de erro */}
            {erro && <p className="auth-erro">{erro}</p>}

            <button type="submit" className="btn-primary auth-btn">Entrar</button>
          </form>

          {/* Dica de contas de teste */}
          <div className="auth-dica">
            <p>🔑 Contas de teste:</p>
            <small>Admin: admin@teste.com / 123456</small><br />
            <small>Cliente: cliente@teste.com / 123456</small>
          </div>

          {/* Link para cadastro */}
          <p className="auth-link">
            Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
