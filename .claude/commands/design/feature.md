---
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
description: Gera módulo de feature completo a partir de especificação
argument-hint: <spec-path>
---

# Comando: /design:feature - Geração de Feature Visual

Você é o **arquiteto de features** responsável por transformar uma especificação markdown em um módulo visual completo, navegável e organizado.

---

## 🎯 Objetivo

Ler um arquivo de especificação (`.md`) e gerar um módulo de feature autocontido contendo:
- Componentes React/TSX **apenas visuais** (sem lógica de negócio)
- Estrutura de navegação interna
- Estilização consistente com o tema do projeto
- Documentação para handoff ao time de desenvolvimento

---

## ⚠️ PRINCÍPIO FUNDAMENTAL: VISUAL-ONLY

**CRÍTICO**: Este comando gera APENAS estrutura visual (UI/UX).

### ❌ O que NÃO deve ser gerado:

- **Estado e Gerenciamento**: Sem `useState`, `useReducer`, Zustand, Redux, Context API
- **Validações**: Sem schemas Zod, Yup, validações customizadas
- **Data Fetching**: Sem `fetch`, `axios`, React Query, SWR
- **Lógica de Negócio**: Sem cálculos, transformações, regras de negócio
- **Side Effects**: Sem `useEffect` para chamadas de API ou processamento
- **Autenticação/Autorização**: Sem verificações de permissão, guards de rota

### ✅ O que DEVE ser gerado:

- **Estrutura JSX/TSX**: Componentes React estáticos e bem organizados
- **Estilização**: Classes Tailwind e uso de tokens do tema
- **Layout e Composição**: Organização visual dos elementos
- **Navegação**: Links e roteamento entre views (React Router)
- **Componentes Shadcn/UI**: Uso de componentes da biblioteca configurada
- **Placeholders Realistas**: Dados mockados estaticamente para demonstração visual
- **Comentários Guia**: Indicações claras onde a lógica será implementada

---

## 📋 Workflow de Execução

### ETAPA 1: Preparação e Validação

#### 1.1 Receber Caminho do Spec

- Se `<spec-path>` foi fornecido como argumento: use-o
- Se NÃO: pergunte ao usuário: "Qual é o caminho do arquivo de spec da feature?"

#### 1.2 Validar Existência e Estrutura (Opcional)

Você PODE executar validação rápida ou sugerir ao usuário:

```
Deseja validar o spec antes de gerar? Execute:
/design:validate-spec <spec-path>
```

**Mas prossiga mesmo sem validação se o usuário preferir.**

#### 1.3 Ler o Spec Completo e Contexto do Projeto

**IMPORTANTE**: Antes de ler o spec da feature, verifique se existe o arquivo `escopo.md` (no diretório atual ou em `.claude/escopo.md`). Se existir, leia-o primeiro para obter contexto do projeto completo.

Use a ferramenta `Read` para carregar o spec da feature inteiro. Analise com atenção:
- Título/nome da feature
- Objetivo da feature
- Critérios de aceitação (especialmente os funcionais)
- Tabela de campos/dados
- Cenários de uso

**Contexto do projeto (do escopo.md):**
- Nome do projeto
- Descrição geral
- Stack tecnológica confirmada (Next.js App Router)
- Padrões e convenções estabelecidas

---

### ETAPA 2: Análise e Planejamento da Arquitetura

Com base no spec lido, PLANEJE (mentalmente ou via comentário) a arquitetura:

#### 2.1 Identificar Entidades/Modelos

Exemplo do spec "Cadastro de Clientes":
- Entidade 1: Pessoa Física
- Entidade 2: Pessoa Jurídica
- Entidade 3: Cliente Parceiro

**Decisão**: Cada entidade pode virar uma view separada OU tabs/steps dentro de uma view.

#### 2.2 Identificar Views/Telas Necessárias

Analise os critérios de aceitação para determinar quantas telas são necessárias:

**Views Comuns**:
- **ListView**: Lista/tabela de registros (padrão para "visualizar todos")
- **FormView**: Formulário de criação/edição (padrão para "cadastrar/editar")
- **DetailView**: Visualização detalhada de um registro (padrão para "visualizar detalhes")
- **ImportView**: Interface de upload/importação (se mencionar CSV, upload)

**Exemplo para "Cadastro de Clientes"**:
1. `ClientsListView.tsx` - Lista de todos os clientes com filtros
2. `ClientFormView.tsx` - Formulário com tabs para PF/PJ/Parceiro
3. `ClientDetailView.tsx` - Detalhes completos de um cliente
4. `ClientImportView.tsx` - Upload de CSV (se aplicável)

#### 2.3 Identificar Componentes Locais

Além das views, identifique componentes reutilizáveis dentro da feature:

**Exemplos**:
- `ClientCard.tsx` - Card de preview de cliente
- `ClientFilters.tsx` - Painel de filtros
- `PessoaFisicaForm.tsx` - Subformulário de Pessoa Física
- `PessoaJuridicaForm.tsx` - Subformulário de Pessoa Jurídica
- `ParceiroForm.tsx` - Subformulário de Parceiro

#### 2.4 Determinar Navegação Interna (App Router)

**IMPORTANTE**: Este projeto usa **Next.js App Router**, NÃO React Router DOM.

Planeje a estrutura de rotas usando o padrão do App Router:

```
src/app/<feature-name>/
├── page.tsx                    # Lista principal (/feature-name)
├── new/
│   └── page.tsx                # Formulário de criação (/feature-name/new)
├── [id]/
│   ├── page.tsx                # Detalhes (/feature-name/[id])
│   └── edit/
│       └── page.tsx            # Edição (/feature-name/[id]/edit)
└── import/
    └── page.tsx                # Importação CSV (se aplicável) (/feature-name/import)
```

**Fluxo de navegação:**
```
Lista (page.tsx)
  ├─> Link "Novo" → /feature-name/new
  ├─> Click em card → /feature-name/[id]
  └─> Botão "Importar" → /feature-name/import

Detalhes ([id]/page.tsx)
  └─> Botão "Editar" → /feature-name/[id]/edit

Formulário (new/page.tsx ou [id]/edit/page.tsx)
  └─> useRouter().back() ou redirect → volta para lista
```

---

### ETAPA 3: Criação da Estrutura de Diretórios (App Router)

**IMPORTANTE**: Usamos o padrão do Next.js App Router com módulos de features autocontidos. A estrutura inclui:
1. Páginas em `src/app/<feature-name>/` (rotas Next.js)
2. Módulo da feature em `src/features/<feature-name>/` (componentes, types, utils)

```
src/
├── app/
│   └── <feature-name>/
│       ├── page.tsx                    # Lista principal
│       ├── new/
│       │   └── page.tsx                # Formulário de criação
│       ├── [id]/
│       │   ├── page.tsx                # Página de detalhes
│       │   └── edit/
│       │       └── page.tsx            # Formulário de edição
│       └── import/
│           └── page.tsx                # Importação CSV (se aplicável)
└── features/
    └── <feature-name>/
        ├── components/                  # Componentes locais da feature
        │   ├── <Component1>.tsx
        │   ├── <Component2>.tsx
        │   └── ...
        ├── types/                       # Types específicos da feature
        │   └── index.ts
        └── utils/                       # Utilitários específicos da feature
            └── index.ts
```

**Comando para criar estrutura** (exemplo para "clientes"):

```bash
mkdir -p "src/app/clientes/new"
mkdir -p "src/app/clientes/[id]/edit"
mkdir -p "src/app/clientes/import"
mkdir -p "src/features/clientes/components"
mkdir -p "src/features/clientes/types"
mkdir -p "src/features/clientes/utils"
```

#### 3.1 Remoção Automática de .gitkeep

**IMPORTANTE**: Após criar arquivos em qualquer pasta, remova os arquivos `.gitkeep` automaticamente.

Antes de escrever um arquivo em uma pasta, verifique se existe `.gitkeep`:

```bash
# Exemplo: Antes de criar src/features/clientes/types/index.ts
# Verificar e remover .gitkeep se existir
if [ -f "src/features/clientes/types/.gitkeep" ]; then
  rm "src/features/clientes/types/.gitkeep"
fi
```

Ou usando Bash de forma mais simples:

```bash
# Remove todos os .gitkeep das pastas que serão populadas
rm -f "src/features/clientes/types/.gitkeep" 2>/dev/null || true
rm -f "src/features/clientes/components/.gitkeep" 2>/dev/null || true
rm -f "src/features/clientes/utils/.gitkeep" 2>/dev/null || true
```

**Quando executar**:
- Antes de criar o primeiro arquivo em `src/features/<feature>/types/`
- Antes de criar o primeiro arquivo em `src/features/<feature>/components/`
- Antes de criar o primeiro arquivo em `src/features/<feature>/utils/`

**Por que?** Os arquivos `.gitkeep` servem apenas para manter pastas vazias no Git. Quando a pasta é populada, eles devem ser removidos automaticamente.

---

### ETAPA 4: Geração de Types/Interfaces

Crie o arquivo `src/features/<feature-name>/types/index.ts` com interfaces TypeScript baseadas na **tabela de campos** do spec.

**Exemplo** (baseado em "Cadastro de Clientes"):

```typescript
/**
 * Types para o módulo de Clientes
 *
 * IMPORTANTE: Esta é apenas a estrutura de tipos.
 * A lógica de validação (Zod) e transformação deve ser implementada
 * pelo time de desenvolvimento no repositório de front-end.
 */

// Enum para tipo de cliente
export type ClientType = 'pessoa_fisica' | 'pessoa_juridica' | 'parceiro';

// Enum para tipo de parceria
export type PartnershipType = 'agencia_turismo' | 'hotel' | 'evento' | 'outro';

// Interface base para cliente
export interface BaseClient {
  id?: string;
  clientType: ClientType;
  createdAt?: string;
  updatedAt?: string;
}

// Pessoa Física
export interface PessoaFisica extends BaseClient {
  clientType: 'pessoa_fisica';
  nomeCompleto: string;
  cpf?: string;
  passaporte?: string;
  pid?: string;
  email: string;
  telefone?: string;
  endereco?: string;
  historicoNegociacoes?: string;
}

// Pessoa Jurídica
export interface PessoaJuridica extends BaseClient {
  clientType: 'pessoa_juridica';
  razaoSocial: string;
  nomeFantasia?: string;
  cnpj: string;
  inscricaoEstadual?: string;
  email: string;
  telefone?: string;
  endereco?: string;
  responsavelNome?: string;
  responsavelCargo?: string;
  responsavelEmail?: string;
  responsavelTelefone?: string;
  tarifaBase?: number;
  tarifaDesconto?: number;
  historicoNegociacoes?: string;
}

// Cliente Parceiro
export interface ClienteParceiro extends BaseClient {
  clientType: 'parceiro';
  nomeEmpresa: string;
  cnpj: string;
  tipoParceria: PartnershipType;
  nomeContato: string;
  emailContato: string;
  telefoneContato: string;
  endereco?: string;
  observacoes?: string;
}

// Union type para todos os tipos de cliente
export type Client = PessoaFisica | PessoaJuridica | ClienteParceiro;

// Props típicas de componentes
export interface ClientCardProps {
  client: Client;
  onClick?: () => void;
}

export interface ClientFormProps {
  initialData?: Client;
  onCancel?: () => void;
}

export interface ClientListProps {
  clients: Client[];
}
```

**Instruções**:
- Baseie-se na **tabela de campos** do spec
- Use tipos TypeScript apropriados (string, number, boolean, Date)
- Crie interfaces separadas para cada entidade se houver múltiplas
- Adicione union types quando aplicável
- Inclua comentários explicativos

---

### ETAPA 5: Definir Padrões Visuais Premium (v2.0.0)

**IMPORTANTE**: Antes de gerar qualquer componente, você DEVE aplicar os 5 princípios premium automaticamente. Esta etapa garante que todas as features saiam "premium by design".

#### 5.1 Ler Templates Premium

Leia os templates de referência em `.claude/templates/` para entender os padrões:

```bash
# Leia TODOS os templates antes de gerar componentes
Read .claude/templates/components/Card.pattern.md
Read .claude/templates/components/Button.pattern.md
Read .claude/templates/pages/ListView.pattern.md
```

**Por que?** Os templates contêm exemplos completos de como aplicar os 5 princípios em componentes reais.

#### 5.2 Os 5 Princípios Premium (Aplicação Automática)

Todos os componentes e páginas gerados DEVEM seguir estes princípios:

##### 1. Two-Layer Shadows (Sombras em Duas Camadas)

**Descrição**: Combine inner shadow (highlight interno) + outer shadow (drop shadow) para criar profundidade realista.

**Aplicar em**: Cards, Buttons, Inputs, Filters

**Código padrão**:
```tsx
// Card padrão
className="
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
  hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
  transition-shadow duration-300
"

// Button primary
className="
  bg-gradient-to-b from-primary-light to-primary-dark
  shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-sm
  hover:shadow-md
"
```

**Referência**: `.claude/design-system/shadows.md`

##### 2. Color Layering (Profundidade com Cores)

**Descrição**: Use 3-4 shades de profundidade para criar hierarquia visual clara.

**Padrão de Shades**:
- **Shade 1**: Page background → `bg-neutral-50 dark:bg-neutral-950`
- **Shade 2**: Cards/containers → `bg-white dark:bg-neutral-900`
- **Shade 3**: Interactive elements → `bg-neutral-100 dark:bg-neutral-800`
- **Shade 4**: Hover states → `hover:bg-neutral-200 dark:hover:bg-neutral-700`

**Aplicar em**: Todas as páginas (Shade 1) e cards (Shade 2-4)

**Referência**: `.claude/design-system/colors.md`

##### 3. Espaçamentos Premium (Base 24px)

**Descrição**: Use 24px (gap-6, p-6) como base ao invés de 16px genérico. Layout "respira".

**Código padrão**:
```tsx
// Page layout
className="p-6 md:p-8 space-y-8"

// Grid
className="gap-6"

// Card interno
className="p-6 space-y-4"

// Entre seções
className="space-y-6"
```

**Referência**: `.claude/design-system/responsive.md`

##### 4. Tipografia Hierárquica (5 Níveis)

**Descrição**: Escala clara de 5 níveis de tipografia com responsividade.

**Níveis**:
1. **Display** (Títulos de página): `text-4xl md:text-5xl font-bold tracking-tight`
2. **Heading** (Títulos de seção): `text-xl md:text-2xl font-semibold`
3. **Body** (Conteúdo principal): `text-base leading-relaxed`
4. **Caption** (Metadados): `text-sm text-neutral-600`
5. **Helper** (Dicas): `text-xs text-neutral-500`

**Aplicar em**: Todos os textos (h1, h2, p, span)

**Referência**: `.claude/design-system/typography.md`

##### 5. Micro-interações (Feedback Visual)

**Descrição**: Transições suaves de 150-300ms com feedback hover/active.

**Código padrão**:
```tsx
// Button com micro-interação
className="
  transition-all duration-200
  hover:scale-[1.02]
  active:scale-[0.98]
"

// Card clicável
className="
  transition-all duration-300
  hover:scale-[1.01]
  hover:-translate-y-1
"

// Icon com group-hover
className="
  transition-colors duration-200
  group-hover:text-primary
  group-hover:scale-110
"
```

**Aplicar em**: Buttons, Cards clicáveis, Icons, Links

**Referência**: `.claude/design-system/transitions.md`

#### 5.3 Checklist de Aplicação

Antes de gerar cada componente, verifique mentalmente:

- [ ] Two-layer shadow aplicado em cards/buttons?
- [ ] Color layering (Shade 1-4) aplicado na página?
- [ ] Espaçamento premium (gap-6, p-6, space-y-8)?
- [ ] Tipografia hierárquica (Display → Heading → Body)?
- [ ] Micro-interações (hover, active, transitions)?
- [ ] Dark mode em TODOS os elementos (dark: variants)?

**Se a resposta for NÃO em qualquer item, revise o componente antes de prosseguir.**

#### 5.4 Exemplo Completo de Card Premium

```tsx
<Card className="
  group cursor-pointer
  bg-white dark:bg-neutral-900
  border border-neutral-200 dark:border-neutral-800
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
  hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
  hover:scale-[1.01] hover:-translate-y-1
  transition-all duration-300
  rounded-lg
  p-6
">
  <CardHeader className="pb-4">
    <div className="flex items-center gap-3 mb-2">
      <div className="
        p-2 rounded-lg
        bg-neutral-100 dark:bg-neutral-800
        transition-all duration-200
        group-hover:bg-primary/10
        group-hover:scale-110
      ">
        <Icon className="
          w-5 h-5
          text-neutral-600 dark:text-neutral-400
          transition-colors duration-200
          group-hover:text-primary
        " />
      </div>
      <Badge className="
        bg-neutral-100 dark:bg-neutral-800
        text-neutral-700 dark:text-neutral-300
      ">
        Status
      </Badge>
    </div>

    <CardTitle className="
      text-xl md:text-2xl
      font-semibold tracking-tight
      text-neutral-900 dark:text-neutral-50
      transition-colors duration-200
      group-hover:text-primary
    ">
      Título do Card
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">
    <p className="
      text-base leading-relaxed
      text-neutral-600 dark:text-neutral-400
    ">
      Conteúdo do card com hierarquia clara
    </p>
  </CardContent>
</Card>
```

**Observe**: Este card usa TODOS os 5 princípios simultaneamente.

---

### ETAPA 6: Geração de Componentes Locais

Para cada componente identificado no planejamento, gere o arquivo correspondente **aplicando os 5 princípios premium automaticamente**.

#### Template de Componente Local

```typescript
import React from 'react';
import { theme } from '@/theme/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { <Type>Props } from '@/features/<feature-name>/types';

/**
 * <ComponentName>
 *
 * Descrição: <Breve descrição do propósito>
 *
 * VISUAL-ONLY: Este componente contém apenas a estrutura visual.
 * Implementação necessária pelo dev:
 * - [ ] <Lista de tarefas para o desenvolvedor>
 */

export function <ComponentName>({ prop1, prop2 }: <Type>Props) {
  return (
    <div className="<tailwind-classes>">
      {/* Estrutura visual aqui */}
      <Card>
        <CardHeader>
          <CardTitle>Título Exemplo</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Conteúdo mockado/estático */}
          <p className="text-neutral-600">
            Dados de exemplo serão substituídos por dados reais
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Diretrizes**:
- Use componentes Shadcn/UI sempre que possível (Card, Button, Badge, Input, etc.)
- Aplique classes Tailwind para layout e estilo
- Use tokens do tema importados de `@/theme/config` quando necessário
- Adicione comentários claros indicando onde a lógica será implementada
- Mock dados estáticos realistas (não deixe vazio)

#### Exemplo: ClientCard.tsx

Criar em: `src/features/clientes/components/ClientCard.tsx`

```typescript
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, User } from 'lucide-react';
import type { ClientCardProps } from '@/features/clientes/types';

/**
 * ClientCard
 *
 * Descrição: Card de preview de cliente para exibição em listas
 *
 * VISUAL-ONLY: Estrutura visual apenas.
 * Implementação necessária:
 * - [ ] Integrar prop onClick para navegação
 * - [ ] Adicionar estados de hover/seleção se necessário
 */

export function ClientCard({ client, onClick }: ClientCardProps) {
  // Mock de rótulo de tipo de cliente (lógica real será implementada)
  const clientTypeLabel = {
    pessoa_fisica: 'Pessoa Física',
    pessoa_juridica: 'Pessoa Jurídica',
    parceiro: 'Parceiro',
  }[client.clientType];

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">
              {/* Nome dinâmico baseado no tipo */}
              {'nomeCompleto' in client ? client.nomeCompleto :
               'razaoSocial' in client ? client.razaoSocial :
               client.nomeEmpresa}
            </h3>
          </div>
          <Badge variant="secondary">{clientTypeLabel}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Mail className="w-4 h-4" />
          <span>
            {'email' in client ? client.email :
             'emailContato' in client ? client.emailContato : 'N/A'}
          </span>
        </div>
        {'telefone' in client && client.telefone && (
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Phone className="w-4 h-4" />
            <span>{client.telefone}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

---

### ETAPA 6.5: Instalação Automática de Primitivos Shadcn via MCP

**IMPORTANTE**: Antes de gerar as views, você deve instalar todos os componentes primitivos do shadcn que serão importados pelos componentes criados.

#### 6.5.1 Identificar Componentes Necessários

Baseado nos componentes locais gerados e nas views planejadas, identifique quais primitivos do shadcn serão necessários. Os mais comuns incluem:

**Para formulários:**
- button
- input
- label
- textarea
- select
- checkbox
- radio-group
- date-picker
- form

**Para layout e estrutura:**
- card
- separator
- tabs
- accordion
- dialog
- sheet

**Para feedback:**
- badge
- alert
- toast
- skeleton
- progress

**Para dados:**
- table
- dropdown-menu
- popover
- tooltip

#### 6.5.2 Instalar via MCP Shadcn

Use o MCP Server do shadcn para instalar os componentes necessários:

**Importante**: Liste TODOS os componentes que serão usados e instale de uma só vez.

**Exemplo de comando** (ajuste conforme necessário):
```bash
npx shadcn@latest add button card input label textarea select badge dropdown-menu
```

**Ou use o MCP diretamente** se estiver configurado:
- Solicite ao assistente MCP para instalar os componentes necessários
- Exemplo: "Install shadcn components: button, card, input, label, textarea, select, badge"

#### 6.5.3 Verificar Instalação

Após instalar, verifique se os componentes foram criados em `src/components/ui/`:
```bash
ls src/components/ui/
```

Você deve ver os arquivos correspondentes (button.tsx, card.tsx, etc.)

---

### ETAPA 7: Geração de Views (App Router Pages)

Para cada view identificada, gere um arquivo completo e navegável **aplicando os 5 princípios premium automaticamente**.

#### Template de ListView (App Router Page)

Crie o arquivo `src/app/<feature-name>/page.tsx`:

```typescript
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Upload } from 'lucide-react';
import { <ComponentName> } from '@/features/<feature-name>/components/<ComponentName>';
import type { <Type> } from '@/features/<feature-name>/types';

/**
 * <Entity> ListView Page
 *
 * Rota: /<feature-name>
 *
 * Descrição: Página de listagem/visualização de <entidades>
 *
 * VISUAL-ONLY com simulação básica: Possui useState local para simular CRUD.
 * Implementação necessária:
 * - [ ] Integrar com API para buscar dados reais
 * - [ ] Implementar filtros e busca funcionais
 * - [ ] Adicionar paginação real
 * - [ ] Implementar ordenação de colunas
 * - [ ] Adicionar ações de exclusão com confirmação real
 */

export default function <Entity>ListPage() {
  // SIMULAÇÃO: Estado local para demonstração
  // TODO: Substituir por fetching real de API
  const [items, setItems] = useState<<Type>[]>([
    // Dados de exemplo realistas
    { id: '1', ... },
    { id: '2', ... },
    { id: '3', ... },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // SIMULAÇÃO: Filtro básico local
  const filteredItems = items.filter(item => {
    // Ajuste conforme os campos do seu type
    const searchFields = [item.nome, item.email].join(' ').toLowerCase();
    return searchFields.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            <Entities Plural>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Gerencie todos os registros de <entidades>
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/<feature-name>/import">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Importar CSV
            </Button>
          </Link>
          <Link href="/<feature-name>/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo <Entity>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Buscar por nome, email, documento..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filtros</Button>
      </div>

      {/* Lista de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <Link key={item.id} href={`/<feature-name>/${item.id}`}>
            <<ComponentName> <entity>={item} />
          </Link>
        ))}
      </div>

      {/* Estado vazio */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500 dark:text-neutral-400">
            {searchTerm
              ? 'Nenhum registro encontrado para essa busca.'
              : 'Nenhum registro encontrado. Clique em "Novo <Entity>" para começar.'}
          </p>
        </div>
      )}
    </div>
  );
}
```

**Notas importantes:**
- Use `'use client'` no topo do arquivo (necessário para hooks)
- Use `Link` do `next/link` (não do react-router-dom)
- Use `href` ao invés de `to` nos Links
- Adicione classes `dark:` para dark mode
- Simulação básica com useState para demonstrar filtro funcionando

#### Template de FormView (App Router Page)

Crie os arquivos:
- `src/app/<feature-name>/new/page.tsx` (para criar)
- `src/app/<feature-name>/[id]/edit/page.tsx` (para editar)

```typescript
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save } from 'lucide-react';
import type { <Entity>FormProps } from '@/features/<feature-name>/types';

/**
 * <Entity>FormView
 *
 * Descrição: Formulário de criação/edição de <entidade>
 *
 * VISUAL-ONLY: Estrutura de formulário sem validação ou submissão.
 * Implementação necessária:
 * - [ ] Integrar react-hook-form
 * - [ ] Adicionar validação com Zod
 * - [ ] Implementar lógica de submissão (POST/PUT)
 * - [ ] Adicionar estados de loading/erro
 * - [ ] Implementar upload de arquivos se necessário
 * - [ ] Adicionar máscaras de input (CPF, CNPJ, telefone)
 */

export default function <Entity>FormPage({ params }: { params: { id?: string } }) {
  const router = useRouter();
  const isEditMode = !!params?.id;

  // SIMULAÇÃO: Estado local para o formulário
  const [formData, setFormData] = useState({
    // Inicialize com campos vazios ou dados do params.id
    nomeCompleto: '',
    email: '',
    // ... outros campos
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = () => {
    router.back(); // Volta para página anterior
  };

  // SIMULAÇÃO: Submit com feedback visual
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Formulário submetido (simulação):', formData);
    // TODO: Implementar POST/PUT para API real

    // Simula sucesso e redireciona
    router.push('/<feature-name>');
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {initialData ? 'Editar <Entity>' : 'Novo <Entity>'}
          </h1>
          <p className="text-neutral-600 mt-1">
            Preencha os campos abaixo para {initialData ? 'atualizar' : 'cadastrar'} um <entity>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Se houver múltiplos tipos de entidade, use Tabs */}
        <Tabs defaultValue="pessoa_fisica" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pessoa_fisica">Pessoa Física</TabsTrigger>
            <TabsTrigger value="pessoa_juridica">Pessoa Jurídica</TabsTrigger>
            <TabsTrigger value="parceiro">Parceiro</TabsTrigger>
          </TabsList>

          {/* Tab 1: Pessoa Física */}
          <TabsContent value="pessoa_fisica">
            <Card>
              <CardHeader>
                <CardTitle>Dados de Pessoa Física</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                    <Input
                      id="nomeCompleto"
                      placeholder="Ex: João da Silva"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                      Para clientes internacionais, use Passaporte ou PID
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="passaporte">Passaporte/PID</Label>
                    <Input
                      id="passaporte"
                      placeholder="Documento internacional"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="joao@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      placeholder="(21) 99999-9999"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      placeholder="Rua, número, bairro, cidade - UF"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="historico">Histórico de Negociações</Label>
                    <Textarea
                      id="historico"
                      placeholder="Informações relevantes sobre negociações anteriores..."
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Pessoa Jurídica */}
          <TabsContent value="pessoa_juridica">
            <Card>
              <CardHeader>
                <CardTitle>Dados de Pessoa Jurídica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Similar ao anterior, ajustado para campos de PJ */}
                {/* ... */}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Parceiro */}
          <TabsContent value="parceiro">
            <Card>
              <CardHeader>
                <CardTitle>Dados de Parceiro Estratégico</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Similar ao anterior, ajustado para campos de Parceiro */}
                {/* ... */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}
```

**Nota**: Adapte os campos do formulário de acordo com a **tabela de campos** do spec. Use componentes Shadcn/UI apropriados (Input, Select, Checkbox, DatePicker, etc.).

#### Template de DetailView

Criar em: `src/app/<feature-name>/[id]/page.tsx`

```typescript
'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import type { <Entity> } from '@/features/<feature-name>/types';

/**
 * <Entity>DetailView
 *
 * Descrição: Visualização detalhada de um <entity>
 *
 * VISUAL-ONLY: Exibição de dados mockados.
 * Implementação necessária:
 * - [ ] Buscar dados reais por ID via API
 * - [ ] Implementar lógica de edição
 * - [ ] Implementar lógica de exclusão com confirmação
 * - [ ] Adicionar estados de loading/erro
 * - [ ] Adicionar breadcrumbs de navegação
 */

export default function <Entity>DetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // MOCK DATA - Substituir por fetching real baseado em `id`
  const mock<Entity>: <Entity> = {
    id: id,
    clientType: 'pessoa_fisica',
    nomeCompleto: 'João da Silva',
    cpf: '123.456.789-00',
    email: 'joao@exemplo.com',
    telefone: '(21) 99999-9999',
    endereco: 'Rua Exemplo, 123, Centro, Rio de Janeiro - RJ',
    historicoNegociacoes: 'Cliente VIP desde 2020. Já alugou veículos blindados em 15 ocasiões.',
  };

  const handleEdit = () => {
    router.push(`/<feature-name>/${id}/edit`);
  };

  const handleDelete = () => {
    // TODO: Implementar lógica de exclusão com confirmação
    console.log('Exclusão a ser implementada');
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {/* Renderize o nome principal da entidade */}
              <Entity name>
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Detalhes completos do cadastro
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </div>
      </div>

      {/* Informações - Adapte conforme os campos da sua entidade */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Informações Básicas</CardTitle>
              <Badge>Status/Tipo</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {/* Renderize os campos da entidade aqui */}
            {/* Exemplo genérico - adapte aos campos reais */}
          </CardContent>
        </Card>

        {/* Adicione mais Cards conforme necessário para organizar as informações */}
      </div>
    </div>
  );
}
```

---

### ETAPA 8: Navegação no App Router

**IMPORTANTE**: Com Next.js App Router, NÃO precisamos criar um arquivo de router separado. A navegação é automática baseada na estrutura de arquivos.

#### Estrutura de Rotas Automática

```
src/app/<feature-name>/
├── page.tsx              → Rota: /<feature-name>
├── new/page.tsx          → Rota: /<feature-name>/new
├── [id]/page.tsx         → Rota: /<feature-name>/[id]
├── [id]/edit/page.tsx    → Rota: /<feature-name>/[id]/edit
└── import/page.tsx       → Rota: /<feature-name>/import (opcional)
```

#### Navegação entre Páginas

**Links Declarativos** (preferível):
```typescript
import Link from 'next/link';

<Link href="/<feature-name>/new">
  <Button>Novo Registro</Button>
</Link>
```

**Navegação Programática**:
```typescript
'use client'; // Necessário para hooks

import { useRouter } from 'next/navigation';

export default function MyComponent() {
  const router = useRouter();

  const handleSave = () => {
    // Após salvar...
    router.push('/<feature-name>'); // Ir para lista
  };

  const handleCancel = () => {
    router.back(); // Voltar página anterior
  };

  return (/* ... */);
}
```

**Acessando Parâmetros de Rota**:
```typescript
'use client';

import { useParams } from 'next/navigation';

export default function DetailPage() {
  const params = useParams();
  const id = params.id as string; // Para /[id]/page.tsx

  return <div>Visualizando registro: {id}</div>;
}
```

---

### ETAPA 9: Criação do README.md de Handoff

Gere um arquivo `README.md` completo na raiz do módulo para guiar o time de desenvolvimento:

```markdown
# Feature: <Nome da Feature>

> Módulo gerado automaticamente pelo comando `/design:feature`
> **Data**: <data-de-geração>
> **Spec Source**: `<caminho-do-spec>`

---

## 📋 Visão Geral

**Objetivo**: <Copie o objetivo do spec>

**Status**: ✅ Estrutura visual completa | ⚠️ Aguardando implementação de lógica

---

## 📂 Estrutura do Módulo (App Router)

```
src/
├── app/<feature-name>/              # Rotas Next.js
│   ├── page.tsx                     # Lista principal (rota: /<feature-name>)
│   ├── new/page.tsx                 # Criar (rota: /<feature-name>/new)
│   ├── [id]/page.tsx                # Detalhes (rota: /<feature-name>/[id])
│   ├── [id]/edit/page.tsx           # Editar (rota: /<feature-name>/[id]/edit)
│   └── import/page.tsx (opcional)   # Importar (rota: /<feature-name>/import)
└── features/<feature-name>/         # Módulo da feature
    ├── components/                  # Componentes locais
    │   ├── <Component1>.tsx
    │   ├── <Component2>.tsx
    │   └── ...
    ├── types/                       # TypeScript interfaces
    │   └── index.ts
    └── utils/                       # Utilitários (helpers, formatters)
        └── index.ts
```

**Navegação**: Automática baseada na estrutura de arquivos (Next.js App Router)

**Imports**:
- Componentes: `@/features/<feature-name>/components/<Component>`
- Types: `@/features/<feature-name>/types`
- Utils: `@/features/<feature-name>/utils`

---

## 🎨 Views Disponíveis

### 1. <Entity>ListView (`views/<Entity>ListView.tsx`)
- **Propósito**: Listagem de todos os registros
- **Features Visuais**:
  - Grid responsivo de cards
  - Barra de busca
  - Filtros
  - Botões de ação (Novo, Importar)
- **Navegação**:
  - Click em card → DetailView
  - Botão "Novo" → FormView
  - Botão "Importar" → ImportView (se aplicável)

### 2. <Entity>FormView (`views/<Entity>FormView.tsx`)
- **Propósito**: Criação e edição de registros
- **Features Visuais**:
  - Formulário com tabs (se múltiplas entidades)
  - Campos organizados em grid responsivo
  - Validação visual (a ser implementada)
  - Botões Salvar/Cancelar
- **Modos**:
  - `/new` - Criação
  - `/:id/edit` - Edição

### 3. <Entity>DetailView (`views/<Entity>DetailView.tsx`)
- **Propósito**: Visualização detalhada de um registro
- **Features Visuais**:
  - Cards informativos organizados por seção
  - Badges de status
  - Botões de ação (Editar, Excluir)

---

## 🧩 Componentes Locais

### <ComponentName> (`components/<ComponentName>.tsx`)
- **Propósito**: <Descrição>
- **Props**: <Lista de props>
- **Uso**: <Onde é usado>

<Repita para cada componente>

---

## 🔧 Implementação Necessária (Checklist para Devs)

### Prioridade ALTA (Bloqueantes)

- [ ] **Integração com API**
  - [ ] Criar service/API client para <entidades>
  - [ ] Implementar GET /api/<entities> (listagem)
  - [ ] Implementar GET /api/<entities>/:id (detalhes)
  - [ ] Implementar POST /api/<entities> (criação)
  - [ ] Implementar PUT /api/<entities>/:id (edição)
  - [ ] Implementar DELETE /api/<entities>/:id (exclusão)

- [ ] **Gerenciamento de Estado**
  - [ ] Implementar React Query hooks ou SWR para caching
  - [ ] Adicionar estados de loading/erro em todas as views
  - [ ] Implementar invalidação de cache após mutações

- [ ] **Validação de Formulário**
  - [ ] Criar schemas Zod baseados nas interfaces (ver `types/index.ts`)
  - [ ] Integrar react-hook-form no FormView
  - [ ] Adicionar mensagens de erro de validação
  - [ ] Implementar validações customizadas (CPF, CNPJ, email)

### Prioridade MÉDIA (Importantes)

- [ ] **UX Enhancements**
  - [ ] Adicionar máscaras de input (CPF: `000.000.000-00`, CNPJ, telefone)
  - [ ] Implementar debounce na busca (300ms)
  - [ ] Adicionar paginação na ListView (10-20 itens por página)
  - [ ] Implementar ordenação de colunas
  - [ ] Adicionar filtros avançados

- [ ] **Feedback ao Usuário**
  - [ ] Toast notifications para sucesso/erro
  - [ ] Modal de confirmação para exclusão
  - [ ] Skeleton loaders durante carregamento
  - [ ] Empty states personalizados

- [ ] **Navegação**
  - [ ] Integrar este módulo no router principal (`src/navigation/router.tsx`)
  - [ ] Adicionar breadcrumbs
  - [ ] Implementar navegação via teclado (acessibilidade)

### Prioridade BAIXA (Melhorias)

- [ ] **Funcionalidades Avançadas**
  - [ ] Implementar upload de CSV (se aplicável)
  - [ ] Exportação de dados (CSV, PDF)
  - [ ] Histórico de alterações (audit log)
  - [ ] Busca avançada com múltiplos critérios

- [ ] **Testes**
  - [ ] Testes unitários dos componentes
  - [ ] Testes de integração do fluxo completo
  - [ ] Testes E2E com Playwright/Cypress

- [ ] **Otimizações**
  - [ ] Virtualização da lista (react-window) para grandes volumes
  - [ ] Lazy loading de imagens
  - [ ] Code splitting por rota

---

## 📚 Referências Técnicas

### Tipos/Interfaces
Todos os tipos estão definidos em `types/index.ts`. Use-os para:
- Tipar props de componentes
- Criar schemas Zod (espelho das interfaces)
- Documentar contratos de API

### Componentes Shadcn/UI Utilizados
- `Button` - Botões de ação
- `Card` - Containers de conteúdo
- `Input` - Campos de texto
- `Label` - Rótulos de formulário
- `Textarea` - Campos de texto longo
- `Badge` - Indicadores de status
- `Tabs` - Navegação por abas (se aplicável)
- `Select` - Dropdowns (se aplicável)

### Ícones (Lucide React)
Importar de `lucide-react`:
- `Plus`, `Edit`, `Trash2`, `Save`, `ArrowLeft`, `Search`, `Upload`, etc.

---

## 🚀 Como Usar Este Módulo

### 1. Integração no Projeto

Com Next.js App Router, a feature é automaticamente integrada quando você cria a estrutura em `src/app/<feature-name>/`. Não é necessário configurar rotas manualmente.

Para integrar no menu/navegação principal, use `/design:integrate` que criará automaticamente:
- Layout com sidebar
- Menu de navegação
- Integração de todas as features

### 2. Navegação Externa

De outras partes do app:

```typescript
import Link from 'next/link';

// Link para listagem
<Link href="/<feature-name>">Ver Registros</Link>

// Link para criar novo
<Link href="/<feature-name>/new">Novo Registro</Link>

// Link para detalhes
<Link href={`/<feature-name>/${id}`}>Ver Detalhes</Link>
```

### 3. Desenvolvimento Incremental

Sugestão de ordem de implementação:

1. **Phase 1: Read-Only**
   - Implementar API GET endpoints
   - Conectar ListView e DetailView
   - Testar visualização de dados

2. **Phase 2: CRUD Completo**
   - Implementar FormView com validação
   - Adicionar API POST/PUT/DELETE
   - Testar criação, edição e exclusão

3. **Phase 3: Refinamentos**
   - Adicionar filtros, busca, paginação
   - Implementar feedback ao usuário
   - Adicionar funcionalidades avançadas

---

## ⚠️ Notas Importantes

### Visual-Only Limitations

Este módulo contém APENAS a estrutura visual. **NÃO** espere encontrar:
- Chamadas de API funcionais
- Validação de formulários
- Gerenciamento de estado
- Tratamento de erros
- Autenticação/autorização

Tudo isso deve ser implementado pela equipe de desenvolvimento.

### Mock Data

Os dados mockados presentes nos componentes são APENAS para demonstração visual. Substitua por:
- Chamadas reais de API
- Estados de loading/erro adequados
- Tratamento de casos extremos (listas vazias, erros de rede, etc.)

### Customização

Você pode (e deve):
- Ajustar o layout conforme necessário
- Adicionar novos componentes
- Modificar a estrutura de navegação
- Estender as interfaces de tipos

Mas mantenha:
- Consistência com o sistema de design (tema)
- Organização modular clara
- Documentação atualizada

---

## 📞 Suporte

Dúvidas sobre a estrutura visual ou necessidade de ajustes?
- Consulte o spec original: `<caminho-do-spec>`
- Revise o sistema de design: `design.md`
- Execute `/design:refine <feature-name>` para melhorias visuais

---

**Gerado em**: <data>
**Versão**: 1.0
**Status**: Pronto para implementação de lógica
```

---

### ETAPA 10: Mensagem de Conclusão

Após concluir todas as etapas, exiba uma mensagem formatada de sucesso:

```
✅ Feature "<Nome da Feature>" gerada com sucesso!

📂 Estrutura criada em: src/features/<feature-name>/

📋 Componentes gerados:
   Views:
   • <Lista de views>

   Componentes Locais:
   • <Lista de componentes>

   Types:
   • types/index.ts - <X> interfaces TypeScript

📚 Documentação:
   • README.md - Guia completo de handoff para devs

🎨 Estilo Premium (v2.0.0):
   • ✨ Two-Layer Shadows aplicadas em cards/buttons
   • 🎨 Color Layering (Shade 1-4) aplicado
   • 📐 Espaçamentos Premium (base 24px)
   • 📝 Tipografia Hierárquica (5 níveis)
   • ⚡ Micro-interações (hover/active feedback)
   • 🌙 Dark mode em todos os elementos
   • 🧩 Componentes Shadcn/UI utilizados
   • 📱 Layout responsivo implementado

🚀 Próximos Passos:

   1. Revise os componentes gerados (já com padrões premium!)
   2. Execute /design:integrate para criar app navegável
   3. Opcionalmente, refine: /design:refine <feature-name>
   4. Faça handoff para o time de desenvolvimento

📚 Referências Premium:
   • Design System: .claude/design-system/
   • Templates: .claude/templates/
   • Princípios: design.md

Para testar isoladamente:
   - Integre a rota no router principal
   - Navegue para /<entities>
```

---

## 🔒 Regras Inegociáveis

Durante toda a execução, você DEVE:

### ✅ FAZER:
1. **Ler o spec completamente** antes de começar a gerar código
2. **Planejar a arquitetura** (entidades, views, componentes) baseado no spec
3. **Gerar código limpo e comentado** com indicações claras para devs
4. **Usar componentes Shadcn/UI** sempre que possível
5. **Aplicar tokens do tema** (`@/theme/config`) de forma consistente
6. **Criar tipos TypeScript** para todas as entidades
7. **Mock dados realistas** (não deixar componentes vazios)
8. **Documentar tudo** no README.md de handoff
9. **Organizar modularmente** (estrutura clara e previsível)

### ❌ NÃO FAZER:
1. **Implementar lógica de negócio** (cálculos, transformações, regras)
2. **Adicionar validações** (Zod, Yup, custom validators)
3. **Fazer chamadas de API** (fetch, axios, React Query)
4. **Gerenciar estado real** (useState com lógica, useReducer, Zustand)
5. **Adicionar autenticação/autorização** (guards, verificações de permissão)
6. **Implementar side effects complexos** (useEffect para processamento)
7. **Criar código "inteligente"** - mantenha simples e visual

---

## 💡 Dicas de Implementação

### Sobre Componentes Shadcn/UI

Componentes mais utilizados:
- **Card**: Containers de conteúdo (muito versátil)
- **Button**: Todos os tipos de ação
- **Input**: Campos de texto simples
- **Label**: Sempre acompanha inputs
- **Textarea**: Texto longo (descrições, observações)
- **Select**: Dropdowns (tipos, categorias)
- **Badge**: Status, tags, categorias
- **Tabs**: Navegação por abas (útil para múltiplas entidades)
- **Dialog**: Modais (confirmações, formulários rápidos)
- **Table**: Tabelas tradicionais (alternativa a cards)

### Sobre Layout Responsivo

Use classes Tailwind:
- **Grid responsivo**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Flex para alinhamento**: `flex items-center justify-between`
- **Spacing consistente**: use tokens do tema (`space-y-4`, `gap-6`)
- **Max-width para leitura**: `max-w-4xl mx-auto` em forms/details

### Sobre Dados Mockados

Crie dados realistas que representem cenários reais:
- Use nomes, emails, telefones fictícios mas verossímeis
- Varie os tipos de dados (PF, PJ, Parceiro)
- Inclua casos extremos (nomes longos, endereços completos)
- Mock pelo menos 3-5 registros para demonstrar grid/lista

---

Boa sorte com a geração da feature! 🚀
