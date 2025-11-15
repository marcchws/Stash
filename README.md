# Stash

> Guarde o registro, entenda seu dinheiro

Aplicação minimalista de controle financeiro pessoal focada em registro sem fricção. Criado para permitir que você acompanhe seus gastos rapidamente, sem complexidade desnecessária, e ganhe consciência financeira através de resumos visuais simples.

## O Problema

Os aplicativos financeiros atuais criam barreiras ao invés de soluções:
- **Complexidade excessiva**: Interfaces carregadas com funcionalidades que você nunca usa
- **Desconfiança**: Exigem integração bancária e acesso a dados sensíveis
- **Ansiedade**: Notificações constantes, gráficos alarmistas e linguagem negativa
- **Fricção**: Processo lento e trabalhoso para registrar uma despesa simples

## A Solução

Uma experiência minimalista focada em velocidade:

**3 toques para registrar um gasto:**
1. Abrir app
2. Inserir valor → Selecionar categoria
3. Salvar

**10 segundos ou menos** do início ao fim.

## Features (MVP)

### Despesas
CRUD completo de despesas com categorização visual, busca e filtros por período/categoria.

### Histórico
Timeline cronológica agrupada por data, com resumos diários e acesso rápido via FAB.

### Resumo
Dashboard mensal com métricas essenciais: total gasto, gastos por categoria, evolução temporal e top categorias.

## Stack Tecnológica

### Core
- **Next.js 16** (App Router) - Framework React com SSR
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling utility-first (configurado via `@theme` no globals.css)

### UI/UX
- **Shadcn/UI** - Componentes acessíveis e customizáveis
- **MCP Registries** - Componentes premium (@aceternity, @magicui, @motion-primitives, etc.)
- **Lucide React** - Biblioteca de ícones (exclusivo)
- **next-themes** - Gerenciamento de tema dark/light

### Tipografia
- **Poppins** (Google Fonts) - Font principal

## Setup Rápido

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/stash.git
cd stash

# Instale dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse http://localhost:3000

### Comandos Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build de produção
npm start        # Inicia servidor de produção
npm run lint     # Executa linter
```

---

**Stash** - Controle financeiro sem fricção, foco no essencial.
