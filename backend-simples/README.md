# Time Right - Backend Simplificado para TCC

## 📚 Sobre o Projeto

Este é um backend **simplificado** do sistema Time Right, desenvolvido especificamente para apresentação de TCC de ensino médio técnico em informática.

O foco está na **didática e funcionalidade**, não em complexidade corporativa.

## 🎯 Objetivos Didáticos

- Demonstrar conceitos básicos de **desenvolvimento web**
- Mostrar como funciona uma **API REST**
- Exemplificar **integração com banco de dados**
- Apresentar **arquitetura MVC simples**
- Facilitar o **entendimento das regras de negócio**

## 🏗️ Arquitetura Simplificada

```
backend-simples/
├── src/main/java/com/timeright/
│   ├── TimeRightApplication.java     # Classe principal
│   ├── model/                        # Entidades (tabelas do banco)
│   │   ├── Usuario.java
│   │   ├── Categoria.java
│   │   ├── Profissional.java
│   │   └── Agendamento.java
│   ├── repository/                   # Acesso ao banco de dados
│   │   ├── UsuarioRepository.java
│   │   ├── CategoriaRepository.java
│   │   ├── ProfissionalRepository.java
│   │   └── AgendamentoRepository.java
│   ├── controller/                   # APIs REST (endpoints)
│   │   ├── AuthController.java
│   │   ├── CategoriaController.java
│   │   ├── ProfissionalController.java
│   │   ├── AgendamentoController.java
│   │   └── DashboardController.java
│   └── config/                       # Configurações
│       ├── DataInitializer.java
│       └── CorsConfig.java
└── src/main/resources/
    └── application.yml               # Configurações do sistema
```

## 🗄️ Banco de Dados Simplificado

### Tabelas Principais:

1. **usuarios** - Administradores do sistema
2. **categorias** - Tipos de serviços (corte, manicure, etc.)
3. **profissionais** - Funcionários do salão
4. **agendamentos** - Agendamentos dos clientes

### Relacionamentos:
- Um agendamento pertence a uma categoria
- Um agendamento pertence a um profissional

## 🚀 Como Executar

### Pré-requisitos:
- Java 17+
- Maven 3.6+

### Comandos:
```bash
cd backend-simples
mvn spring-boot:run
```

### Acessos:
- **API:** http://localhost:8080/api
- **Console H2:** http://localhost:8080/h2-console
- **Dados H2:**
  - URL: `jdbc:h2:mem:timeright_simples`
  - User: `sa`
  - Password: (vazio)

## 🔐 Dados de Teste

O sistema cria automaticamente:

### Admin:
- **Email:** admin@timeright.com
- **Senha:** admin123

### Categorias:
- Corte de Cabelo (R$ 30,00)
- Manicure (R$ 25,00)
- Pedicure (R$ 30,00)
- Escova (R$ 40,00)
- Coloração (R$ 80,00)

### Profissionais:
- Maria Silva (Cabeleireira)
- João Santos (Barbeiro)
- Ana Costa (Manicure)
- Carlos Lima (Cabeleireiro)

## 📡 Principais Endpoints

### Autenticação:
- `POST /api/auth/login` - Login do admin
- `GET /api/auth/me` - Dados do usuário logado

### Categorias:
- `GET /api/categories` - Listar todas
- `POST /api/categories` - Criar nova
- `PUT /api/categories/{id}` - Atualizar
- `DELETE /api/categories/{id}` - Desativar

### Profissionais:
- `GET /api/professionals` - Listar todos
- `POST /api/professionals` - Criar novo
- `PUT /api/professionals/{id}` - Atualizar
- `DELETE /api/professionals/{id}` - Desativar

### Agendamentos:
- `GET /api/agendamentos` - Listar todos
- `GET /api/agendamentos/hoje` - Agendamentos de hoje
- `POST /api/agendamentos` - Criar novo
- `PUT /api/agendamentos/{id}/status` - Atualizar status

### Dashboard:
- `GET /api/dashboard/stats` - Estatísticas gerais

## 🛠️ Tecnologias Utilizadas

### Dependências Mínimas:
- **Spring Boot Web** - Para criar APIs REST
- **Spring Data JPA** - Para trabalhar com banco de dados
- **H2 Database** - Banco em memória (simples para demonstração)
- **Validation** - Para validar dados de entrada

### Sem Complexidades:
- ❌ Spring Security (autenticação simplificada)
- ❌ JWT (login básico)
- ❌ Microservices
- ❌ Cache
- ❌ Mensageria
- ❌ Docker

## 📋 Funcionalidades Implementadas

### ✅ Sistema Administrativo:
- Login simples (sem JWT)
- Dashboard com estatísticas básicas
- CRUD de categorias de serviços
- CRUD de profissionais
- Gerenciamento de agendamentos

### ✅ Regras de Negócio:
- Cadastro de serviços por categoria
- Cadastro de profissionais
- Sistema de agendamentos
- Controle de status dos agendamentos
- Relatórios básicos

## 🎓 Para Apresentação do TCC

### Pontos a Destacar:

1. **Arquitetura MVC:**
   - Model (entidades)
   - View (frontend separado)
   - Controller (APIs REST)

2. **Banco de Dados:**
   - Relacionamentos entre tabelas
   - Consultas SQL automáticas (JPA)

3. **API REST:**
   - Endpoints organizados
   - Métodos HTTP (GET, POST, PUT, DELETE)
   - Formato JSON

4. **Regras de Negócio:**
   - Sistema de agendamentos
   - Controle de profissionais
   - Categorização de serviços

### Demonstrações Práticas:
- Mostrar o console H2 com os dados
- Testar endpoints no navegador/Postman
- Explicar o código com comentários didáticos
- Mostrar logs no console

## 🔧 Configurações Importantes

### application.yml:
- Configuração do banco H2
- Porta do servidor (8080)
- CORS para frontend

### DataInitializer:
- Popula dados automaticamente
- Facilita demonstrações

## 📖 Conceitos Demonstrados

- **ORM (Object-Relational Mapping)** com JPA
- **Injeção de Dependência** com Spring
- **API REST** com Spring Web
- **Validação de Dados** com Bean Validation
- **Relacionamentos de Banco** (ManyToOne)
- **Padrão Repository** para acesso a dados

---

**Desenvolvido para fins didáticos - TCC Ensino Médio Técnico** 🎓