// Contexto de autenticação: gerencia o usuário logado em toda a aplicação
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Hook para acessar o contexto facilmente
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Estado do usuário logado (null = não logado)
  const [user, setUser] = useState(null);

  // Dados simulados de usuários (substitui banco de dados no frontend)
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Admin Teste', email: 'admin@teste.com', senha: '123456', tipo: 'admin', telefone: '(11) 99999-0001', cidade: 'São Paulo' },
    { id: 2, nome: 'Cliente Teste', email: 'cliente@teste.com', senha: '123456', tipo: 'cliente', telefone: '(11) 99999-0002', cidade: 'São Paulo' },
  ]);

  // Função de login: verifica email e senha
  const login = (email, senha) => {
    const encontrado = usuarios.find(u => u.email === email && u.senha === senha);
    if (encontrado) {
      setUser(encontrado);
      return { sucesso: true, tipo: encontrado.tipo };
    }
    return { sucesso: false };
  };

  // Função de cadastro: adiciona novo usuário
  const cadastrar = (dados) => {
    const existe = usuarios.find(u => u.email === dados.email);
    if (existe) return { sucesso: false, mensagem: 'E-mail já cadastrado.' };
    const novoUsuario = { ...dados, id: Date.now() };
    setUsuarios(prev => [...prev, novoUsuario]);
    setUser(novoUsuario);
    return { sucesso: true, tipo: novoUsuario.tipo };
  };

  // Função de atualizar perfil do usuário logado
  const atualizarPerfil = (dados) => {
    setUser(prev => ({ ...prev, ...dados }));
    setUsuarios(prev => prev.map(u => u.id === user.id ? { ...u, ...dados } : u));
  };

  // Função de logout
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, cadastrar, logout, atualizarPerfil }}>
      {children}
    </AuthContext.Provider>
  );
};
