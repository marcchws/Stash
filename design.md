# Stash - Sistema de Design

> Documentação gerada automaticamente pelo comando /design:init

---

## 📐 Identidade Visual

### Paleta de Cores

**Primária**: Blue 600 (#2563eb) - Blue (confiável)
**Secundária**: Slate 500 (#64748b)
**Destaque**: Sky 500 (#0ea5e9)

### Tipografia

**Fonte Principal**: Poppins
**Estilo**: Bold & Vibrant

---

## 🎨 Tokens de Design

Todos os tokens de design estão centralizados em `src/theme/config.ts`.

### Como usar nos componentes:

```tsx
import { theme } from "@/theme/config";

// Usando cores
<div style={{ color: theme.colors.primary.main }}>...</div>

// Usando com Tailwind (configurado automaticamente)
<div className="text-primary bg-secondary">...</div>

// Usando shadows premium (two-layer)
<Card className="shadow-[${theme.shadows.md.combined}]">

// Usando transitions
<Button className="transition-all duration-200">
```

---

## 📏 Sistema de Max-Width (Containers)

Valores padronizados para limitar largura de conteúdo:

- `max-w-prose`: 65ch (~65 caracteres) - **Ideal para textos longos**
- `max-w-2xl`: 42rem (672px) - **Formulários e textos médios**
- `max-w-3xl`: 48rem (768px)
- `max-w-4xl`: 56rem (896px) - **Páginas de detalhe**
- `max-w-5xl`: 64rem (1024px)
- `max-w-6xl`: 72rem (1152px)
- `max-w-7xl`: 80rem (1280px) - **Layout geral**

**Recomendação**:
- Textos descritivos: `max-w-prose` ou `max-w-2xl`
- Formulários: `max-w-2xl`
- Páginas de conteúdo: `max-w-4xl mx-auto`
- Layout geral: `max-w-7xl mx-auto`

---

## 🌟 Princípios UI/UX Premium (v2.0.0)

Este projeto aplica **5 princípios fundamentais** de design premium em todos os componentes:

### 1. Profundidade Visual
- **Two-Layer Shadows**: Sombras compostas (inner + outer) para criar sensação de elevação
- **Color Layering**: 3-4 shades para criar hierarquia visual
- Exemplo: `shadow-[${theme.shadows.md.combined}]`

### 2. Sistema de Cores
- **Regra 60-30-10**: Neutral (60%), Secondary (30%), Primary (10%)
- **Color Scales**: Paleta completa com 8-10 shades por cor
- Primary: Blue 600 (#2563eb) - confiança e profissionalismo
- Accent: Sky 500 (#0ea5e9) - destaque e energia

### 3. Responsividade
- **Mobile-First**: Sempre começar com mobile
- **Espaçamentos Premium**: Base de 24px (gap-6, p-6)
- **Breakpoints**: sm: 640px, md: 768px, lg: 1024px, xl: 1280px

### 4. Tipografia
- **Hierarquia Clara**: 5 níveis de texto (Display, Heading, Body, Caption, Helper)
- **Legibilidade Otimizada**: Leading relaxed (1.75), tracking tight
- **Fonte**: Poppins (geométrica e amigável)

### 5. Micro-interações
- **Transições Suaves**: 150-300ms com feedback visual
- **Hover Effects**: Scale, shadow, color changes
- **Fast**: 150ms (hover), **Base**: 200ms (padrão), **Slow**: 300ms (modais)

---

## 📂 Estrutura de Diretórios

```
stash/
├── specs/              # Especificações de features (.md)
├── src/
│   ├── app/           # App Router do Next.js
│   ├── features/      # Módulos de features (gerados por /design:feature)
│   ├── components/    # Componentes globais (Layout, Sidebar, etc.)
│   ├── navigation/    # Configuração de rotas
│   └── theme/         # Configuração do sistema de design
├── components.json    # Configuração Shadcn + Registries
└── design.md         # Esta documentação
```

---

## 🚀 Próximos Passos

### 1. Criar Specs de Features

Crie arquivos `.md` na pasta `specs/` seguindo o template:

```markdown
# Feature: Nome da Feature

## Objetivo
Descrição clara do objetivo da feature

## Critérios de Aceitação
- [ ] Critério 1
- [ ] Critério 2

## Campos
| Campo | Descrição |
|-------|-----------|
| ...   | ...       |

## Cenários de Uso
| ID | Cenário | Input | Output Esperado |
|----|---------|-------|-----------------|
| ...| ...     | ...   | ...             |
```

### 2. Gerar Features

Execute:

```bash
/design:feature specs/<nome-da-feature>.md
```

### 3. Integrar Sistema

Após gerar várias features, integre tudo:

```bash
/design:integrate
```

### 4. Refinar Visualmente (Opcional)

Use componentes avançados via MCP:

```bash
/design:refine <nome-da-feature>
```

---

## 🎯 Filosofia: Visual-Only

**IMPORTANTE**: Este sistema gera APENAS a estrutura visual (UI/UX).

❌ **NÃO é gerado**:
- Validações de formulário (Zod)
- Gerenciamento de estado (useState, Zustand)
- Chamadas de API (fetch, React Query)
- Lógica de negócio

✅ **É gerado**:
- Componentes React/TSX estáticos
- Estrutura visual fiel ao design system
- Navegação entre telas
- Layout e composição
- Estilização consistente

O código gerado serve como **protótipo de alta fidelidade** para validação de UX e como **fonte da verdade visual** para o time de desenvolvimento implementar a lógica.

---

## 📚 Registries Disponíveis

Este projeto está configurado para usar múltiplos registries de componentes via MCP:

- **shadcn/ui** (padrão) - Componentes base
- **@aceternity** - Componentes com animações sofisticadas
- **@magicui** - Componentes mágicos e interativos
- **@kokonutui** - Componentes modernos e versáteis
- **@cult-ui** - Componentes cult e estilosos
- **@motion-primitives** - Primitivas de animação
- **@blocks** - Blocos de layout prontos
- **@nativeui** - Componentes nativos

Use o MCP do Shadcn para explorar e instalar componentes.

---

## 🔧 Tecnologias

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Componentes**: Shadcn/UI + Registries adicionais
- **Ícones**: Lucide React
- **Temas**: next-themes (dark mode nativo)

---

## 🎨 Especificações do Estilo Bold & Vibrant

### Border Radius
- `sm`: 0.375rem (6px) - Elementos pequenos
- `md`: 0.5rem (8px) - Padrão
- `lg`: 0.75rem (12px) - Cards e containers
- `full`: 9999px - Badges e pills

### Shadows (Two-Layer System)
- `sm`: outer: `0 2px 4px rgba(0,0,0,0.1)` + inner highlight
- `md`: outer: `0 8px 12px rgba(0,0,0,0.15)` + inner highlight (padrão)
- `lg`: outer: `0 16px 24px rgba(0,0,0,0.2)` + inner highlight
- `xl`: outer: `0 24px 32px rgba(0,0,0,0.25)` + inner highlight

### Cores

#### Light Mode
- Background: White (#ffffff)
- Foreground: Almost Black (#171717)
- Primary: Blue 600 (#2563eb)
- Secondary: Slate 500 (#64748b)
- Accent: Sky 500 (#0ea5e9)

#### Dark Mode
- Background: Almost Black (#171717)
- Foreground: Almost White (#fafafa)
- Primary: Blue 500 (#3b82f6) - Mais claro para contraste
- Secondary: Slate 400 (#94a3b8) - Mais claro para contraste
- Accent: Sky 400 (#38bdf8) - Mais claro para contraste

---

Gerado em: 2025-11-15
