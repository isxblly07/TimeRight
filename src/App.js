// App.js: define todas as rotas da aplicação
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Importação das páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardCliente from './pages/DashboardCliente';
import Perfil from './pages/Perfil';

// Rota protegida: redireciona se não estiver logado ou tipo errado
const RotaProtegida = ({ children, tipo }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (tipo && user.tipo !== tipo) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />

          {/* Autenticação */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Dashboard do administrador (protegido) */}
          <Route path="/admin" element={
            <RotaProtegida tipo="admin">
              <DashboardAdmin />
            </RotaProtegida>
          } />

          {/* Dashboard do cliente (protegido) */}
          <Route path="/cliente" element={
            <RotaProtegida tipo="cliente">
              <DashboardCliente />
            </RotaProtegida>
          } />

          {/* Perfil do cliente (protegido) */}
          <Route path="/perfil" element={
            <RotaProtegida tipo="cliente">
              <Perfil />
            </RotaProtegida>
          } />

          {/* Rota não encontrada: redireciona para home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
