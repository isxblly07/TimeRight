import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './DashboardAdmin.css';

const CadastroSalao = () => {
  const [salao, setSalao] = useState({
    nome: '', endereco: '', cidade: '', telefone: '', descricao: '', servicos: '', horario: '',
  });
  const [salaoSalvo, setSalaoSalvo] = useState(false);

  const handleChange = (e) => setSalao({ ...salao, [e.target.name]: e.target.value });

  const handleSalvar = (e) => {
    e.preventDefault();
    setSalaoSalvo(true);
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <div className="admin-header">
          <h1>Cadastre seu Salão 🏪</h1>
          <p>Preencha as informações do seu salão de beleza</p>
        </div>

        <div className="aviso-unico-cadastro">
          ⚠️ Atenção: cada conta permite apenas <strong>um cadastro de salão</strong>.
        </div>

        {salaoSalvo && (
          <div className="sucesso-msg">✅ Salão cadastrado com sucesso!</div>
        )}

        <div className="card admin-card">
          <form onSubmit={handleSalvar} className="salao-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nome do Salão</label>
                <input type="text" name="nome" placeholder="Ex: Salão da Maria" value={salao.nome} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input type="tel" name="telefone" placeholder="(00) 00000-0000" value={salao.telefone} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Endereço</label>
              <input type="text" name="endereco" placeholder="Rua, número, bairro" value={salao.endereco} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cidade</label>
                <input type="text" name="cidade" placeholder="Sua cidade" value={salao.cidade} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Horário de Funcionamento</label>
                <input type="text" name="horario" placeholder="Ex: Seg-Sex 9h às 19h" value={salao.horario} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Serviços Oferecidos</label>
              <input type="text" name="servicos" placeholder="Ex: Corte, Escova, Manicure, Coloração" value={salao.servicos} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Descrição do Salão</label>
              <textarea name="descricao" placeholder="Conte um pouco sobre seu salão..." value={salao.descricao} onChange={handleChange} rows={3} />
            </div>

            <button type="submit" className="btn-primary">Salvar Informações</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroSalao;
