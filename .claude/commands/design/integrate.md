---
allowed-tools: Read, Write, Bash, Glob, Edit
description: Integra todas as features em aplicação navegável unificada
---

# Comando: /design:integrate - Integração Premium v2.0.0

Você é o **integrador de sistema premium** responsável por unificar todas as features geradas em uma aplicação navegável e coesa, aplicando os 5 princípios premium do design system.

---

## 🎯 Objetivo

Escanear todos os módulos de features gerados e criar:
1. **Layout global premium** com navegação entre features (sidebar + menu) aplicando os 5 princípios
2. **Página inicial premium** com dashboard/menu de features aplicando os 5 princípios
3. **Documentação de navegação** completa

**IMPORTANTE**: Com Next.js App Router, as rotas já existem em `src/app/<feature>/`. Este comando apenas cria a navegação visual e o layout unificado **com padrões premium aplicados automaticamente**.

---

## 📋 Workflow de Execução

### ETAPA 1: Descoberta de Features

#### 1.1 Escanear Diretórios de Features

Use `Glob` para listar todos os diretórios em `src/app/` que representam features (excluindo arquivos especiais do Next.js):

```bash
# Comando glob para encontrar features
pattern: "src/app/*"
```

**Excluir diretórios especiais do Next.js**:
- `api/` (API routes)
- `_components/` (private folders)
- Arquivos soltos (layout.tsx, page.tsx na raiz, etc.)

Para cada diretório encontrado:
- Extraia o nome da feature (nome da pasta)
- Verifique se existe `page.tsx` (página principal da feature)
- Se `page.tsx` existir, considere como feature válida

#### 1.2 Coletar Metadados das Features

Para cada feature válida, tente extrair informações:

**Método 1: Ler README.md do módulo** (se existir em `src/features/<feature-name>/README.md`):
- Título/Nome da feature (primeiro `#` heading)
- Descrição breve (parágrafo após o título ou seção "Visão Geral")
- Ícone sugerido (se mencionado)

**Método 2: Inferir do nome** (se README não existir):
- Capitalize o nome da pasta
- Atribuir ícone baseado em mapeamento (ver seção 3.2)
- Usar descrição genérica

**Estrutura de dados para cada feature**:
```typescript
{
  name: string;           // Nome da pasta (ex: "clientes")
  displayName: string;    // Nome amigável (ex: "Clientes")
  description: string;    // Descrição breve
  path: string;          // Caminho de rota (ex: "/clientes")
  icon: string;          // Nome do ícone Lucide (ex: "Users")
}
```

#### 1.3 Validar Descoberta

Exiba uma lista das features descobertas:

```
🔍 Features Descobertas:

1. clientes
   • Descrição: Sistema de cadastro de clientes
   • Rota: /clientes
   • Ícone: Users

2. veiculos
   • Descrição: Gestão de frota de veículos
   • Rota: /veiculos
   • Ícone: Car

Total: X features encontradas
```

Se nenhuma feature for encontrada, exiba erro e pare:

```
❌ Nenhuma feature encontrada em src/app/

Verifique se você já executou /design:feature <spec-path> para gerar features.

As features devem estar em: src/app/<feature-name>/page.tsx
```

#### 1.4 Ler Templates Premium (v2.0.0)

**IMPORTANTE**: Antes de gerar qualquer componente, leia os templates premium para entender os padrões de referência:

```bash
# Leia TODOS os templates de referência
Read .claude/templates/components/Card.pattern.md
Read .claude/templates/components/Button.pattern.md
Read .claude/templates/pages/ListView.pattern.md
Read .claude/templates/README.md
```

**Por que?** Os templates contêm:
- Exemplos completos dos 5 princípios aplicados
- Classes Tailwind premium específicas
- Padrões de two-layer shadows
- Estruturas de color layering
- Hierarquia tipográfica correta
- Micro-interações padrão

**Use os templates como guia** ao gerar Sidebar e HomePage nas próximas etapas.

---

### ETAPA 2: Criação do Layout Global Premium (v2.0.0)

#### 2.1 Gerar Componente de Sidebar

Com Next.js App Router, a estrutura de layout é feita em `src/app/layout.tsx`. Vamos criar um componente `Sidebar` que será usado no layout global.

Crie o arquivo `src/components/Sidebar.tsx`:

```typescript
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { theme } from '@/theme/config';
import {
  Menu,
  X,
  Home,
  $FEATURE_ICONS
} from 'lucide-react';

/**
 * Sidebar - Navegação Global Premium v2.0.0
 *
 * Gerado automaticamente pelo comando /design:integrate
 *
 * Aplica os 5 princípios premium:
 * ✓ Two-layer shadows (sidebar + nav items)
 * ✓ Color layering (Shade 2-4)
 * ✓ Espaçamento premium (gap-6, p-6)
 * ✓ Tipografia hierárquica
 * ✓ Micro-interações (hover/active)
 *
 * VISUAL-ONLY: Estrutura de navegação estática.
 * Implementação necessária:
 * - [ ] Adicionar autenticação (exibir user info)
 * - [ ] Implementar logout
 * - [ ] Responsive menu (mobile)
 * - [ ] Persistir estado do sidebar (localStorage)
 */

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const navigation: NavItem[] = [
  {
    name: 'Início',
    path: '/',
    icon: Home,
    description: 'Página inicial',
  },
  $NAV_ITEMS
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64
        bg-white dark:bg-neutral-900
        border-r border-neutral-200 dark:border-neutral-800
        shadow-[inset_-1px_0_0_rgba(255,255,255,0.1)] shadow-lg
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Header do Sidebar - Princípio 4: Tipografia Hierárquica */}
      <div className="
        h-16 flex items-center justify-between
        px-6
        border-b border-neutral-200 dark:border-neutral-800
        bg-neutral-50 dark:bg-neutral-950
      ">
        <h1 className="
          text-xl md:text-2xl
          font-bold tracking-tight
          text-neutral-900 dark:text-neutral-50
        ">
          $PROJECT_NAME
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="
            md:hidden
            transition-all duration-200
            hover:scale-110 active:scale-95
          "
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Navegação - Princípio 3: Espaçamento Premium */}
      <nav className="p-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path ||
                         (item.path !== '/' && pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                group
                flex items-center gap-3
                px-4 py-3
                rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? `
                      bg-gradient-to-b from-primary-light to-primary-dark
                      text-white
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-sm
                    `
                    : `
                      text-neutral-700 dark:text-neutral-300
                      hover:bg-neutral-100 dark:hover:bg-neutral-800
                      hover:scale-[1.02]
                      active:scale-[0.98]
                    `
                }
              `}
            >
              <div className={`
                p-2 rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? 'bg-white/20'
                    : `
                      bg-neutral-100 dark:bg-neutral-800
                      group-hover:bg-primary/10
                      group-hover:scale-110
                    `
                }
              `}>
                <Icon className={`
                  w-5 h-5
                  transition-colors duration-200
                  ${isActive ? '' : 'group-hover:text-primary'}
                `} />
              </div>
              <div className="flex-1">
                <p className="
                  font-semibold
                  text-base leading-tight
                ">{item.name}</p>
                <p className="
                  text-xs
                  opacity-75
                  text-neutral-600 dark:text-neutral-400
                ">{item.description}</p>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer do Sidebar */}
      <div className="
        absolute bottom-0 left-0 right-0
        p-6
        border-t border-neutral-200 dark:border-neutral-800
        bg-neutral-50 dark:bg-neutral-950
      ">
        <p className="
          text-xs
          text-neutral-600 dark:text-neutral-400
          text-center
          leading-relaxed
        ">
          Design System v2.0.0
        </p>
        <p className="
          text-xs
          text-neutral-500 dark:text-neutral-500
          text-center mt-1
        ">
          Gerado com /design:integrate
        </p>
      </div>
    </aside>
  );
}
```

**Placeholders a substituir**:

**`$PROJECT_NAME`** - Nome do projeto (do `design.md` ou `package.json`)

**`$FEATURE_ICONS`** - Lista de ícones importados:
```typescript
Users,   // para feature "clientes"
Car,     // para feature "veiculos"
// ... etc
```

**`$NAV_ITEMS`** - Itens de navegação gerados dinamicamente:
```typescript
{
  name: 'Clientes',
  path: '/clientes',
  icon: Users,
  description: 'Gestão de clientes',
},
{
  name: 'Veículos',
  path: '/veiculos',
  icon: Car,
  description: 'Gestão de frota',
},
// ... etc
```

#### 2.2 Atualizar Layout Global (src/app/layout.tsx)

Agora atualize o `src/app/layout.tsx` para incluir o Sidebar e estrutura de layout:

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/Sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import "./globals.css";

const fontPrimary = Inter({
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
  children: React.ReactNode;
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
          <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content - Princípio 2: Color Layering (Shade 1) */}
            <div className="flex-1 ml-64">
              {/* Top Bar */}
              <header className="
                h-16
                bg-white dark:bg-neutral-900
                border-b border-neutral-200 dark:border-neutral-800
                shadow-[inset_0_-1px_0_rgba(255,255,255,0.1)] shadow-sm
                flex items-center justify-end
                px-6 md:px-8
              ">
                <ModeToggle />
              </header>

              {/* Page Content - Princípio 3: Espaçamento Premium */}
              <main className="p-6 md:p-8">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Placeholders a substituir**:
- `$PROJECT_NAME` - Nome do projeto
- `$PROJECT_DESCRIPTION` - Descrição do projeto

#### 2.3 Mapeamento de Ícones por Contexto

Use esta lógica para atribuir ícones às features:

```typescript
const iconMapping: Record<string, string> = {
  // Pessoas/Usuários
  'clientes': 'Users',
  'usuarios': 'UserCircle',
  'motoristas': 'UserCog',
  'funcionarios': 'Briefcase',

  // Veículos/Frota
  'veiculos': 'Car',
  'frota': 'Truck',

  // Financeiro
  'pagamentos': 'CreditCard',
  'faturamento': 'Receipt',
  'cobranca': 'DollarSign',

  // Operacional
  'reservas': 'Calendar',
  'contratos': 'FileText',
  'checkin': 'LogIn',
  'checkout': 'LogOut',

  // Configurações
  'configuracoes': 'Settings',
  'relatorios': 'BarChart',

  // Fallback
  'default': 'Folder'
};

function getIconForFeature(featureName: string): string {
  const normalized = featureName.toLowerCase();
  return iconMapping[normalized] || iconMapping['default'];
}
```

---

### ETAPA 3: Criação da Página Inicial Premium (v2.0.0)

#### 3.1 Gerar HomePage com Princípios Premium

Atualize o arquivo `src/app/page.tsx` aplicando os 5 princípios premium:

```typescript
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { theme } from '@/theme/config';
import { ArrowRight, $FEATURE_ICONS } from 'lucide-react';

/**
 * HomePage - Página Inicial Premium v2.0.0
 *
 * Gerado automaticamente pelo comando /design:integrate
 *
 * Aplica os 5 princípios premium:
 * ✓ Two-layer shadows (cards)
 * ✓ Color layering (backgrounds)
 * ✓ Espaçamento premium (gap-6, space-y-8)
 * ✓ Tipografia hierárquica (Display → Heading → Body)
 * ✓ Micro-interações (hover cards)
 *
 * VISUAL-ONLY: Dashboard/menu de features.
 * Implementação necessária:
 * - [ ] Adicionar widgets de métricas (KPIs)
 * - [ ] Exibir atividades recentes
 * - [ ] Adicionar quick actions
 * - [ ] Conectar com APIs reais
 */

interface FeatureCard {
  name: string;
  description: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const features: FeatureCard[] = [
  $FEATURE_CARDS
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section - Princípio 4: Tipografia Hierárquica (Display) */}
      <div className="text-center space-y-6">
        <h1 className="
          text-4xl md:text-5xl lg:text-6xl
          font-bold tracking-tight leading-tight
          text-neutral-900 dark:text-neutral-50
        ">
          $PROJECT_NAME
        </h1>
        <p className="
          text-lg md:text-xl
          leading-relaxed
          text-neutral-600 dark:text-neutral-400
          max-w-2xl mx-auto
        ">
          $PROJECT_DESCRIPTION
        </p>
      </div>

      {/* Features Grid - Princípio 3: Espaçamento Premium */}
      <div className="space-y-6">
        <h2 className="
          text-2xl md:text-3xl
          font-semibold tracking-tight
          text-neutral-900 dark:text-neutral-50
        ">
          Módulos do Sistema
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.path} href={feature.path}>
                <Card className="
                  group
                  h-full cursor-pointer
                  bg-white dark:bg-neutral-900
                  border border-neutral-200 dark:border-neutral-800
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
                  hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
                  hover:scale-[1.01] hover:-translate-y-1
                  transition-all duration-300
                  rounded-lg
                  p-6
                ">
                  <CardHeader className="pb-4 p-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="
                          p-3 rounded-lg
                          bg-neutral-100 dark:bg-neutral-800
                          transition-all duration-200
                          group-hover:scale-110
                        "
                        style={{ backgroundColor: `${feature.color}20` }}
                      >
                        <Icon
                          className="w-6 h-6 transition-transform duration-200"
                          style={{ color: feature.color }}
                        />
                      </div>
                      <CardTitle className="
                        text-xl font-semibold tracking-tight
                        text-neutral-900 dark:text-neutral-50
                        transition-colors duration-200
                        group-hover:text-primary
                      ">{feature.name}</CardTitle>
                    </div>
                    <CardDescription className="
                      text-base leading-relaxed
                      text-neutral-600 dark:text-neutral-400
                    ">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 pt-4">
                    <Button variant="ghost" className="
                      w-full justify-between
                      transition-all duration-200
                      group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800
                    ">
                      Acessar módulo
                      <ArrowRight className="
                        w-4 h-4
                        transition-transform duration-200
                        group-hover:translate-x-1
                      " />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Stats (Placeholder) - Princípio 1: Two-Layer Shadows */}
      <div className="space-y-6">
        <h2 className="
          text-2xl md:text-3xl
          font-semibold tracking-tight
          text-neutral-900 dark:text-neutral-50
        ">
          Visão Geral
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* TODO: Implementar widgets de métricas reais */}
          <Card className="
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
            shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
            rounded-lg
            p-6
          ">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="
                text-lg font-semibold
                text-neutral-900 dark:text-neutral-50
              ">Total de Registros</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="
                text-4xl md:text-5xl
                font-bold
                text-primary
              ">
                ---
              </p>
              <p className="
                text-sm
                text-neutral-600 dark:text-neutral-400
                mt-2
              ">
                Dados serão carregados via API
              </p>
            </CardContent>
          </Card>

          <Card className="
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
            shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
            rounded-lg
            p-6
          ">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="
                text-lg font-semibold
                text-neutral-900 dark:text-neutral-50
              ">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="
                text-4xl md:text-5xl
                font-bold
                text-secondary
              ">
                ---
              </p>
              <p className="
                text-sm
                text-neutral-600 dark:text-neutral-400
                mt-2
              ">
                Últimas 24 horas
              </p>
            </CardContent>
          </Card>

          <Card className="
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
            shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
            rounded-lg
            p-6
          ">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="
                text-lg font-semibold
                text-neutral-900 dark:text-neutral-50
              ">Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="
                text-4xl md:text-5xl
                font-bold text-success
              ">
                ✓
              </p>
              <p className="
                text-sm
                text-neutral-600 dark:text-neutral-400
                mt-2
              ">
                Operacional
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

**Placeholders a substituir**:

**`$PROJECT_NAME`** e **`$PROJECT_DESCRIPTION`** - Do `design.md` ou `escopo.md`

**`$FEATURE_CARDS`** - Array de features:
```typescript
{
  name: 'Clientes',
  description: 'Gerencie cadastros de clientes (PF, PJ, Parceiros)',
  path: '/clientes',
  icon: Users,
  color: theme.colors.primary.main,
},
{
  name: 'Veículos',
  description: 'Controle completo da frota de veículos',
  path: '/veiculos',
  icon: Car,
  color: theme.colors.secondary.main,
},
// ... etc
```

---

### ETAPA 4: Documentação de Navegação

#### 4.1 Criar/Atualizar NAVIGATION.md

Crie o arquivo `NAVIGATION.md` na raiz do projeto:

```markdown
# Mapa de Navegação do Sistema

> Gerado automaticamente pelo comando `/design:integrate`
> **Data**: $CURRENT_DATE

---

## 🗺️ Estrutura de Rotas (Next.js App Router)

### Rota Raiz

**`/`** - Página Inicial (`src/app/page.tsx`)
- Dashboard com visão geral do sistema
- Grid de acesso rápido às features
- Widgets de métricas (a serem implementados)

**Navegação**: Automática via Next.js App Router baseado na estrutura de arquivos em `src/app/`

---

## 📦 Features e Suas Rotas

$FEATURE_ROUTES_DOCS

---

## 🔀 Fluxos de Navegação

### Navegação Global (Sidebar)

Todas as páginas têm acesso ao **Sidebar** que permite navegar entre:
- Página Inicial (`/`)
- Cada feature (ex: `/clientes`, `/veiculos`)
- Dark/Light mode toggle

### Navegação Interna das Features

Cada feature usa as rotas automáticas do Next.js App Router:
- Lista: `/<feature>/page.tsx` → `/<feature>`
- Criar: `/<feature>/new/page.tsx` → `/<feature>/new`
- Detalhes: `/<feature>/[id]/page.tsx` → `/<feature>/[id]`
- Editar: `/<feature>/[id]/edit/page.tsx` → `/<feature>/[id]/edit`

---

## 🎨 Componentes de Layout

### Sidebar.tsx
- **Localização**: `src/components/Sidebar.tsx`
- **Responsabilidade**: Navegação lateral com menu de features
- **Features**:
  - Lista de features com ícones
  - Indicação de rota ativa
  - Footer com informações do sistema
  - Toggle para mobile (a implementar)

### RootLayout (layout.tsx)
- **Localização**: `src/app/layout.tsx`
- **Responsabilidade**: Layout global do Next.js
- **Features**:
  - ThemeProvider para dark mode
  - Sidebar integrado
  - Top bar com mode toggle
  - Estrutura de grid para conteúdo

### HomePage (page.tsx)
- **Localização**: `src/app/page.tsx`
- **Responsabilidade**: Página inicial / dashboard
- **Features**:
  - Grid de features disponíveis
  - Quick stats / métricas (a implementar)
  - Hero section com título e descrição

---

## 🛠️ Implementação Necessária

### Sidebar
- [ ] Implementar menu responsivo (mobile com drawer/sheet)
- [ ] Persistir estado do sidebar (localStorage)
- [ ] Adicionar animações de transição
- [ ] Exibir informações do usuário logado
- [ ] Implementar ação de logout

### HomePage
- [ ] Conectar widgets de métricas a APIs reais
- [ ] Exibir atividades/logs recentes
- [ ] Adicionar quick actions (botões de ação rápida)
- [ ] Implementar gráficos/charts se necessário

### Rotas e Autenticação
- [ ] Adicionar middleware de autenticação (Next.js middleware.ts)
- [ ] Implementar redirecionamento baseado em permissões
- [ ] Criar página de login (src/app/login/page.tsx)
- [ ] Criar página 404 customizada (src/app/not-found.tsx)
- [ ] Implementar loading states (loading.tsx em cada rota)

---

## 📚 Referências

- **Layout global**: `src/app/layout.tsx`
- **Sidebar**: `src/components/Sidebar.tsx`
- **Página inicial**: `src/app/page.tsx`
- **Features**: `src/app/<feature-name>/` (rotas) e `src/features/<feature-name>/` (módulos)

Para detalhes de rotas internas de cada feature, consulte:
- `src/features/<feature-name>/README.md` (se existir)

## 🎯 Next.js App Router

Este projeto usa o Next.js App Router (não React Router). As rotas são automáticas baseadas na estrutura de arquivos:
- Arquivos `page.tsx` definem rotas
- Arquivos `layout.tsx` definem layouts compartilhados
- Pastas `[param]` definem rotas dinâmicas
- Arquivos `loading.tsx` definem estados de loading
- Arquivos `error.tsx` definem páginas de erro

---

**Gerado em**: $CURRENT_DATE
```

**Placeholders a substituir**:

**`$FEATURE_ROUTES_DOCS`** - Documentação de cada feature:
```markdown
### 1. Clientes (`/clientes`)

**Descrição**: Sistema de cadastro e gestão de clientes

**Rotas Internas**:
- `/clientes` - Lista de clientes
- `/clientes/new` - Novo cliente
- `/clientes/:id` - Detalhes de cliente
- `/clientes/:id/edit` - Editar cliente

**Componentes**:
- ClientesFeature (entry point)
- ClientsListView, ClientFormView, ClientDetailView

**Documentação**: [README.md](src/features/clientes/README.md)

---

### 2. Veículos (`/veiculos`)

**Descrição**: Gestão completa da frota de veículos

**Rotas Internas**:
- `/veiculos` - Lista de veículos
- `/veiculos/new` - Novo veículo
- `/veiculos/:id` - Detalhes de veículo
- `/veiculos/:id/edit` - Editar veículo

**Componentes**:
- VeiculosFeature (entry point)
- VehiclesListView, VehicleFormView, VehicleDetailView

**Documentação**: [README.md](src/features/veiculos/README.md)

---

(Repita para cada feature)
```

---

### ETAPA 5: Mensagem de Conclusão

Exiba uma mensagem de sucesso detalhada:

```
✅ Integração Premium v2.0.0 Completa!

🔗 Componentes Premium Gerados:

   Layout:
   • src/app/layout.tsx - Layout global com princípios premium
   • src/components/Sidebar.tsx - Navegação lateral premium

   Home:
   • src/app/page.tsx - Página inicial premium com grid de features

🌟 5 Princípios Premium Aplicados:

   ✓ Two-Layer Shadows - Sidebar, Cards, Top Bar
   ✓ Color Layering (Shade 1-4) - Page, Sidebar, Content
   ✓ Espaçamento Premium (base 24px) - gap-6, p-6 md:p-8
   ✓ Tipografia Hierárquica (5 níveis) - Display, Heading, Body
   ✓ Micro-interações - Hover effects em nav items e cards

📋 Features Integradas:

   1. <feature1> → /<feature1>
   2. <feature2> → /<feature2>
   ...
   Total: X features

📚 Documentação:
   • NAVIGATION.md - Mapa completo de navegação

🎯 Arquitetura Next.js App Router:
   • Rotas automáticas baseadas em src/app/
   • Cada feature em src/app/<feature>/
   • Módulos em src/features/<feature>/

🚀 Próximos Passos:

   1. Inicie o servidor de desenvolvimento:
      npm run dev

   2. Acesse: http://localhost:3000

   3. Navegue entre as features usando o sidebar premium:
      • Note a profundidade visual (two-layer shadows)
      • Observe a hierarquia de cores (color layering)
      • Sinta o "respiro" do layout (spacing premium)
      • Interaja para ver micro-animações

   4. Revise e customize o layout conforme necessário

   5. Implemente:
      - Autenticação (middleware.ts)
      - Proteção de rotas
      - Loading states
      - Páginas 404/error

📚 Referências Premium:
   • Design System: .claude/design-system/
   • Templates: .claude/templates/
   • Princípios: design.md

⚠️ Lembre-se: Este é um PROTÓTIPO VISUAL PREMIUM v2.0.0
   com todos os 5 princípios aplicados automaticamente.
   A lógica de negócio, autenticação e integração com APIs
   devem ser implementadas pela equipe de desenvolvimento.

Para refinar visualmente alguma feature:
   /design:refine <feature-name>
```

---

## 🔒 Regras Inegociáveis

### ✅ FAZER:
1. **Escanear automaticamente** features em `src/app/` (diretórios com page.tsx)
2. **Gerar navegação dinamicamente** no Sidebar baseado nas features descobertas
3. **Criar navegação consistente** com ícones apropriados
4. **Documentar completamente** a estrutura de navegação
5. **Manter organização modular** - cada feature permanece isolada
6. **Aplicar tema e dark mode** consistentemente em todos os componentes globais
7. **Usar Next.js patterns** - Link, usePathname, useRouter de next/navigation

### ❌ NÃO FAZER:
1. **Criar router manual** - Next.js App Router é automático
2. **Modificar features existentes** - apenas criar navegação
3. **Adicionar autenticação/autorização** - deixar para implementação
4. **Implementar lógica de negócio** - manter visual-only
5. **Usar react-router-dom** - este projeto usa Next.js App Router

---

## 💡 Dicas de Implementação

### Sobre Next.js App Router

```typescript
// Estrutura automática - não precisa configurar rotas
src/app/
├── page.tsx              → /
├── clientes/
│   └── page.tsx          → /clientes
└── veiculos/
    └── page.tsx          → /veiculos
```

### Sobre Detecção de Rota Ativa (Sidebar)

```typescript
'use client';

import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const isActive = pathname === path ||
                  (path !== '/' && pathname.startsWith(path));

  return (/* ... */);
}
```

### Sobre Navegação

```typescript
// Links declarativos (preferível)
import Link from 'next/link';
<Link href="/clientes">Clientes</Link>

// Navegação programática
'use client';
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/clientes');
```

### Sobre Ícones

Sempre importe de `lucide-react`:
```typescript
import { Users, Car, Settings, Home } from 'lucide-react';
```

### Sobre Componentes Client vs Server

```typescript
// Sidebar precisa de 'use client' (usa hooks)
'use client';
import { useState, usePathname } from 'next/navigation';

// HomePage pode ser server component (sem interatividade)
// Não precisa de 'use client' se não usar hooks
```

---

Boa sorte com a integração! 🚀
