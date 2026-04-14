import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Auth.css';

const Cadastro = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    cidade: '',
    tipo: 'cliente',
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
      // 🔥 Mapeando dados para o backend
      const payload = {
        nome: form.nome,
        username: form.email, // usando email como username
        password: form.senha,
        statusUsuario: "ATIVO",
        dataCadastro: new Date().toISOString(),

        nivelAcesso: {
          id: form.tipo === 'admin' ? 1 : 2 // ajuste conforme seu banco
        }
      };

      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const erroResponse = await response.json();
        throw new Error(erroResponse.message || 'Erro ao cadastrar usuário');
      }

      // Sucesso 🎉
      navigate(form.tipo === 'admin' ? '/admin' : '/cliente');

    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />

      <div className="auth-container">
        <div className="auth-card card">

          {/* Cabeçalho */}
          <div className="auth-header">
            <span className="auth-icone">✨</span>
            <h2>Criar conta</h2>
            <p>Preencha os dados para se cadastrar</p>
          </div>

          {/* Tipo de conta */}
          <div className="tipo-selector">
            <button
              type="button"
              className={`tipo-btn ${form.tipo === 'cliente' ? 'ativo' : ''}`}
              onClick={() => setForm({ ...form, tipo: 'cliente' })}
            >
              👤 Cliente
            </button>

            <button
              type="button"
              className={`tipo-btn ${form.tipo === 'admin' ? 'ativo' : ''}`}
              onClick={() => setForm({ ...form, tipo: 'admin' })}
            >
              💼 Administrador
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Nome completo</label>
              <input
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Mínimo 6 caracteres"
                value={form.senha}
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>

            {/* Campos extras (não enviados ao backend por enquanto) */}
            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                name="telefone"
                placeholder="(00) 00000-0000"
                value={form.telefone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Cidade</label>
              <input
                type="text"
                name="cidade"
                placeholder="Sua cidade"
                value={form.cidade}
                onChange={handleChange}
              />
            </div>

            {/* Erro */}
            {erro && <p className="auth-erro">{erro}</p>}

            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading
                ? 'Cadastrando...'
                : `Criar conta como ${form.tipo === 'admin' ? 'Administrador' : 'Cliente'}`
              }
            </button>

          </form>

          {/* Login */}
          <p className="auth-link">
            Já tem conta? <Link to="/login">Entrar</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Cadastro;

