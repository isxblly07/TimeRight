// Página Home: página principal com apresentação do serviço
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Navbar />

      {/* Seção hero: chamada principal */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-titulo">
            Agende seu horário <span>com facilidade</span> 🌸
          </h1>
          <p className="hero-subtitulo">
            Encontre os melhores salões de beleza da sua região e agende online em segundos.
          </p>
          <div className="hero-botoes">
            <Link to="/cadastro" className="btn-primary">Começar agora</Link>
            <Link to="/login" className="btn-secondary">Já tenho conta</Link>
          </div>
        </div>

        {/* Imagem decorativa: texto curvo em SVG ao redor do círculo */}
        <div className="hero-imagem">
          <div className="hero-circulo">
            {/* SVG com texto seguindo o caminho circular */}
            <svg viewBox="0 0 280 280" width="280" height="280">
              {/* Círculo de fundo */}
              <circle cx="140" cy="140" r="140" fill="url(#gradiente)" />
              <defs>
                <radialGradient id="gradiente" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f8c8d4" />
                  <stop offset="100%" stopColor="#f4a0b5" />
                </radialGradient>
                {/* Caminho circular para o texto seguir */}
                <path id="curva" d="M 40,140 A 100,100 0 1,1 240,140 A 100,100 0 1,1 40,140" />
              </defs>
              {/* Texto curvo seguindo o caminho */}
              <text className="circulo-texto">
                <textPath href="#curva" startOffset="50%" textAnchor="middle">
                  TimeRight • Agende com Estilo •
                </textPath>
              </text>
              {/* Texto central */}
              <text x="140" y="155" className="circulo-centro">TR</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Seção de benefícios */}
      <section className="beneficios">
        <h2>Por que usar o TimeRight?</h2>
        <div className="beneficios-grid">
          <div className="beneficio-card">
            <span className="beneficio-icone">🔍</span>
            <h3>Encontre salões</h3>
            <p>Busque salões próximos de você ou pesquise pelo nome.</p>
          </div>
          <div className="beneficio-card">
            <span className="beneficio-icone">📅</span>
            <h3>Agende online</h3>
            <p>Marque seu horário sem precisar ligar ou esperar.</p>
          </div>
          <div className="beneficio-card">
            <span className="beneficio-icone">💼</span>
            <h3>Para salões</h3>
            <p>Gerencie sua agenda e clientes em um só lugar.</p>
          </div>
        </div>
      </section>

      {/* Rodapé simples */}
      <footer className="footer">
        <p>© 2025 TimeRight — Agendamento Online para Salões de Beleza 🌸</p>
      </footer>
    </div>
  );
};

export default Home;
