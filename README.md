# 🚀 Sistema de Gerenciamento de Produtos

Sistema CRUD completo desenvolvido com **Angular 17**, **NestJS** e **SQL Server**, implementando arquitetura moderna com TypeORM e sistema de migrations.

## ✨ Características

- **Frontend**: Angular 17 com design responsivo e profissional
- **Backend**: NestJS com arquitetura modular
- **Banco de Dados**: SQL Server com TypeORM
- **Migrations**: Sistema de controle de versão do banco
- **Relatórios**: Dashboard com estatísticas e análises em tempo real
- **Validações**: Forms reativos com validação em tempo real
- **UI/UX**: Interface moderna e intuitiva
- **Integração**: Atualização automática de relatórios ao modificar produtos

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
│   │   ├── services/      # Serviços HTTP com Observables
│   │   └── models/        # Modelos de dados tipados
│   └── package.json
└── README.md
```

## 🚀 Tecnologias Utilizadas

### Frontend
- **Angular 17** 
- **TypeScript** 
- **CSS3** 
- **RxJS**

### Backend
- **NestJS**
- **TypeORM**
- **SQL Server**
- **TypeScript**

### Ferramentas
- **Git**
- **npm**
- **ESLint** 

## 📋 Funcionalidades

### 🎯 Gestão de Produtos
- ✅ **Criar** novos produtos
- ✅ **Visualizar** lista de produtos com resumo rápido
- ✅ **Editar** produtos existentes
- ✅ **Deletar** produtos
- ✅ **Validações** em tempo real
- ✅ **Integração automática** com relatórios

### 📊 Relatórios e Estatísticas
- 📈 **Resumo geral** do sistema em tempo real
- ⚠️ **Alertas de estoque** baixo com notificações visuais
- 💰 **Análise de preços** (mais caro, mais barato, média)
- 📅 **Estatísticas temporais** (último mês/semana)
- 🔄 **Atualização automática** ao modificar produtos
- 📊 **Dashboard integrado** com estatísticas rápidas
- 💵 **Valor total do estoque** calculado corretamente (preço × quantidade)

### 🎨 Interface
- **Design responsivo** para mobile e desktop
- **Navegação intuitiva** entre páginas
- **Feedback visual** para todas as ações
- **Layout profissional** e corporativo
- **Indicadores visuais** para melhor UX

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- SQL Server
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/RogerioSousaM/estudo_angular
cd Projeto_Angular
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
- `GET /relatorios/todos` - Todos os relatórios de uma vez