// Página de Perfil: exibe e permite editar informações do cliente
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { buscarUsuario, atualizarUsuario } from '../service/api';
import Navbar from '../components/Navbar';
import './Perfil.css';

const Perfil = () => {
  const { user, atualizarPerfil } = useAuth();

  const [form, setForm] = useState({ nome: '', username: '' });
  const [editando, setEditando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  // Busca dados atualizados do usuário ao montar
  useEffect(() => {
    if (!user?.id) return;
    buscarUsuario(user.id)
      .then(({ data }) => {
        atualizarPerfil(data);
        setForm({ nome: data.nome, username: data.username });
      })
      .catch(() => {
        setForm({ nome: user.nome || '', username: user.username || '' });
      });
  }, [user?.id]); // eslint-disable-line

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSalvar = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const { data } = await atualizarUsuario(user.id, {
        ...user,
        nome: form.nome,
        username: form.username,
      });
      atualizarPerfil(data);
      setEditando(false);
      setSalvo(true);
      setTimeout(() => setSalvo(false), 3000);
    } catch {
      setErro('Erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="perfil-page">
      <Navbar />

      <div className="perfil-container">
        {/* Avatar e nome */}
        <div className="perfil-avatar-section">
          <div className="perfil-avatar">
            {user.nome?.charAt(0).toUpperCase()}
          </div>
          <h2>{user.nome}</h2>
          <span className="perfil-tipo">👤 Cliente</span>
        </div>

        {/* Card de informações */}
        <div className="card perfil-card">
          <div className="perfil-card-header">
            <h3>Minhas Informações</h3>
          </div>

          {salvo && (
            <div className="perfil-sucesso">✅ Perfil atualizado com sucesso!</div>
          )}
          {erro && (
            <div className="perfil-erro">{erro}</div>
          )}

          {!editando ? (
            <>
              <div className="perfil-info-lista">
                <div className="perfil-info-item">
                  <span className="info-label">Nome</span>
                  <span className="info-valor">{user.nome}</span>
                </div>
                <div className="perfil-info-item">
                  <span className="info-label">Usuário</span>
                  <span className="info-valor">{user.username}</span>
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

              <div className="form-group">
                <label>Usuário (não editável)</label>
                <input type="text" value={user.username} disabled className="input-disabled" />
              </div>

              <div className="perfil-form-botoes">
                <button type="button" className="btn-secondary" onClick={() => setEditando(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
