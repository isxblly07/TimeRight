import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    senha: ''
  });

  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: form.email,
          senha: form.senha
        })
      });

      if (!response.ok) {
        const erroResponse = await response.json();
        throw new Error(erroResponse.message || 'Erro ao fazer login');
      }

      const usuario = await response.json();

      // 🔐 salva usuário no localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));

      // 🔎 identifica tipo pelo nivelAcesso
      const tipo = usuario.nivelAcesso?.id === 1 ? 'admin' : 'cliente';

      // 🚀 redireciona
      navigate(tipo === 'admin' ? '/admin' : '/cliente');

    } catch (err) {
      setErro(err.message || 'E-mail ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />

      <div className="auth-container">
        <div className="auth-card card">

          {/* Header */}
          <div className="auth-header">
            <span className="auth-icone">🌸</span>
            <h2>Bem-vinda de volta!</h2>
            <p>Entre na sua conta para continuar</p>
          </div>

          {/* Form */}
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

            {/* Erro */}
            {erro && <p className="auth-erro">{erro}</p>}

            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

          </form>

          {/* Dica */}
          <div className="auth-dica">
            <p>🔑 Contas de teste:</p>
            <small>Admin: admin@teste.com / 123456</small><br />
            <small>Cliente: cliente@teste.com / 123456</small>
          </div>

          {/* Link */}
          <p className="auth-link">
            Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
