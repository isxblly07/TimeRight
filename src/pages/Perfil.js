// Página de Perfil: exibe e permite editar informações do cliente
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Perfil.css';

const Perfil = () => {
  const { user, atualizarPerfil } = useAuth();

  // Estado do formulário preenchido com dados atuais do usuário
  const [form, setForm] = useState({
    nome: user.nome,
    telefone: user.telefone,
    cidade: user.cidade,
  });

  // Controla modo de edição
  const [editando, setEditando] = useState(false);

  // Mensagem de sucesso ao salvar
  const [salvo, setSalvo] = useState(false);

  // Atualiza campo do formulário
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Salva as alterações do perfil
  const handleSalvar = (e) => {
    e.preventDefault();
    atualizarPerfil(form);
    setEditando(false);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  return (
    <div className="perfil-page">
      <Navbar />

      <div className="perfil-container">
        {/* Avatar e nome */}
        <div className="perfil-avatar-section">
          <div className="perfil-avatar">
            {user.nome.charAt(0).toUpperCase()}
          </div>
          <h2>{user.nome}</h2>
          <span className="perfil-tipo">👤 Cliente</span>
        </div>

        {/* Card de informações */}
        <div className="card perfil-card">
          <div className="perfil-card-header">
            <h3>Minhas Informações</h3>
          </div>

          {/* Mensagem de sucesso */}
          {salvo && (
            <div className="perfil-sucesso">✅ Perfil atualizado com sucesso!</div>
          )}

          {/* Modo visualização */}
          {!editando ? (
            <>
              <div className="perfil-info-lista">
                <div className="perfil-info-item">
                  <span className="info-label">Nome</span>
                  <span className="info-valor">{user.nome}</span>
                </div>
                <div className="perfil-info-item">
                  <span className="info-label">E-mail</span>
                  <span className="info-valor">{user.email}</span>
                </div>
                <div className="perfil-info-item">
                  <span className="info-label">Telefone</span>
                  <span className="info-valor">{user.telefone}</span>
                </div>
                <div className="perfil-info-item">
                  <span className="info-label">Cidade</span>
                  <span className="info-valor">{user.cidade}</span>
                </div>
                <div className="perfil-info-item">
                  <span className="info-label">Tipo de conta</span>
                  <span className="info-valor">Cliente</span>
                </div>
              </div>
              <button className="btn-primary perfil-btn-atualizar" onClick={() => setEditando(true)}>
                ✏️ Atualizar Dados
              </button>
            </>
          ) : (
            // Modo edição: formulário
            <form onSubmit={handleSalvar} className="perfil-form">
              <div className="form-group">
                <label>Nome completo</label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* E-mail não editável */}
              <div className="form-group">
                <label>E-mail (não editável)</label>
                <input type="email" value={user.email} disabled className="input-disabled" />
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <input
                  type="tel"
                  name="telefone"
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
                  value={form.cidade}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="perfil-form-botoes">
                <button type="button" className="btn-secondary" onClick={() => setEditando(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">Salvar</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
