# Feature: Histórico

## Objetivo

Exibir todas as despesas do usuário em ordem cronológica reversa (mais recentes primeiro), agrupadas por data de forma intuitiva. Esta é a **tela principal** do app - o primeiro lugar que o usuário vê ao abrir o Stash.

O histórico deve ser **escaneável** - o usuário deve conseguir visualizar rapidamente seus gastos recentes sem precisar rolar muito. A apresentação deve ser **clara e não-ansiogênica**: mostrar informações sem julgar ou alarmar.

O design deve facilitar **ações rápidas**: o usuário deve conseguir tocar em uma despesa para ver detalhes, editar ou excluir com mínima fricção.

## Critérios de Aceitação

### Visualização do Histórico
- [ ] Lista exibe todas as despesas em ordem cronológica reversa (mais recente no topo)
- [ ] Despesas são agrupadas por data com headers claros
- [ ] Headers de data usam linguagem natural: "Hoje", "Ontem", depois "Segunda, 13 Jan"
- [ ] Cada item mostra: ícone da categoria, descrição/categoria, valor formatado
- [ ] Valor é destacado visualmente (maior e em negrito)
- [ ] Ícone da categoria tem cor correspondente
- [ ] Lista usa virtualização para performance com muitos itens

### Agrupamento por Data
- [ ] Despesas do dia atual aparecem sob "Hoje"
- [ ] Despesas de ontem aparecem sob "Ontem"
- [ ] Despesas dos últimos 7 dias usam dia da semana (Ex: "Terça, 12 Jan")
- [ ] Despesas mais antigas usam data completa (Ex: "15 de Dezembro, 2024")
- [ ] Total do dia aparece no header de cada grupo
- [ ] Grupos colapsáveis para datas antigas (opcional)

### Filtragem e Busca
- [ ] Filtro por categoria (dropdown ou chips)
- [ ] Filtro por período (Mês atual, Últimos 30 dias, Personalizado)
- [ ] Busca por descrição (campo de texto com ícone de lupa)
- [ ] Filtros aplicam-se instantaneamente
- [ ] Badge mostra número de filtros ativos
- [ ] Botão para limpar todos os filtros

### Ações por Despesa
- [ ] Toque em uma despesa abre tela de detalhes
- [ ] Swipe para esquerda revela ações: Editar e Excluir
- [ ] Confirmação antes de excluir via swipe
- [ ] Feedback visual para ações (animação, toast)

### Empty States
- [ ] Quando não há despesas: ilustração amigável + CTA para adicionar primeira despesa
- [ ] Quando filtros não retornam resultados: mensagem clara + botão para limpar filtros
- [ ] Animação sutil ao adicionar primeira despesa

### Performance e UX
- [ ] Scroll suave e performático (mesmo com 1000+ despesas)
- [ ] Pull-to-refresh para atualizar lista (mobile)
- [ ] Loading skeleton enquanto carrega despesas
- [ ] Lazy loading de grupos de datas antigas
- [ ] Transições suaves ao adicionar/remover despesas

## Campos Exibidos

| Campo | Exibição | Formato | Posição |
|-------|----------|---------|---------|
| Categoria (ícone) | Sempre | Ícone colorido (24x24px) | Esquerda |
| Descrição | Se existir | Texto (Body) | Centro (linha 1) |
| Categoria (nome) | Se não há descrição | Texto (Body) | Centro (linha 1) |
| Valor | Sempre | R$ 0.000,00 | Direita (destaque) |
| Data | No header do grupo | "Hoje", "Ontem", etc. | Header |
| Total do dia | No header do grupo | R$ 0.000,00 | Header (direita) |

## Cenários de Uso

| ID | Cenário | Input | Output Esperado |
|----|---------|-------|-----------------|
| 01 | Visualizar histórico vazio | Usuário novo sem despesas | Empty state com CTA para adicionar primeira despesa |
| 02 | Visualizar despesas de hoje | 3 despesas adicionadas hoje | Grupo "Hoje" com 3 itens e total do dia |
| 03 | Visualizar despesas de ontem | 2 despesas de ontem | Grupo "Ontem" com 2 itens |
| 04 | Visualizar histórico completo | Despesas dos últimos 30 dias | Grupos agrupados por data com headers apropriados |
| 05 | Filtrar por categoria "Alimentação" | Selecionar filtro Alimentação | Apenas despesas de alimentação visíveis |
| 06 | Filtrar por período "Este mês" | Selecionar filtro "Mês atual" | Apenas despesas do mês atual |
| 07 | Buscar por descrição "Uber" | Digitar "Uber" na busca | Apenas despesas com "Uber" na descrição |
| 08 | Limpar filtros ativos | Clicar em "Limpar filtros" | Todos os filtros removidos, lista completa |
| 09 | Tocar em uma despesa | Toque em item da lista | Navega para tela de detalhes |
| 10 | Swipe para excluir | Swipe esquerda + confirmar | Despesa removida, lista atualiza |
| 11 | Pull to refresh | Puxar tela para baixo | Lista recarrega (se houver dados remotos) |
| 12 | Scroll em lista longa | Scroll em lista com 500+ itens | Performance suave, virtualização funciona |

## Fluxos de Tela

### Fluxo Principal: Visualização
```
Splash/Loading Screen
    ↓
Tela de Histórico (Principal)
    - Header com título "Stash" + filtros
    - Lista agrupada por data
    - FAB "+" no canto inferior direito
    - Bottom nav (Histórico, Resumo)

[Opções de navegação]
    ↓ [Toque no FAB]
    → Modal de Nova Despesa

    ↓ [Toque em uma despesa]
    → Tela de Detalhes

    ↓ [Toque em filtros]
    → Sheet/Modal de Filtros

    ↓ [Toque em Resumo no nav]
    → Tela de Resumo
```

### Fluxo de Filtragem
```
Tela de Histórico
    ↓ [Toque no ícone de filtro]
Sheet de Filtros
    - Seção "Categoria" (chips multi-select)
    - Seção "Período" (radio buttons)
    - Seção "Busca" (campo de texto)
    - Botão "Aplicar" + "Limpar"
    ↓ [Aplicar filtros]
Histórico filtrado
    - Badge mostrando filtros ativos
    - Botão "Limpar filtros" visível
```

### Fluxo de Ação Rápida (Swipe)
```
Tela de Histórico
    ↓ [Swipe esquerda em uma despesa]
Ações reveladas
    - Botão "Editar" (azul)
    - Botão "Excluir" (vermelho)
    ↓ [Toque em "Excluir"]
Modal de Confirmação
    ↓ [Confirmar]
Toast de sucesso → Despesa removida → Lista atualiza
```

## Requisitos Visuais

### Layout e Hierarquia
- **Header de data**: Sticky, background com blur, sombra sutil
- **Item de despesa**: Card com padding generoso (16-24px)
- **Espaçamento entre items**: 8-12px
- **Espaçamento entre grupos**: 24-32px

### Componentes Premium (5 Princípios)
- **Two-layer shadows**:
  - Cards de despesa: `shadow-sm + inner shadow`
  - Headers sticky: `shadow-md + backdrop-blur`
- **Color layering**:
  - Ícones com background Shade 2
  - Valores em Shade 4 (destaque máximo)
  - Headers em Shade 1
- **Espaçamentos premium**:
  - gap-6 entre elementos
  - p-6 nos cards
  - p-8 nos headers
- **Tipografia hierárquica**:
  - Headers de data: Heading (text-lg font-semibold)
  - Categoria/Descrição: Body (text-base)
  - Valor: Display (text-xl font-bold)
  - Total do dia: Body Bold (text-sm font-semibold)
- **Micro-interações**:
  - Swipe suave com spring physics
  - Bounce ao remover item
  - Fade in ao adicionar item
  - Transitions 200-300ms

### Estados Visuais
- **Loading**: Skeleton com shimmer animation
- **Empty**: Ilustração SVG + texto + CTA button
- **Filtrado**: Badge com número de filtros ativos
- **Swipe action**: Background colorido revelado progressivamente
- **Scroll**: Shadow no header aumenta ao rolar

### Responsividade
- **Mobile** (< 768px): 1 coluna, cards full-width
- **Tablet** (768-1024px): 2 colunas para lista (opcional)
- **Desktop** (> 1024px): Sidebar + lista, max-width para legibilidade

## Agrupamento de Datas - Especificação Detalhada

```typescript
// Lógica de agrupamento (para referência visual)
function getDateGroupLabel(date: Date): string {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (isSameDay(date, today)) return "Hoje"
  if (isSameDay(date, yesterday)) return "Ontem"
  if (isWithinLastWeek(date)) return formatWeekday(date) // "Terça, 12 Jan"
  return formatLongDate(date) // "15 de Dezembro, 2024"
}
```

### Exemplos de Headers
| Data da Despesa | Header Exibido | Total do Dia |
|-----------------|----------------|--------------|
| 15/01/2025 (hoje) | **Hoje** | **R$ 87,50** |
| 14/01/2025 (ontem) | **Ontem** | **R$ 42,00** |
| 13/01/2025 (segunda) | **Segunda, 13 Jan** | **R$ 120,00** |
| 05/01/2025 | **5 de Janeiro, 2025** | **R$ 65,00** |

## Filtragem - Especificação Detalhada

### Filtro por Categoria
- Tipo: Multi-select (pode selecionar múltiplas)
- UI: Chips coloridos com ícones
- Comportamento: AND (mostra despesas que têm QUALQUER categoria selecionada)

### Filtro por Período
- Tipo: Single-select (radio)
- Opções:
  - Mês atual (padrão)
  - Últimos 30 dias
  - Últimos 7 dias
  - Personalizado (date picker)

### Busca
- Campo de texto com debounce (300ms)
- Case-insensitive
- Busca em: descrição + categoria
- Clear button visível quando há texto

### Estado de Filtros
```typescript
interface FilterState {
  categories: string[] // ["Alimentação", "Transporte"]
  period: "current-month" | "last-30-days" | "last-7-days" | "custom"
  customRange?: { start: Date; end: Date }
  searchQuery: string
}
```

## Notas para Desenvolvimento

### Prioridades de Implementação
**Alta:**
- Lista virtualizada para performance
- Agrupamento por data funcional
- Swipe actions em mobile
- Estados de loading e empty

**Média:**
- Filtragem e busca
- Pull-to-refresh
- Animações de lista
- Sticky headers

**Baixa:**
- Lazy loading de grupos antigos
- Exportação de lista
- Estatísticas inline (média por dia, etc.)

### Considerações Técnicas
- Usar `react-window` ou `@tanstack/react-virtual` para virtualização
- Implementar memoização para cálculos de totais
- Agrupar dados no cliente (não depender de API para isso)
- Persistir estado de filtros em localStorage
- Testar performance com dataset de 1000+ despesas

### Dados de Teste
Incluir dataset variado:
- 10 despesas hoje
- 5 despesas ontem
- 20 despesas últimos 7 dias
- 50 despesas últimos 30 dias
- 100 despesas últimos 90 dias
