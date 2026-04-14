import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  // ✅ Carrega usuário do localStorage ao iniciar
  const [user, setUser] = useState(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  const [salao, setSalaoState] = useState(null);

  // ✅ Sempre que user mudar, atualiza localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('usuario', JSON.stringify(user));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [user]);

  // 🔐 LOGIN (agora recebe direto o usuário da API)
  const login = (usuario) => {
    setUser(usuario);
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
  };

  // 👤 ATUALIZAR PERFIL
  const atualizarPerfil = (dados) => {
    setUser(prev => ({ ...prev, ...dados }));
  };

  // 🏪 SALÃO
  const salvarSalao = (dados) => setSalaoState({ ...dados, ativo: true });
  const atualizarSalao = (dados) => setSalaoState(prev => ({ ...prev, ...dados }));
  const desativarSalao = () => setSalaoState(prev => prev ? { ...prev, ativo: false } : null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, // ✅ IMPORTANTE: expõe isso pro Login usar
        login,
        logout,
        atualizarPerfil,
        salao,
        salvarSalao,
        atualizarSalao,
        desativarSalao
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};