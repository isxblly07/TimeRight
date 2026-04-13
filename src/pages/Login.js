import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 FUNÇÃO CORRIGIDA
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await api.post('/funcionario/login', {
        email: form.email,
        senha: form.senha
      });

      const usuario = response.data;

      login(usuario);

      navigate('/admin');

    } catch (error) {
      setErro('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="auth-page">
      <Navbar />

      <div className="auth-container">
        <div className="auth-card card">
          
          <div className="auth-header">
            <span className="auth-icone">🌸</span>
            <h2>Bem-vinda de volta!</h2>
            <p>Entre na sua conta para continuar</p>
          </div>

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

            {erro && <p className="auth-erro">{erro}</p>}

            <button type="submit" className="btn-primary auth-btn">
              Entrar
            </button>
          </form>

          <div className="auth-dica">
            <p>🔑 Contas de teste:</p>
            <small>Admin: admin@teste.com / 123456</small><br />
            <small>Cliente: cliente@teste.com / 123456</small>
          </div>

          <p className="auth-link">
            Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;