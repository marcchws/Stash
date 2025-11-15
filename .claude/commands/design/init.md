---
allowed-tools: Bash, Write, Read, Edit, Glob
description: Inicializa projeto com sistema de design e workflow automatizado
argument-hint: [project-name]
---

# Comando: /design:init - Inicialização de Projeto de Design

Você é o arquiteto responsável por **inicializar um novo projeto de design automatizado**. Este comando configura toda a infraestrutura necessária para o workflow Spec-Driven de geração de protótipos visuais.

---

## 🎯 Objetivo

Criar um ambiente completo para design automatizado que inclui:
1. **Sistema de Design** - Identidade visual consistente (tema, cores, tipografia)
2. **Infraestrutura Técnica** - Next.js + Shadcn/UI + Tailwind CSS
3. **Estrutura de Diretórios** - Organização modular e previsível
4. **Workflow Commands** - Comandos para geração e integração de features

---

## ⚠️ PRÉ-REQUISITOS

**IMPORTANTE**: Este comando deve ser executado em um projeto Next.js **já instalado**.

### Como preparar o ambiente:

```bash
# 1. Crie/navegue para o diretório do projeto
mkdir meu-projeto && cd meu-projeto

# 2. Instale o Next.js manualmente
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes

# 3. Execute este comando
/design:init
```

**Por que manualmente?**
- Evita conflitos com arquivos existentes (.claude, .git, etc.)
- Você tem controle total sobre as flags do create-next-app
- Mais flexível para diferentes ambientes e preferências

---

## 📋 Workflow de Execução

### ETAPA 1: Validação de Ambiente

Antes de começar, valide que o projeto Next.js está corretamente instalado:

1. **Verificar arquivos essenciais do Next.js**:
   - `package.json` existe e contém "next" nas dependências
   - `next.config.js` ou `next.config.mjs` ou `next.config.ts` existe
   - Pasta `src/` existe (já que usamos --src-dir)
   - Pasta `src/app/` existe (App Router)

2. **Se alguma validação falhar**:
   - Informar o usuário claramente que o Next.js não está instalado
   - Mostrar as instruções de instalação (do pré-requisito acima)
   - **PARAR a execução imediatamente**

3. **Se tudo estiver ok**:
   - Confirmar que o projeto Next.js foi detectado
   - Prosseguir para a coleta de informações

---

### ETAPA 2: Coleta de Informações do Projeto

**IMPORTANTE**: Antes de começar, verifique se existe o arquivo `escopo.md` no diretório atual. Se existir, leia-o para obter contexto sobre o projeto. Use as informações do escopo para preencher dados automaticamente quando possível.

Use o tool `AskUserQuestion` para fazer todas as perguntas de design **de uma só vez** ao usuário:

```typescript
AskUserQuestion({
  questions: [
    {
      question: "Qual paleta de cores você deseja usar para o projeto?",
      header: "Cores",
      multiSelect: false,
      options: [
        {
          label: "Zinc (neutro moderno)",
          description: "Cinza neutro profissional e moderno - ideal para dashboards e apps corporativos"
        },
        {
          label: "Blue (confiável)",
          description: "Azul clássico que transmite confiança - ideal para SaaS e fintech"
        },
        {
          label: "Purple (criativo)",
          description: "Roxo vibrante e criativo - ideal para apps de criatividade e produtividade"
        },
        {
          label: "Emerald (crescimento)",
          description: "Verde esmeralda que representa crescimento - ideal para health e sustentabilidade"
        }
      ]
    },
    {
      question: "Qual tipografia você prefere?",
      header: "Tipografia",
      multiSelect: false,
      options: [
        {
          label: "Inter",
          description: "Moderna e legível - design limpo e altamente profissional"
        },
        {
          label: "Poppins",
          description: "Geométrica e amigável - versátil para diferentes contextos"
        },
        {
          label: "Outfit",
          description: "Contemporânea e arredondada - acessível e moderna"
        },
        {
          label: "System Font",
          description: "Nativa do sistema - performance otimizada"
        }
      ]
    },
    {
      question: "Qual estilo visual você quer para o sistema?",
      header: "Estilo",
      multiSelect: false,
      options: [
        {
          label: "Modern Minimalist",
          description: "Bordas sutis, sombras leves, espaçamento generoso - limpo e focado"
        },
        {
          label: "Bold & Vibrant",
          description: "Bordas pronunciadas, sombras marcadas - energético e vibrante"
        },
        {
          label: "Classic Elegant",
          description: "Bordas mínimas, sombras discretas - elegante e atemporal"
        }
      ]
    }
  ]
})
```

**Após receber as respostas**:
1. Armazene as escolhas do usuário
2. Se precisar de informações básicas (nome/descrição do projeto), pergunte separadamente
3. Prossiga para a próxima etapa

---

### ETAPA 3: Instalação do Shadcn/UI

Execute os seguintes passos:

#### 3.1 Instalar Shadcn/UI

```bash
npx shadcn@latest init -d
```

Configure com as seguintes respostas:
- TypeScript: Yes
- Style: New York
- Base color: Slate
- CSS variables: Yes

#### 3.2 Instalar dependências adicionais

```bash
npm install lucide-react next-themes
```

**Nota**:
- `lucide-react` - Biblioteca de ícones (uso exclusivo, não usar react-icons)
- `next-themes` - Suporte nativo a dark mode

---

### ETAPA 4: Configuração de Dark Mode

**IMPORTANTE**: O projeto deve vir preparado para dark mode desde o início.

Siga as instruções em `.claude/docs/dark.md` para configurar o dark mode nativo:

#### 4.1 Criar Theme Provider

Crie o arquivo `src/components/theme-provider.tsx`:

```tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

#### 4.2 Criar Mode Toggle

Crie o arquivo `src/components/mode-toggle.tsx`:

```tsx
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

**Nota**: O ModeToggle será adicionado ao Layout na etapa de integração (`/design:integrate`).

---

### ETAPA 5: Criação da Estrutura de Diretórios

Crie a seguinte estrutura dentro do projeto:

```
$PROJECT_NAME/
├── specs/
│   └── .gitkeep
├── src/
│   ├── features/
│   │   └── .gitkeep
│   ├── components/
│   │   └── .gitkeep
│   ├── navigation/
│   │   └── .gitkeep
│   └── theme/
│       └── .gitkeep
```

Use o comando:

```bash
mkdir -p specs src/features src/components src/navigation src/theme
touch specs/.gitkeep src/features/.gitkeep src/components/.gitkeep src/navigation/.gitkeep src/theme/.gitkeep
```

---

### ETAPA 6: Geração do Sistema de Tema

#### 6.1 Criar arquivo de configuração de tema

Crie o arquivo `src/theme/config.ts` com o seguinte conteúdo (adaptado às escolhas do usuário):

```typescript
/**
 * Design System Configuration
 *
 * Este arquivo centraliza todos os tokens de design do projeto.
 * Gerado automaticamente pelo comando /design:init
 *
 * Projeto: $PROJECT_NAME
 * Paleta: $PALETTE_NAME
 * Tipografia: $FONT_NAME
 * Estilo: $STYLE_NAME
 */

export const theme = {
  colors: {
    primary: {
      main: '$PRIMARY_COLOR',
      light: '$PRIMARY_LIGHT', // Calcule uma versão 20% mais clara
      dark: '$PRIMARY_DARK',   // Calcule uma versão 20% mais escura
    },
    secondary: {
      main: '$SECONDARY_COLOR',
      light: '$SECONDARY_LIGHT',
      dark: '$SECONDARY_DARK',
    },
    accent: {
      main: '$ACCENT_COLOR',
      light: '$ACCENT_LIGHT',
      dark: '$ACCENT_DARK',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  typography: {
    fontFamily: {
      primary: '$FONT_FAMILY',
      mono: 'Fira Code, Consolas, Monaco, monospace',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  maxWidth: {
    // Containers de conteúdo
    prose: '65ch',        // ~65 caracteres (ideal para leitura)
    '2xl': '42rem',       // 672px (formulários, textos médios)
    '3xl': '48rem',       // 768px
    '4xl': '56rem',       // 896px (páginas de detalhe)
    '5xl': '64rem',       // 1024px
    '6xl': '72rem',       // 1152px
    '7xl': '80rem',       // 1280px (layout geral)
  },
  borderRadius: {
    none: '0',
    sm: '$BORDER_RADIUS_SM',    // Baseado no estilo escolhido
    md: '$BORDER_RADIUS_MD',
    lg: '$BORDER_RADIUS_LG',
    full: '9999px',
  },
  shadows: {
    // Two-Layer Shadows System (v2.0.0)
    sm: {
      outer: '$SHADOW_SM',
      inner: 'inset 0 1px 0 rgba(255,255,255,0.1)',
      combined: 'inset 0 1px 0 rgba(255,255,255,0.1), $SHADOW_SM'
    },
    md: {
      outer: '$SHADOW_MD',
      inner: 'inset 0 1px 0 rgba(255,255,255,0.15)',
      combined: 'inset 0 1px 0 rgba(255,255,255,0.15), $SHADOW_MD'
    },
    lg: {
      outer: '$SHADOW_LG',
      inner: 'inset 0 2px 0 rgba(255,255,255,0.2)',
      combined: 'inset 0 2px 0 rgba(255,255,255,0.2), $SHADOW_LG'
    },
    xl: {
      outer: '$SHADOW_XL',
      inner: 'inset 0 2px 0 rgba(255,255,255,0.25)',
      combined: 'inset 0 2px 0 rgba(255,255,255,0.25), $SHADOW_XL'
    },
  },
  transitions: {
    // Micro-interactions System (v2.0.0)
    fast: {
      duration: '150ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    base: {
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    slow: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
  },
} as const;

export type Theme = typeof theme;
```

**Importante**: Substitua todos os placeholders `$VARIABLE` com os valores reais baseados nas escolhas do usuário.

**Cálculo de cores light/dark**:
- Light: Aumente a luminosidade em 20%
- Dark: Diminua a luminosidade em 20%

Use a biblioteca `color` se necessário: `npm install color @types/color`

#### 6.2 Configurar Tailwind v4 no globals.css

**IMPORTANTE**: Tailwind CSS v4 não usa mais `tailwind.config.ts`. O tema é configurado diretamente no `globals.css` usando a diretiva `@theme`.

Edite o arquivo `src/app/globals.css` para incluir o tema:

```css
@import "tailwindcss";

/* Configuração do tema usando Tailwind v4 */
@theme {
  /* Cores Principais */
  --color-primary: $PRIMARY_COLOR;
  --color-primary-light: $PRIMARY_LIGHT;
  --color-primary-dark: $PRIMARY_DARK;

  --color-secondary: $SECONDARY_COLOR;
  --color-secondary-light: $SECONDARY_LIGHT;
  --color-secondary-dark: $SECONDARY_DARK;

  --color-accent: $ACCENT_COLOR;
  --color-accent-light: $ACCENT_LIGHT;
  --color-accent-dark: $ACCENT_DARK;

  /* Cores Neutras */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;

  /* Cores Semânticas */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Tipografia */
  --font-family-sans: $FONT_FAMILY, sans-serif;
  --font-family-mono: 'Fira Code', 'Consolas', 'Monaco', monospace;

  /* Tamanhos de Fonte */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;

  /* Espaçamento */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;

  /* Max-Width (Containers de Conteúdo) */
  --max-width-prose: 65ch;      /* ~65 caracteres - ideal para leitura */
  --max-width-2xl: 42rem;       /* 672px - formulários, textos médios */
  --max-width-3xl: 48rem;       /* 768px */
  --max-width-4xl: 56rem;       /* 896px - páginas de detalhe */
  --max-width-5xl: 64rem;       /* 1024px */
  --max-width-6xl: 72rem;       /* 1152px */
  --max-width-7xl: 80rem;       /* 1280px - layout geral */

  /* Border Radius (baseado no estilo escolhido) */
  --radius-sm: $BORDER_RADIUS_SM;
  --radius-md: $BORDER_RADIUS_MD;
  --radius-lg: $BORDER_RADIUS_LG;
  --radius-full: 9999px;

  /* Sombras (baseado no estilo escolhido) */
  --shadow-sm: $SHADOW_SM;
  --shadow-md: $SHADOW_MD;
  --shadow-lg: $SHADOW_LG;
  --shadow-xl: $SHADOW_XL;
}

/* Variáveis CSS para Shadcn UI */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: $PRIMARY_HSL;
    --primary-foreground: 0 0% 98%;
    --secondary: $SECONDARY_HSL;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: $ACCENT_HSL;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: $PRIMARY_HSL;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: $PRIMARY_HSL_DARK;
    --primary-foreground: 0 0% 9%;
    --secondary: $SECONDARY_HSL_DARK;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: $ACCENT_HSL_DARK;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: $PRIMARY_HSL_DARK;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Placeholders a substituir**:
- `$PRIMARY_COLOR`, `$SECONDARY_COLOR`, `$ACCENT_COLOR` - Cores em formato OKLCH ou hex
- `$PRIMARY_HSL`, `$SECONDARY_HSL`, `$ACCENT_HSL` - Cores convertidas para HSL (para Shadcn)
- `$PRIMARY_HSL_DARK` - Versões dark das cores
- `$FONT_FAMILY` - Nome da fonte escolhida
- `$BORDER_RADIUS_*`, `$SHADOW_*` - Valores baseados no estilo escolhido

**Conversão de cores para HSL**:
Use a biblioteca `color` para converter hex/oklch para HSL:
```typescript
import Color from 'color';
const primaryHSL = Color('#2563eb').hsl().string(); // "hsl(217, 91%, 60%)"
// Extraia apenas os valores: "217 91% 60%"
```

---

### ETAPA 7: Configuração de Registries (MCP)

#### 7.1 Atualizar components.json

Edite `components.json` para adicionar os registries adicionais:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@aceternity": "https://api.aceternity.com/registry/{name}.json",
    "@magicui": "https://registry.magicui.design/{name}.json",
    "@kokonutui": "https://registry.kokonutui.com/{name}.json",
    "@cult-ui": "https://registry.cult-ui.com/{name}.json",
    "@motion-primitives": "https://registry.motion-primitives.com/{name}.json",
    "@blocks": "https://registry.blocks.so/{name}.json",
    "@nativeui": "https://registry.nativeui.io/{name}.json"
  }
}
```

**Nota**: Com Tailwind v4, removemos a referência `"config": "tailwind.config.ts"` pois o tema é configurado diretamente no `globals.css`.

#### 7.2 Configurar MCP Server (Shadcn)

Se ainda não estiver configurado, crie `.mcp.json` na raiz do projeto:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

---

### ETAPA 8: Criação do App Base

#### 8.1 Criar layout raiz

Crie/edite `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { $FONT_IMPORT } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const fontPrimary = $FONT_CONSTRUCTOR({
  subsets: ["latin"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "$PROJECT_NAME",
  description: "$PROJECT_DESCRIPTION",
};

export default function RootLayout({
  children,
}: {
  children: React.NodeNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${fontPrimary.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Nota**: Adapte `$FONT_IMPORT` e `$FONT_CONSTRUCTOR` baseado na escolha do usuário.

Exemplos:
- Inter: `import { Inter } from "next/font/google";` e `const fontPrimary = Inter({...});`
- Poppins: `import { Poppins } from "next/font/google";` e ajuste pesos
- Outfit: `import { Outfit } from "next/font/google";`

#### 8.2 Criar página inicial provisória

Crie `src/app/page.tsx`:

```tsx
import { theme } from "@/theme/config";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <h1
          className="text-5xl font-bold"
          style={{ color: theme.colors.primary.main }}
        >
          $PROJECT_NAME
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl">
          $PROJECT_DESCRIPTION
        </p>
        <div className="pt-4">
          <p className="text-sm text-neutral-500">
            ✅ Projeto inicializado com sucesso!
          </p>
          <p className="text-sm text-neutral-500 mt-2">
            Use <code className="bg-neutral-200 px-2 py-1 rounded">/design:feature &lt;spec-path&gt;</code> para gerar features
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

### ETAPA 9: Documentação do Projeto

#### 9.1 Criar design.md

Crie o arquivo `design.md` na raiz do projeto com a documentação do sistema de design:

```markdown
# $PROJECT_NAME - Sistema de Design

> Documentação gerada automaticamente pelo comando /design:init

---

## 📐 Identidade Visual

### Paleta de Cores

**Primária**: $PRIMARY_COLOR ($PALETTE_NAME)
**Secundária**: $SECONDARY_COLOR
**Destaque**: $ACCENT_COLOR

### Tipografia

**Fonte Principal**: $FONT_NAME
**Estilo**: $STYLE_NAME

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

### 1. [Profundidade Visual](./.claude/design-system/shadows.md)
- **Two-Layer Shadows**: Sombras compostas (inner + outer)
- **Color Layering**: 3-4 shades para criar hierarquia visual

### 2. [Sistema de Cores](./.claude/design-system/colors.md)
- **Regra 60-30-10**: Neutral (60%), Secondary (30%), Primary (10%)
- **Color Scales**: 8-10 shades por cor

### 3. [Responsividade](./.claude/design-system/responsive.md)
- **Mobile-First**: Sempre começar com mobile
- **Espaçamentos Premium**: Base de 24px (gap-6, p-6)

### 4. [Tipografia](./.claude/design-system/typography.md)
- **Hierarquia Clara**: 5 níveis (Display, Heading, Body, Caption, Helper)
- **Legibilidade Otimizada**: Leading relaxed, tracking tight

### 5. [Micro-interações](./.claude/design-system/transitions.md)
- **Transições Suaves**: 150-300ms com feedback visual
- **Hover Effects**: Scale, shadow, color changes

**Documentação Completa**: Veja `.claude/design-system/principles.md` para guias detalhados.

---

## 📂 Estrutura de Diretórios

```
$PROJECT_NAME/
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

Use o comando `/mcp` no Claude Code para explorar e instalar componentes.

---

## 🔧 Tecnologias

- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Componentes**: Shadcn/UI + Registries adicionais
- **Roteamento**: React Router DOM
- **Icons**: Lucide React

---

Gerado em: $DATE
```

Substitua todos os placeholders `$VARIABLE` com valores reais.

---

### ETAPA 10: Mensagem de Conclusão

Após completar todas as etapas, exiba uma mensagem de sucesso formatada:

```
✅ Projeto "$PROJECT_NAME" inicializado com sucesso! (v2.0.0)

📐 Sistema de Design Configurado:
   • Paleta: $PALETTE_NAME
   • Tipografia: $FONT_NAME
   • Estilo: $STYLE_NAME

🌟 Princípios UI/UX Premium (v2.0.0):
   • Two-Layer Shadows (profundidade visual)
   • Color Layering (hierarquia de 3-4 shades)
   • Espaçamentos Premium (base 24px)
   • Tipografia Hierárquica (5 níveis)
   • Micro-interações (feedback 200-300ms)

📂 Estrutura de Diretórios Criada:
   • specs/ - Para especificações de features
   • src/features/ - Para módulos de features gerados
   • src/theme/ - Sistema de design centralizado
   • .claude/design-system/ - Documentação dos 5 princípios premium
   • .claude/templates/ - Padrões reutilizáveis

🎨 Tema Integrado:
   • src/theme/config.ts - Tokens expandidos (shadows two-layer, transitions)
   • globals.css - Variáveis CSS v4

🔧 Registries MCP Configurados:
   • shadcn/ui (padrão)
   • +7 registries adicionais (Aceternity, MagicUI, etc.)

📚 Documentação Gerada:
   • design.md - Guia completo do sistema de design (com princípios v2.0.0)
   • .claude/design-system/principles.md - Filosofia Premium by Design

🚀 Próximos Passos:

   1. IMPORTANTE: Execute /init para que o Claude analise o projeto e gere o claude.md
      Isso garantirá que o contexto do projeto esteja disponível para todos os comandos

   2. Crie specs de features em specs/

   3. Execute: /design:feature specs/<nome>.md

   4. Integre tudo: /design:integrate

Para testar o projeto:
   npm run dev
   Acesse: http://localhost:3000
```

---

## 🔒 Princípios Inegociáveis

Durante toda a execução, você DEVE:

✅ **FAZER**:
- Perguntar interativamente e esperar respostas do usuário
- Validar todas as escolhas antes de prosseguir
- Gerar código limpo, bem comentado e organizado
- Usar os tokens de tema de forma consistente
- Criar documentação clara e completa
- Informar cada etapa antes de executá-la

❌ **NÃO FAZER**:
- Assumir valores sem perguntar ao usuário
- Pular etapas de validação
- Gerar código com lógica de negócio
- Criar arquivos fora da estrutura definida
- Continuar se houver erros não resolvidos

---

## 📝 Notas Técnicas

### Instalação de Fontes do Google Fonts

Para fontes customizadas do Google Fonts, use o pacote `next/font/google`:

```typescript
import { Inter, Poppins, Outfit } from "next/font/google";

// Configuração específica por fonte
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins"
});
```

### Cálculo de Variações de Cor

Use a biblioteca `color` para calcular variações light/dark:

```typescript
import Color from "color";

const primary = Color("#2563eb");
const primaryLight = primary.lighten(0.2).hex();
const primaryDark = primary.darken(0.2).hex();
```

### Mapeamento de Estilos para Valores

**Modern Minimalist**:
- borderRadius: { sm: "0.25rem", md: "0.375rem", lg: "0.5rem" }
- shadows: { sm: "0 1px 2px rgba(0,0,0,0.05)", md: "0 4px 6px rgba(0,0,0,0.07)", lg: "0 10px 15px rgba(0,0,0,0.1)", xl: "0 20px 25px rgba(0,0,0,0.15)" }

**Bold & Vibrant**:
- borderRadius: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem" }
- shadows: { sm: "0 2px 4px rgba(0,0,0,0.1)", md: "0 8px 12px rgba(0,0,0,0.15)", lg: "0 16px 24px rgba(0,0,0,0.2)", xl: "0 24px 32px rgba(0,0,0,0.25)" }

**Classic Elegant**:
- borderRadius: { sm: "0.125rem", md: "0.25rem", lg: "0.375rem" }
- shadows: { sm: "0 1px 2px rgba(0,0,0,0.03)", md: "0 2px 4px rgba(0,0,0,0.05)", lg: "0 4px 8px rgba(0,0,0,0.08)", xl: "0 8px 16px rgba(0,0,0,0.12)" }

---

Boa sorte com a inicialização! 🚀
