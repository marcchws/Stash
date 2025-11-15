# 🎨 Spec-Driven Design Process - Premium v2.0.1

> **Sistema automatizado de geração de protótipos visuais de alta fidelidade com 5 Princípios Premium**
> Versão 2.0.1 | Última atualização: 2025-01-13

---

## ✨ O Que Há de Novo na v2.0.1 - PATCH RELEASE

Esta versão corrige tokens de **max-width** ausentes que causavam problemas de usabilidade:

### 🔧 Correções Implementadas

- ✅ **Tokens de max-width adicionados** ao `src/theme/config.ts`
- ✅ **Variáveis CSS configuradas** no Tailwind v4 (`globals.css`)
- ✅ **Documentação completa** com recomendações de uso no `design.md`

**Valores disponíveis**:
- `max-w-prose` (65ch) - Textos longos
- `max-w-2xl` (672px) - Formulários
- `max-w-4xl` (896px) - Páginas de detalhe
- `max-w-7xl` (1280px) - Layout geral

**Benefícios**:
- Classes `max-w-*` agora funcionam corretamente
- Consistência visual garantida entre features
- Desenvolvedores sabem exatamente qual valor usar

[📜 Ver changelog completo da v2.0.1 →](CHANGELOG.md#201---2025-01-13)

---

## 🌟 Destaques da v2.0.0 - MAJOR RELEASE

Esta versão implementa **refatoração completa do design system** introduzindo os **5 Princípios Premium** aplicados automaticamente:

### 🌟 5 Princípios Premium Integrados

Todos os componentes gerados agora saem "**Premium by Design**":

1. **Two-Layer Shadows** - Profundidade realista com inner + outer shadows
2. **Color Layering** - Hierarquia visual clara com 3-4 shades (Shade 1-4)
3. **Espaçamentos Premium** - Layout que "respira" (base 24px vs 16px genérico)
4. **Tipografia Hierárquica** - 5 níveis claros (Display, Heading, Body, Caption, Helper)
5. **Micro-interações** - Feedback visual instantâneo (hover, active, transitions 150-300ms)

### 📁 Nova Estrutura de Design System

- **`.claude/design-system/`** - Documentação completa dos 5 princípios
  - `principles.md`, `shadows.md`, `colors.md`, `responsive.md`, `typography.md`, `transitions.md`
- **`.claude/templates/`** - Templates premium reutilizáveis
  - Card, Button, ListView patterns com exemplos completos

### 🔄 Todos os Comandos Refatorados

- **`/design:init`** - Gera theme expandido com two-layer shadows e transitions
- **`/design:feature`** - Nova ETAPA 5 aplica princípios automaticamente antes de gerar
- **`/design:refine`** - 80% princípios premium + 20% MCP opcional
- **`/design:integrate`** - Sidebar e HomePage premium com todos os princípios

### 🎨 Filosofia: "Premium by Design, Refined by Choice"

Diferente da v1.x que gerava componentes básicos para depois refinar, **v2.0 já gera premium desde o início**.

[📜 Changelog completo →](../CHANGELOG.md)

---

## 📖 Visão Geral

Este processo transforma especificações markdown em protótipos navegáveis usando Next.js App Router, TypeScript, Shadcn/UI e Tailwind CSS.

### Filosofia

1. **Spec-Driven**: Todo output parte de especificações documentadas
2. **Visual-Only**: Gera APENAS estrutura visual (UI/UX), sem lógica de negócio
3. **Premium by Design**: Todos os componentes saem com os 5 princípios aplicados
4. **Modular**: Cada feature é autocontida e facilmente integrável
5. **Dark Mode First**: Suporte nativo a temas desde o início
6. **MCP-Powered**: Refinamento adicional com componentes avançados (opcional)

---

## 🚀 Quick Start

```bash
# 1. Instale o Next.js manualmente ANTES do init
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes

# 2. Inicializar projeto (apenas uma vez)
/design:init

# 3. IMPORTANTE: Após init, rodar para gerar contexto
/init

# 4. Criar spec de feature (ver template abaixo)
# Exemplo: specs/[feature-name].md

# 5. Gerar feature PREMIUM (com 5 princípios aplicados automaticamente)
/design:feature specs/[feature-name].md

# 6. 🆕 OPCIONAL: Refinar ainda mais (80% princípios + 20% MCP opcional)
/design:refine [feature-name]

# 7. Integrar sistema (após múltiplas features)
/design:integrate

# 8. Testar
npm run dev
```

---

## 📋 Comandos Disponíveis

### 🔄 Comandos de Manutenção

#### `/process-feedback`
Automatiza o processamento de feedback e atualização de documentação

**O que faz:**
- Lê e analisa `FEEDBACK.md`
- Implementa mudanças nos comandos de design
- Determina versão apropriada (Semantic Versioning)
- Atualiza `CHANGELOG.md` com nova entrada
- Atualiza `README.md` com nova versão
- Valida consistência entre documentos
- Gera relatório final

**Quando usar:**
- Após adicionar melhorias ao `FEEDBACK.md`
- Para garantir que CHANGELOG e README estejam sincronizados
- Para automatizar o processo de versionamento

**Uso:**
```bash
# 1. Atualize o FEEDBACK.md com as melhorias
# 2. Execute o comando
/process-feedback
```

---

### 🎨 Comandos de Design

### `/design:init [project-name]`
Inicializa projeto com sistema de design

⚠️ **PRÉ-REQUISITO**: Next.js deve estar instalado manualmente ANTES de rodar este comando.

**Como preparar:**
```bash
# 1. Instale o Next.js no diretório atual
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes

# 2. Execute o init
/design:init
```

**Por que manualmente?**
- Evita conflitos com arquivos existentes (`.claude/`, `.git/`, etc.)
- Você tem controle total sobre as flags (React Compiler, Turbopack, etc.)
- Mais flexível para diferentes ambientes

**🆕 Melhorias v2.0:**
- ⚡ **Coleta rápida**: Perguntas simultâneas via `AskUserQuestion`
- 🎨 **Tailwind v4**: Configuração via `@theme` no `globals.css`
- 🌟 **Theme premium**: Two-layer shadows system + transitions (150ms, 200ms, 300ms)

**O que faz:**
- **Valida** que o Next.js está corretamente instalado
- Configura Shadcn/UI + Tailwind v4
- Gera sistema de tema premium com two-layer shadows e transitions
- Gera tema com cores Tailwind ou custom (OKLCH)
- Configura dark mode nativo (next-themes)
- Instala lucide-react e next-themes
- Configura registries MCP (Aceternity, MagicUI, etc.)
- Lê `escopo.md` se existir para obter contexto
- Cria estrutura completa: `specs/`, `src/features/`, `src/theme/`, `.claude/design-system/`, `.claude/templates/`
- Gera documentação premium (design.md com 5 princípios v2.0)

**Uso:**
```bash
/design:init
```

---

### `/design:validate-spec <spec-path>`
Valida estrutura e completude de especificação

**O que valida:**
- Seções obrigatórias (Objetivo, Critérios, Campos, Cenários)
- Qualidade do conteúdo
- Detalhamento suficiente

**Uso:**
```bash
/design:validate-spec specs/[feature-name].md
```

---

### `/design:feature <spec-path>`
Gera módulo de feature PREMIUM completo

**🌟 Nova Arquitetura v2.0 - Premium by Design:**
```
src/
├── app/<feature-name>/         # ✅ Rotas Next.js (App Router)
│   ├── page.tsx                # Lista (com 5 princípios aplicados)
│   ├── new/page.tsx            # Criar (premium)
│   ├── [id]/page.tsx           # Detalhes (premium)
│   └── [id]/edit/page.tsx      # Editar (premium)
└── features/<feature-name>/    # ✅ Módulo autocontido
    ├── components/             # Componentes locais (premium)
    ├── types/                  # Types TypeScript
    └── utils/                  # Helpers
```

**O que gera (v2.0):**
- **Páginas premium** com 5 princípios aplicados automaticamente:
  1. Two-layer shadows (cards/buttons)
  2. Color layering (Shade 1-4 hierarchy)
  3. Espaçamentos premium (base 24px)
  4. Tipografia hierárquica (Display → Heading → Body)
  5. Micro-interações (hover/active/transitions)
- **Módulo** em `src/features/<feature-name>/` (componentes, types, utils)
- **Instala automaticamente** primitivos shadcn necessários via MCP
- **Lê templates premium** antes de gerar
- **Remove .gitkeep** automaticamente quando pastas são populadas
- Adiciona simulações básicas de CRUD com useState
- README.md de handoff com checklist premium

**Importante:**
- Usa Next.js **App Router** (NÃO React Router)
- Usa **APENAS lucide-react** para ícones
- Lê `escopo.md` para manter contexto do projeto
- 🌟 **Componentes saem premium by design** (não precisa refinar depois)
- 🆕 Separação clara: rotas (`app/`) vs lógica (`features/`)
- 🆕 `/components` só para globais (Shadcn primitives)

**Uso:**
```bash
/design:feature specs/[feature-name].md
```

---

### `/design:integrate`
Integra todas features em aplicação navegável PREMIUM

**🌟 O que gera (v2.0):**
- **Sidebar premium** com 5 princípios aplicados:
  - Two-layer shadow, color layering, spacing premium
  - Tipografia hierárquica, micro-interações
  - Gradient em nav items ativos
- **Layout global premium** (layout.tsx)
- **Homepage premium** com dashboard/grid de features
- Documentação de navegação (NAVIGATION.md)

**Uso:**
```bash
/design:integrate
```

---

### `/design:refine <feature-name>` 🎨 REFINAMENTO PREMIUM
Refina ainda mais features já premium (80% princípios + 20% MCP opcional)

**🌟 Melhorias v2.0 - Foco em Princípios Premium:**

Este comando agora aplica os 5 princípios premium (80% do trabalho) + componentes MCP opcionais (20%):

**Foco Principal (80%) - Aplicação dos 5 Princípios Premium**:
1. **Two-Layer Shadows**: Adiciona inner + outer shadows
2. **Color Layering**: Aplica Shade 1-4 hierarchy
3. **Espaçamentos Premium**: Ajusta para base 24px (gap-6, p-6)
4. **Tipografia Hierárquica**: Aplica 5 níveis (Display → Helper)
5. **Micro-interações**: Adiciona transitions e hover effects

**Componentes Avançados (20% - OPCIONAL)**:
6. **Pergunta ao usuário**: Se deseja componentes MCP adicionais
7. **Busca MCP**: Procura componentes nos registries se aprovado
8. **Apresentação**: Mostra nomes exatos para pesquisa manual
9. **Aprovação**: Aguarda confirmação do usuário antes de implementar
10. **Instalação**: Implementa APENAS componentes aprovados

**Exemplo de refinamento premium:**
```typescript
// ANTES: Card gerado pelo /design:feature (já premium, mas pode melhorar)
<Card className="shadow-md hover:shadow-lg">

// DEPOIS: Card refinado com two-layer shadows
<Card className="
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
  hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
  transition-shadow duration-300
">
```

**Workflow v2.0:**
1. Lê templates premium
2. Aplica 5 princípios premium automaticamente (80%)
3. Pergunta se usuário quer componentes MCP adicionais (20%)
4. Se sim, apresenta componentes com nomes exatos
5. Aguarda aprovação manual
6. Implementa apenas componentes aprovados

**Uso:**
```bash
/design:refine clientes
```

**Diferencial v2.0:**
- 🌟 Aplica os 5 princípios premium automaticamente (80%)
- ✅ Componentes MCP avançados são opcionais (20%)
- ✅ Lê templates premium antes de refinar
- ✅ Nomes exatos de componentes para pesquisa manual
- ✅ Sistema premium profissional adequado para venda a clientes

---

## 📝 Template de Spec

```markdown
# Feature: Nome da Feature

## Objetivo
Descrição clara do objetivo (1-3 parágrafos)

## Critérios de Aceitação

### Categoria 1
- [ ] Critério específico e testável 1
- [ ] Critério específico e testável 2

### Categoria 2
- [ ] Critério específico e testável 3

## Campos

| Campo | Tipo | Obrigatório | Validação | Descrição |
|-------|------|-------------|-----------|-----------|
| Nome Completo | String | Sim | Min 3, Max 200 | Nome completo do cliente |
| Email | String | Sim | Email válido | Email principal |

## Cenários de Uso

| ID | Cenário | Input | Output Esperado |
|----|---------|-------|-----------------|
| 01 | Cadastro bem-sucedido | Dados válidos | Cliente cadastrado |
| 02 | Email duplicado | Email existente | Erro de validação |
```

---

## 🗂️ Estrutura do Projeto

**🌟 Nova Arquitetura v2.0 - Premium by Design:**

```
my-project/
├── .claude/
│   ├── commands/design/        # Comandos do processo (v2.0)
│   ├── design-system/          # 🆕 5 Princípios Premium
│   │   ├── principles.md       # Filosofia central
│   │   ├── shadows.md          # Two-layer shadows
│   │   ├── colors.md           # Color layering
│   │   ├── responsive.md       # Espaçamentos premium
│   │   ├── typography.md       # Hierarquia tipográfica
│   │   └── transitions.md      # Micro-interações
│   ├── templates/              # 🆕 Templates Premium
│   │   ├── components/         # Card, Button patterns
│   │   ├── pages/              # ListView patterns
│   │   └── README.md           # Documentação templates
│   ├── docs/                   # Documentações complementares
│   ├── specs/                  # Specs de exemplo
│   ├── CHANGELOG.md            # Histórico de mudanças
│   └── README.md               # Esta documentação
├── src/
│   ├── app/                    # 🆕 ROTAS Next.js (App Router)
│   │   ├── layout.tsx          # Layout global com ThemeProvider
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # 🆕 Tailwind v4 (@theme)
│   │   └── <feature-name>/     # Páginas da feature
│   │       ├── page.tsx        # Lista
│   │       ├── new/page.tsx    # Criar
│   │       ├── [id]/page.tsx   # Detalhes
│   │       └── [id]/edit/page.tsx # Editar
│   ├── features/               # 🆕 MÓDULOS DAS FEATURES
│   │   └── <feature-name>/     # Feature autocontida
│   │       ├── components/     # Componentes locais
│   │       ├── types/          # Types específicos
│   │       └── utils/          # Helpers
│   ├── components/             # 🆕 APENAS GLOBAIS
│   │   ├── ui/                 # Primitivos Shadcn
│   │   ├── theme-provider.tsx  # Provider de tema
│   │   └── mode-toggle.tsx     # Toggle dark/light
│   └── theme/
│       └── config.ts           # Tokens de design (TypeScript)
├── specs/                      # Especificações de features
├── components.json             # Config Shadcn + registries
└── design.md                   # Documentação do design system
```

**Separação clara:**
- `app/` → Rotas Next.js (file-based routing)
- `features/` → Módulos autocontidos (components + types + utils)
- `components/` → Apenas componentes globais e primitivos Shadcn

---

## 🎨 Sistema de Cores

O sistema usa cores no formato de **tokens Tailwind CSS** ou valores customizados em **OKLCH** para melhor suporte a dark mode.

**Opções:**
1. **Cores Tailwind**: blue, purple, emerald, slate, etc.
2. **Custom**: Hex (#2563eb) ou OKLCH (oklch(0.55 0.15 250))

---

## 🌙 Dark Mode

Dark mode vem **nativo** usando `next-themes`:
- ThemeProvider configurado no layout raiz
- ModeToggle no Layout (adicionado por /design:integrate)
- Classes `dark:` nos componentes
- Suporte a "light", "dark" e "system"

---

## 📚 Documentações Complementares

- **`.claude/docs/dark.md`** - Configuração de dark mode
- **`.claude/docs/shad-mcp.md`** - Uso do MCP Server shadcn
- **`.claude/docs/slash-commands.md`** - Referência de comandos
- **`.claude/docs/commit.md`** - Convenções de commit

---

## 🔧 Stack Tecnológica

- **Framework**: Next.js 16+ (App Router)
- **Linguagem**: TypeScript
- **Componentes**: Shadcn/UI + 7 registries via MCP
- **Estilização**: 🆕 Tailwind CSS v4 (config via `@theme` no CSS)
- **Temas**: next-themes
- **Ícones**: Lucide React (exclusivo)

---

## 🤝 Handoff para Desenvolvimento

Cada feature gerada vem com:

1. **README.md** - Guia completo com checklist de implementação
2. **Types** - Interfaces TypeScript para criar schemas Zod
3. **Código visual** - Estrutura pronta para adicionar lógica

**Prioridades de implementação:**
- **Alta**: API integration, validação, gerenciamento de estado
- **Média**: UX enhancements, feedback ao usuário
- **Baixa**: Funcionalidades avançadas, testes, otimizações

---

## 🐛 Troubleshooting

### "Feature não encontrada" ao integrar
**Solução**: Gere pelo menos uma feature antes de executar `/design:integrate`

### Spec rejeitado ao validar
**Solução**: Complete seções obrigatórias e valide novamente

### Componentes MCP não encontrados
**Solução**: Configure MCP Server:
```bash
npx shadcn@latest mcp init --client claude
```

### Tema não aplicado
**Solução**: Verifique imports em `tailwind.config.ts` e alias `@` em `tsconfig.json`

---


## 💡 Casos de Uso

### Sistema de Gestão (exemplo: Classe A Locadora)
- 5 features: Clientes, Veículos, Reservas, Contratos, Check-in/out
- Tempo: ~3 horas (vs. semanas manualmente)
- Resultado: Protótipo completo navegável para validação

### E-commerce
- 5 features: Catálogo, Carrinho, Checkout, Pedidos, Perfil
- Diferencial: Refinamento visual com @magicui e @aceternity
- Benefício: Validação rápida de UX antes de desenvolver

---

## ⚠️ Princípios Inegociáveis

### ✅ FAZER:
- Ler specs completamente antes de gerar
- Usar App Router do Next.js (NÃO React Router)
- Aplicar tokens do tema consistentemente
- Instalar primitivos shadcn necessários via MCP
- Usar APENAS lucide-react para ícones
- Adicionar classes `dark:` para dark mode
- Simular funcionalidades básicas (filtros, loading)

### ❌ NÃO FAZER:
- Criar lógica de negócio
- Adicionar validações (Zod, Yup)
- Fazer chamadas de API reais
- Gerenciar estado complexo (além de simulações)
- Usar react-icons
- Criar projeto em subpasta (usar diretório atual)

---

## 📞 Suporte

**Dúvidas sobre o processo?**
- Consulte esta documentação
- Revise arquivos em `.claude/docs/`
- Execute `/help` no Claude Code

**Bugs ou melhorias?**
- Documente no FEEDBACK.md
- Atualize comandos conforme necessário
- Mantenha changelog sincronizado

---

**Versão**: 2.0.1
**Última atualização**: 2025-01-13
**Status**: ✅ Pronto para uso
**Mantido por**: Processo de design automatizado

[📜 Ver histórico completo de mudanças →](../CHANGELOG.md)
