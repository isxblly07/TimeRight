// Página de Cadastro: cria conta como Administrador ou Cliente
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Auth.css';

const Cadastro = () => {
  const { cadastrar } = useAuth();
  const navigate = useNavigate();

  // Estado do formulário com tipo padrão "cliente"
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    cidade: '',
    tipo: 'cliente',
  });
  const [erro, setErro] = useState('');

  // Atualiza campo do formulário
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Submete o cadastro
  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');

    const resultado = cadastrar(form);

    if (resultado.sucesso) {
      // Redireciona conforme o tipo escolhido
      navigate(resultado.tipo === 'admin' ? '/admin' : '/cliente');
    } else {
      setErro(resultado.mensagem);
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

          {/* Seletor de tipo de conta */}
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

          {/* Formulário de cadastro */}
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

            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                name="telefone"
                placeholder="(00) 00000-0000"
                value={form.telefone}
                onChange={handleChange}
                required
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
                required
              />
            </div>

            {/* Mensagem de erro */}
            {erro && <p className="auth-erro">{erro}</p>}

            <button type="submit" className="btn-primary auth-btn">
              Criar conta como {form.tipo === 'admin' ? 'Administrador' : 'Cliente'}
            </button>
          </form>

          {/* Link para login */}
          <p className="auth-link">
            Já tem conta? <Link to="/login">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
