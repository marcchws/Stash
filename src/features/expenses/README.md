# Feature: Despesas

> Módulo gerado automaticamente pelo comando `/design:feature`
> **Data**: 2025-11-15
> **Spec Source**: `specs/expenses.md`

---

## 📋 Visão Geral

**Objetivo**: Permitir que usuários registrem, visualizem, editem e excluam suas despesas de forma rápida e indolor. Esta é a funcionalidade central do Stash - o registro deve ser tão simples que possa ser feito em fila de café, no ônibus, ou em qualquer momento do dia com máximo 3 toques.

**Princípio de Design**: **Velocidade acima de tudo**. O usuário deve conseguir abrir o app, adicionar uma despesa (valor + categoria) e voltar para o que estava fazendo em menos de 10 segundos.

**Status**: ✅ Estrutura visual completa | ⚠️ Aguardando implementação de lógica

---

## 📂 Estrutura do Módulo (App Router)

```
src/
├── app/expenses/                    # Rotas Next.js
│   ├── page.tsx                     # Lista/Timeline (rota: /expenses)
│   └── [id]/page.tsx                # Detalhes (rota: /expenses/[id])
└── features/expenses/               # Módulo da feature
    ├── components/                  # Componentes locais
    │   ├── CategoryGrid.tsx         # Grade de seleção de categorias
    │   ├── ExpenseCard.tsx          # Card de despesa individual
    │   ├── ExpenseFAB.tsx           # Floating Action Button (+)
    │   ├── ExpenseModal.tsx         # Modal de criação/edição
    │   └── DayGroup.tsx             # Agrupamento de despesas por dia
    ├── types/                       # TypeScript interfaces
    │   └── index.ts
    └── utils/                       # Utilitários (vazios por enquanto)
        └── index.ts
```

**Navegação**: Automática baseada na estrutura de arquivos (Next.js App Router)

**Imports**:
- Componentes: `@/features/expenses/components/<Component>`
- Types: `@/features/expenses/types`
- Utils: `@/features/expenses/utils`

---

## 🎨 Páginas e Componentes Disponíveis

### 1. ExpensesPage (`app/expenses/page.tsx`)
- **Propósito**: Página principal com timeline de despesas agrupadas por dia
- **Features Visuais**:
  - Timeline com agrupamento cronológico (hoje, ontem, datas anteriores)
  - FAB (Floating Action Button) sempre visível no canto inferior direito
  - Cards de despesa clicáveis com ícone, categoria, valor e descrição
  - Empty state amigável quando não há despesas
  - Header com título e subtítulo hierárquicos
- **Navegação**:
  - Click em card de despesa → ExpenseDetailPage (`/expenses/[id]`)
  - Click no FAB → Abre ExpenseModal (criação)
- **Aplicação dos 5 Princípios Premium**:
  - ✅ Two-layer shadows em cards
  - ✅ Color layering (bg-neutral-50/950)
  - ✅ Espaçamento premium (space-y-6, gap-6)
  - ✅ Tipografia hierárquica (h1 Display, p Body)
  - ✅ Micro-interações (hover em cards)

### 2. ExpenseDetailPage (`app/expenses/[id]/page.tsx`)
- **Propósito**: Visualização detalhada de uma despesa específica
- **Features Visuais**:
  - Card grande com todas as informações (categoria, valor, data, descrição)
  - Ícone de categoria em destaque (16x16 com cores da categoria)
  - Informações organizadas em grid responsivo
  - Botões de ação (Editar, Excluir)
  - Botão "Voltar" para navegação
- **Navegação**:
  - Botão "Voltar" → Volta para ExpensesPage
  - Botão "Editar" → Abre ExpenseModal (edição)
  - Botão "Excluir" → Modal de confirmação (a implementar)
- **Aplicação dos 5 Princípios Premium**:
  - ✅ Two-layer shadows no card principal
  - ✅ Color layering (Shade 1-3)
  - ✅ Espaçamento premium (p-6, gap-6)
  - ✅ Tipografia hierárquica (4xl Display, base Body, sm Caption)
  - ✅ Micro-interações (hover nos botões)

### 3. ExpenseModal (`features/expenses/components/ExpenseModal.tsx`)
- **Propósito**: Modal de criação/edição rápida de despesa
- **Features Visuais**:
  - Campo de valor grande (2xl-3xl font) com foco automático
  - Grade de categorias com 8 opções visuais (4 colunas)
  - Campo de data (preenchido com "hoje" por padrão)
  - Campo de descrição opcional e colapsável
  - Teclado numérico otimizado (inputMode="decimal")
  - Contador de caracteres para descrição (max 100)
- **Comportamento**:
  - Ao abrir sem `initialData`: Modo criação
  - Ao abrir com `initialData`: Modo edição (campos pré-preenchidos)
  - Callback `onSave` ao submeter
  - Fecha automaticamente após salvamento bem-sucedido
- **Aplicação dos 5 Princípios Premium**:
  - ✅ Two-layer shadows no botão submit
  - ✅ Color layering nas categorias
  - ✅ Espaçamento premium (space-y-6)
  - ✅ Tipografia hierárquica (2xl-3xl no valor, base nos labels)
  - ✅ Micro-interações (scale em categorias, bounce ao selecionar)

### 4. CategoryGrid (`features/expenses/components/CategoryGrid.tsx`)
- **Propósito**: Grade de seleção visual de categorias
- **Features Visuais**:
  - 8 categorias com ícones Lucide e cores distintas
  - Grid de 4 colunas (responsivo)
  - Categorias: Alimentação, Transporte, Lazer, Casa, Saúde, Compras, Educação, Outros
  - Cada categoria tem ícone, cor e emoji associados
  - Estado de seleção visível (ring, border, shadow)
- **Props**:
  - `selectedCategory`: Categoria atualmente selecionada
  - `onSelectCategory`: Callback ao selecionar categoria
- **Aplicação dos 5 Princípios Premium**:
  - ✅ Two-layer shadows em cada botão
  - ✅ Color layering (8 cores de categoria)
  - ✅ Espaçamento premium (gap-3, p-4)
  - ✅ Micro-interações (scale-105 hover, scale-95 active, bounce)

### 5. ExpenseCard (`features/expenses/components/ExpenseCard.tsx`)
- **Propósito**: Card compacto de despesa para timeline
- **Features Visuais**:
  - Layout horizontal compacto (ícone | info | valor)
  - Ícone de categoria colorido em destaque
  - Categoria, descrição (truncada) e hora
  - Valor em destaque no canto direito
  - Hover state com lift (translate-y)
- **Props**:
  - `expense`: Objeto Expense
  - `onClick`: Callback ao clicar (navegação para detalhes)
- **Aplicação dos 5 Princípios Premium**:
  - ✅ Two-layer shadows
  - ✅ Color layering (bg-white/neutral-900)
  - ✅ Espaçamento premium (p-4, gap-3)
  - ✅ Tipografia hierárquica (sm categoria, base valor, xs hora)
  - ✅ Micro-interações (scale, translate-y)

### 6. DayGroup (`features/expenses/components/DayGroup.tsx`)
- **Propósito**: Agrupamento de despesas por dia com header e total
- **Features Visuais**:
  - Header com data formatada (Hoje, Ontem, ou dia completo)
  - Total do dia calculado e formatado
  - Contador de despesas do dia
  - Separador visual entre dias
  - Lista de ExpenseCards do dia
- **Props**:
  - `date`: Data ISO string (ex: "2024-01-15")
  - `expenses`: Array de Expense do dia
  - `onExpenseClick`: Callback ao clicar em despesa
- **Aplicação dos 5 Princípios Premium**:
  - ✅ Espaçamento premium (space-y-4, space-y-3)
  - ✅ Tipografia hierárquica (2xl Heading, base Body, sm Caption)

### 7. ExpenseFAB (`features/expenses/components/ExpenseFAB.tsx`)
- **Propósito**: Floating Action Button para adicionar despesa
- **Features Visuais**:
  - Botão circular grande (56x56 mobile, 64x64 desktop)
  - Gradiente azul (from-blue-500 to-blue-700)
  - Posição fixa (bottom-6 right-6)
  - Ícone de "+" grande e bold
  - Sombra elevada + inner highlight
- **Props**:
  - `onClick`: Callback ao clicar (abre modal)
- **Aplicação dos 5 Princípios Premium**:
  - ✅ Two-layer shadows (inner + outer)
  - ✅ Micro-interações (scale-110 hover, scale-95 active)
  - ✅ Focus ring para acessibilidade

---

## 🧩 Types e Interfaces

Todos os tipos estão definidos em `types/index.ts`:

### Principais Types:

```typescript
export type ExpenseCategory =
  | 'alimentacao' | 'transporte' | 'lazer' | 'casa'
  | 'saude' | 'compras' | 'educacao' | 'outros';

export interface Expense {
  id: string;
  valor: number;
  categoria: ExpenseCategory;
  data: string; // ISO date
  descricao?: string;
  criadoEm: string; // ISO timestamp
  atualizadoEm: string; // ISO timestamp
}

export interface CategoryMetadata {
  id: ExpenseCategory;
  label: string;
  icon: string; // Nome do ícone Lucide
  color: string; // Tailwind color class
  emoji: string;
}

export const CATEGORIES: CategoryMetadata[] = [
  // 8 categorias pré-definidas
];
```

---

## 🔧 Implementação Necessária (Checklist para Devs)

### Prioridade ALTA (Bloqueantes)

#### API Integration
- [ ] **Criar service/API client para despesas**
  - [ ] Configurar base URL e axios/fetch client
  - [ ] Adicionar interceptors de autenticação (se necessário)

- [ ] **Implementar endpoints de API**
  - [ ] `GET /api/expenses` - Listar todas as despesas (com filtros opcionais)
  - [ ] `GET /api/expenses/:id` - Buscar despesa por ID
  - [ ] `POST /api/expenses` - Criar nova despesa
  - [ ] `PUT /api/expenses/:id` - Atualizar despesa
  - [ ] `DELETE /api/expenses/:id` - Excluir despesa

- [ ] **Integrar API nas páginas**
  - [ ] `ExpensesPage`: Buscar despesas no mount
  - [ ] `ExpenseDetailPage`: Buscar despesa por ID
  - [ ] `ExpenseModal`: Submit para POST/PUT
  - [ ] Atualizar cache local após mutações

#### Gerenciamento de Estado
- [ ] **Implementar React Query ou SWR**
  - [ ] Hook `useExpenses()` para lista
  - [ ] Hook `useExpense(id)` para detalhes
  - [ ] Mutation `useCreateExpense()`
  - [ ] Mutation `useUpdateExpense()`
  - [ ] Mutation `useDeleteExpense()`
  - [ ] Invalidação de cache após mutações

- [ ] **Estados de Loading e Erro**
  - [ ] Skeleton loaders em ExpensesPage
  - [ ] Spinner em ExpenseModal durante submit
  - [ ] Error boundaries para páginas
  - [ ] Retry logic para falhas de API

#### Validação de Formulário
- [ ] **Criar schemas Zod**
  - [ ] `expenseSchema` baseado na interface `Expense`
  - [ ] Validações:
    - `valor`: number > 0, max 2 decimais
    - `categoria`: enum de ExpenseCategory
    - `data`: date não futura
    - `descricao`: string opcional, max 100 chars

- [ ] **Integrar react-hook-form no ExpenseModal**
  - [ ] Configurar formulário com `useForm` + `zodResolver`
  - [ ] Adicionar mensagens de erro de validação
  - [ ] Prevenir submit com dados inválidos
  - [ ] Reset form após submit bem-sucedido

#### Formatação e Máscaras
- [ ] **Formatar valores monetários**
  - [ ] Criar utility `formatCurrency(value: number): string`
  - [ ] Usar `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`
  - [ ] Aplicar em ExpenseCard, ExpenseDetailPage, DayGroup

- [ ] **Formatar datas**
  - [ ] Criar utility `formatDate(date: string, format: 'short' | 'long' | 'relative'): string`
  - [ ] Implementar lógica "Hoje", "Ontem" em DayGroup
  - [ ] Formatar timestamps (criadoEm, atualizadoEm) em ExpenseDetailPage

- [ ] **Máscara de valor monetário no input**
  - [ ] Criar hook `useCurrencyInput()`
  - [ ] Aceitar apenas números e vírgula/ponto
  - [ ] Auto-formatar enquanto digita (ex: 750 → 7,50)
  - [ ] Limitar 2 casas decimais

### Prioridade MÉDIA (Importantes)

#### UX Enhancements
- [ ] **Toast Notifications**
  - [ ] Instalar e configurar biblioteca de toast (ex: sonner, react-hot-toast)
  - [ ] Toast de sucesso ao criar/editar/excluir
  - [ ] Toast de erro com mensagem legível

- [ ] **Modal de Confirmação de Exclusão**
  - [ ] Criar componente `ConfirmDialog`
  - [ ] Integrar em ExpenseDetailPage antes de deletar
  - [ ] Texto: "Tem certeza que deseja excluir esta despesa? Esta ação não pode ser desfeita."

- [ ] **Filtros e Busca em ExpensesPage**
  - [ ] Adicionar barra de busca por descrição
  - [ ] Filtro por categoria (dropdown multi-select)
  - [ ] Filtro por período (date range picker)
  - [ ] Implementar debounce na busca (300ms)

- [ ] **Paginação ou Scroll Infinito**
  - [ ] Implementar scroll infinito (react-intersection-observer)
  - [ ] Carregar 20-30 despesas por vez
  - [ ] Indicador de loading ao carregar mais

- [ ] **Empty States Personalizados**
  - [ ] Empty state em ExpensesPage quando não há despesas
  - [ ] Empty state quando busca não retorna resultados
  - [ ] Ilustração SVG ou emoji amigável

#### Navegação e Acessibilidade
- [ ] **Breadcrumbs**
  - [ ] Adicionar breadcrumbs em ExpenseDetailPage
  - [ ] Formato: `Home > Despesas > [Categoria] - R$ [Valor]`

- [ ] **Navegação por Teclado**
  - [ ] Modal fecha com ESC
  - [ ] Tab navigation funcional
  - [ ] Enter no campo valor foca em categorias
  - [ ] Setas navegam entre categorias

- [ ] **ARIA Labels e Semântica**
  - [ ] Adicionar `aria-label` em ícones e botões
  - [ ] `role="button"` em elementos clicáveis customizados
  - [ ] `aria-live` em toasts e mensagens de erro

### Prioridade BAIXA (Melhorias Futuras)

#### Features Avançadas
- [ ] **Estatísticas e Insights**
  - [ ] Gráfico de despesas por categoria (integrar com /summary)
  - [ ] Total do mês destacado
  - [ ] Comparação com mês anterior

- [ ] **Exportação de Dados**
  - [ ] Exportar despesas para CSV
  - [ ] Exportar período específico
  - [ ] Filtrar categorias antes de exportar

- [ ] **Edição Rápida (Inline)**
  - [ ] Permitir editar valor/descrição diretamente no card (modo inline)
  - [ ] Salvar com Enter, cancelar com ESC

- [ ] **Drag & Drop para Reordenar**
  - [ ] Permitir arrastar despesas para mudar data (mobile-friendly)

#### Otimizações
- [ ] **Virtualização de Lista**
  - [ ] Implementar `react-window` ou `react-virtual` para listas longas
  - [ ] Renderizar apenas despesas visíveis no viewport

- [ ] **Lazy Loading de Imagens**
  - [ ] Se adicionar fotos de recibos no futuro
  - [ ] Usar `next/image` com loading="lazy"

- [ ] **PWA e Offline Mode**
  - [ ] Service worker para cache de despesas
  - [ ] Sincronização quando voltar online
  - [ ] IndexedDB para persistência local

#### Testes
- [ ] **Testes Unitários**
  - [ ] Testar componentes isoladamente (Jest + RTL)
  - [ ] Testar utilities (formatCurrency, formatDate)
  - [ ] Testar schemas Zod

- [ ] **Testes de Integração**
  - [ ] Testar fluxo completo de criação de despesa
  - [ ] Testar edição e exclusão
  - [ ] Testar navegação entre páginas

- [ ] **Testes E2E**
  - [ ] Playwright ou Cypress
  - [ ] Cenário: Adicionar 3 despesas em sequência
  - [ ] Cenário: Editar despesa existente
  - [ ] Cenário: Excluir despesa com confirmação

---

## 📚 Referências Técnicas

### Componentes Shadcn/UI Utilizados
- `Button` - Botões de ação
- `Card`, `CardContent`, `CardHeader`, `CardTitle` - Containers de conteúdo
- `Input` - Campos de texto e numéricos
- `Label` - Rótulos de formulário
- `Textarea` - Campo de descrição
- `Badge` - Categorias e status
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogFooter` - Modais
- `Separator` - Divisores visuais

### Ícones (Lucide React)
Importar de `lucide-react`:
- Categorias: `UtensilsCrossed`, `Car`, `Gamepad2`, `Home`, `Heart`, `ShoppingBag`, `GraduationCap`, `MoreHorizontal`
- Ações: `Plus`, `Edit`, `Trash2`, `Save`, `ArrowLeft`, `X`
- Informações: `Calendar`, `Clock`, `FileText`, `DollarSign`

### Mapeamento de Cores por Categoria

```typescript
// Tailwind classes dinâmicas
const colorMap = {
  alimentacao: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600' },
  transporte: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600' },
  lazer: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600' },
  casa: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600' },
  saude: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600' },
  compras: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-600' },
  educacao: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600' },
  outros: { bg: 'bg-neutral-100 dark:bg-neutral-800', text: 'text-neutral-600' },
};
```

---

## 🚀 Como Usar Este Módulo

### 1. Integração no Projeto

Com Next.js App Router, a feature já está integrada automaticamente pela estrutura de arquivos.

Para adicionar no menu/navegação principal:
1. Execute `/design:integrate` para criar layout global com sidebar
2. Ou adicione manualmente um link no layout raiz:

```typescript
import Link from 'next/link';

<Link href="/expenses">
  <Button>Despesas</Button>
</Link>
```

### 2. Navegação Externa

De outras partes do app:

```typescript
import Link from 'next/link';

// Link para lista de despesas
<Link href="/expenses">Ver Despesas</Link>

// Link para detalhes de uma despesa
<Link href={`/expenses/${expenseId}`}>Ver Detalhes</Link>
```

### 3. Desenvolvimento Incremental

Sugestão de ordem de implementação:

#### Phase 1: Read-Only (1-2 dias)
1. Implementar API GET endpoints (backend)
2. Criar React Query hooks (`useExpenses`, `useExpense`)
3. Conectar ExpensesPage e ExpenseDetailPage
4. Implementar formatação de datas e valores
5. Testar visualização de dados mockados

#### Phase 2: CRUD Completo (2-3 dias)
1. Implementar validação Zod no ExpenseModal
2. Integrar react-hook-form
3. Implementar API POST/PUT/DELETE (backend)
4. Criar mutations React Query
5. Adicionar toasts de feedback
6. Implementar modal de confirmação de exclusão
7. Testar criação, edição e exclusão

#### Phase 3: UX Refinements (1-2 dias)
1. Adicionar filtros e busca
2. Implementar paginação/scroll infinito
3. Adicionar máscaras de input
4. Skeleton loaders
5. Empty states personalizados
6. Testes de usabilidade

#### Phase 4: Optimizations (opcional)
1. Virtualização de lista
2. PWA/offline mode
3. Testes automatizados
4. Performance profiling

---

## ⚠️ Notas Importantes

### Visual-Only Limitations

Este módulo contém APENAS a estrutura visual. **NÃO** espere encontrar:
- ❌ Chamadas de API funcionais
- ❌ Validação de formulários com Zod
- ❌ Gerenciamento de estado com React Query/SWR
- ❌ Tratamento de erros robusto
- ❌ Autenticação/autorização
- ❌ Máscaras de input funcionais
- ❌ Formatação monetária correta (usando mock)

Tudo isso deve ser implementado pela equipe de desenvolvimento seguindo o checklist acima.

### Mock Data

Os dados mockados presentes nos componentes são APENAS para demonstração visual. Substitua por:
- Chamadas reais de API com React Query
- Estados de loading/erro adequados
- Tratamento de casos extremos (listas vazias, erros de rede, etc.)
- Formatação correta de datas e valores monetários

### Customização

Você pode (e deve):
- Ajustar o layout conforme necessário
- Adicionar novos componentes
- Modificar a estrutura de navegação
- Estender as interfaces de tipos
- Adicionar mais categorias (atualizar `CATEGORIES` em `types/index.ts`)

Mas mantenha:
- Consistência com o sistema de design (5 Princípios Premium)
- Organização modular clara
- Documentação atualizada
- Dark mode em todos os elementos

### Performance Considerations

- Para listas com >100 despesas, implementar virtualização
- Debounce na busca (300ms mínimo)
- Lazy loading de componentes pesados
- Memoização de componentes que não mudam (React.memo)

---

## 📞 Suporte e Próximos Passos

### Para Ajustes Visuais
- Consulte o spec original: `specs/expenses.md`
- Revise o sistema de design: `design.md` e `.claude/design-system/`
- Execute `/design:refine expenses` para melhorias visuais adicionais

### Para Integração Global
- Execute `/design:integrate` para criar app navegável com sidebar e homepage

### Para Validação
- Execute `/design:validate-spec specs/expenses.md` para verificar completude do spec

---

**Gerado em**: 2025-11-15
**Versão**: 1.0
**Status**: ✅ Pronto para implementação de lógica de negócio

---

## 🎨 Refinamentos Premium v2.0.0

> Refinado com `/design:refine` em 2025-11-15

### Componentes Avançados Aplicados

| Componente | Registry | Onde foi aplicado | Benefício |
|------------|----------|-------------------|-----------|
| InView | @motion-primitives | DayGroup (wrapper completo) | Animação ao entrar no viewport durante scroll |
| AnimatedGroup | @motion-primitives | DayGroup (lista de despesas) | Animação coordenada com stagger blur-slide |

### Melhorias de UX (80% - 5 Princípios Premium)

✅ **Two-Layer Shadows**:
- ExpenseCard: `shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-sm` + hover intensificado
- ExpenseDetailPage: Card principal com two-layer shadow
- Empty state: Shadow aplicada ao container
- CategoryGrid: Botões com inner shadows

✅ **Color Layering (Shade 1-4)**:
- Shade 1 (Page): `bg-neutral-50 dark:bg-neutral-950` em todas as páginas
- Shade 2 (Cards): `bg-white dark:bg-neutral-900` nos cards
- Shade 3 (Interactive): `bg-neutral-100 dark:bg-neutral-800` nos ícones
- Shade 4 (Hover): States aplicados em botões e cards

✅ **Espaçamentos Premium (Base 24px)**:
- Pages: `p-6 md:p-8` aplicado
- Containers: `space-y-8` entre seções principais
- DayGroup: `space-y-6` e `gap-4` nas listas
- CategoryGrid: `gap-4` no grid

✅ **Tipografia Hierárquica (5 níveis)**:
- Display: `text-4xl md:text-5xl font-bold tracking-tight leading-tight`
- Heading: `text-xl md:text-2xl font-semibold tracking-tight`
- Body: `text-base leading-relaxed`
- Caption: `text-sm font-medium`
- Helper: `text-xs`

✅ **Micro-interações**:
- Cards: `hover:scale-[1.01] hover:-translate-y-1` com `duration-300`
- Botões: `hover:scale-[1.02] active:scale-[0.98]` com `duration-200`
- Ícones: `hover:scale-110` em categorias
- FAB: `hover:scale-110 active:scale-95`

### Melhorias de UX (20% - Componentes MCP)

✅ **Animação de Viewport** (@motion-primitives/in-view):
- Aplicado como wrapper completo do DayGroup
- Anima todo o grupo ao entrar no viewport durante scroll
- Efeito: `opacity + y + blur` (0→1, 30→0, blur→nítido)
- Transição suave de 0.5s com easing
- Margin negativa para trigger antecipado

✅ **Animações de Lista** (@motion-primitives/animated-group):
- Aplicado em DayGroup para animar lista de ExpenseCards
- Preset: `blur-slide` (blur + movimento vertical)
- Stagger automático de 0.1s entre cada card
- Melhora percepção de qualidade e fluidez

### Performance

- Todas animações respeitam `prefers-reduced-motion`
- Stagger limitado para evitar lag em listas longas
- InView usa Intersection Observer nativo para performance
- Animações apenas quando elementos entram no viewport
- Componentes otimizados para dark mode

### Arquivos Modificados

- ✅ `src/app/expenses/page.tsx` - 5 princípios aplicados
- ✅ `src/app/expenses/[id]/page.tsx` - 5 princípios aplicados
- ✅ `src/features/expenses/components/DayGroup.tsx` - 5 princípios + InView + AnimatedGroup
- ✅ `src/features/expenses/components/ExpenseCard.tsx` - 5 princípios aplicados
- ✅ `src/features/expenses/components/CategoryGrid.tsx` - 5 princípios aplicados
- ✅ `src/features/expenses/components/ExpenseModal.tsx` - 5 princípios aplicados

### Próximos Passos

Para refinamentos adicionais, execute novamente:
```bash
/design:refine expenses
```

---

## 🎯 Critérios de Sucesso (Do Spec Original)

Esta feature será considerada bem-sucedida quando:

1. ✅ **Adicionar Despesa**:
   - FAB sempre visível e acessível
   - Modal abre em <1 segundo
   - Campo de valor com foco automático
   - Grade de categorias visual e rápida
   - Salvar em <3 toques totais
   - Feedback de sucesso imediato

2. ✅ **Visualizar Despesas**:
   - Timeline agrupada por dia
   - Cards clicáveis e informativos
   - Empty state amigável
   - Performance fluida (60fps)

3. ✅ **Editar Despesa**:
   - Formulário pré-preenchido
   - Validação clara e não-agressiva
   - Alterações refletem imediatamente

4. ✅ **Excluir Despesa**:
   - Confirmação antes de deletar
   - Feedback de sucesso
   - Atualização automática da lista

5. ✅ **UX/UI**:
   - Responsivo e otimizado para mobile
   - Dark mode funcionando
   - Animações suaves (300ms transitions)
   - Feedback visual em todas as ações

**Meta de velocidade**: Adicionar uma despesa completa em ≤10 segundos.
