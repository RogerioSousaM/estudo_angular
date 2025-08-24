# 🚀 Sistema de Gerenciamento de Produtos

Sistema CRUD completo desenvolvido com **Angular 17**, **NestJS** e **SQL Server**, implementando arquitetura moderna com TypeORM e sistema de migrations.

## ✨ Características

- **Frontend**: Angular 17 com design responsivo e profissional
- **Backend**: NestJS com arquitetura modular
- **Banco de Dados**: SQL Server com TypeORM
- **Migrations**: Sistema de controle de versão do banco
- **Relatórios**: Dashboard com estatísticas e análises
- **Validações**: Forms reativos com validação em tempo real
- **UI/UX**: Interface moderna e intuitiva

## 🏗️ Arquitetura

```
Projeto_Angular/
├── produtos-api/          # Backend NestJS
│   ├── src/
│   │   ├── produtos/      # Módulo de produtos
│   │   ├── relatorios/    # Módulo de relatórios
│   │   ├── config/        # Configurações TypeORM
│   │   └── migrations/    # Migrations do banco
│   └── package.json
├── produtos-frontend/      # Frontend Angular
│   ├── src/app/
│   │   ├── component/     # Componentes da aplicação
│   │   ├── services/      # Serviços HTTP
│   │   └── models/        # Modelos de dados
│   └── package.json
└── README.md
```

## 🚀 Tecnologias Utilizadas

### Frontend
- **Angular 17** - Framework principal
- **TypeScript** - Linguagem de programação
- **CSS3** - Estilização moderna e responsiva
- **Angular Material** - Componentes UI

### Backend
- **NestJS** - Framework Node.js
- **TypeORM** - ORM para banco de dados
- **SQL Server** - Banco de dados relacional
- **TypeScript** - Linguagem de programação

### Ferramentas
- **Git** - Controle de versão
- **npm** - Gerenciador de pacotes
- **ESLint** - Linter de código
- **Prettier** - Formatador de código

## 📋 Funcionalidades

### 🎯 Gestão de Produtos
- ✅ **Criar** novos produtos
- ✅ **Visualizar** lista de produtos
- ✅ **Editar** produtos existentes
- ✅ **Deletar** produtos
- ✅ **Validações** em tempo real

### 📊 Relatórios e Estatísticas
- 📈 **Resumo geral** do sistema
- ⚠️ **Alertas de estoque** baixo
- 💰 **Análise de preços** (mais caro, mais barato, média)
- 📅 **Estatísticas temporais** (último mês/semana)

### 🎨 Interface
- **Design responsivo** para mobile e desktop
- **Navegação intuitiva** entre páginas
- **Feedback visual** para todas as ações
- **Layout profissional** e corporativo

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- SQL Server
- Git

### 1. Clone o repositório
```bash
git clone https://https://github.com/RogerioSousaM/estudo_angular
cd sistema-produtos
```

### 2. Configure o Backend
```bash
cd produtos-api
npm install

# Configure o banco de dados em src/config/typeorm.config.ts
# Execute as migrations
npm run migration:run

# Inicie o servidor
npm run start:dev
```

### 3. Configure o Frontend
```bash
cd produtos-frontend
npm install

# Inicie a aplicação
npm start
```

## 🔧 Configuração do Banco

### SQL Server
```sql
-- Crie o banco de dados
CREATE DATABASE Loja;
GO

-- Use o banco
USE Loja;
GO
```

### Variáveis de Ambiente
Crie um arquivo `.env` na pasta `produtos-api`:
```env
DB_HOST=localhost
DB_USER=user
DB_PASS=123
DB_NAME=Loja
DB_INSTANCE=SQLEXPRESS01
```

## 📚 Scripts Disponíveis

### Backend (produtos-api)
```bash
npm run start          # Inicia o servidor
npm run start:dev      # Modo desenvolvimento
npm run build          # Compila o projeto
npm run migration:run  # Executa migrations
npm run migration:generate  # Gera nova migration
```

### Frontend (produtos-frontend)
```bash
npm start              # Inicia o servidor de desenvolvimento
npm run build          # Compila para produção
npm run test           # Executa testes
```

## 🌐 Endpoints da API

### Produtos
- `GET /produtos` - Lista todos os produtos
- `GET /produtos/:id` - Busca produto por ID
- `POST /produtos` - Cria novo produto
- `PUT /produtos/:id` - Atualiza produto
- `DELETE /produtos/:id` - Remove produto

### Relatórios
- `GET /relatorios/resumo` - Resumo geral
- `GET /relatorios/estoque-baixo` - Produtos com estoque baixo
- `GET /relatorios/produtos-por-preco` - Análise de preços
- `GET /relatorios/estatisticas-temporais` - Estatísticas temporais

## 📱 Estrutura das Páginas

### Dashboard
- Visão geral do sistema
- Cards de navegação
- Estatísticas rápidas

### Lista de Produtos
- Tabela responsiva
- Ações de editar/deletar
- Filtros e ordenação

### Formulário de Produto
- Validações em tempo real
- Campos obrigatórios
- Feedback visual

### Relatórios
- Gráficos e estatísticas
- Análise de dados
- Exportação de informações

## 🔒 Segurança

- **Validação** no frontend e backend
- **Sanitização** de dados
- **Controle de acesso** (preparado para implementação)
- **Logs** de auditoria

## 🧪 Testes

```bash
# Backend
cd produtos-api
npm run test

# Frontend
cd produtos-frontend
npm run test
```

## 📦 Deploy

### Produção
```bash
# Backend
cd produtos-api
npm run build
npm run start:prod

# Frontend
cd produtos-frontend
npm run build
# Servir arquivos da pasta dist/
``
4. Abra um Pull Request

## 👨‍💻 Autor

**Rogério Sousa Moreira**
- GitHub: [@RogerioSousaM](https://github.com/RogerioSousaM)
- LinkedIn: [Seu Nome](https://linkedin.com/in/rogério-sousa-moreira-84309486)

## 🙏 Agradecimentos

- Comunidade Angular
- Comunidade NestJS
- TypeORM
- SQL Server

