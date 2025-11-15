# Feature: Resumo

## Objetivo

Apresentar uma visão consolidada e visual dos gastos do usuário para gerar **consciência financeira** sem julgamento ou ansiedade. Esta feature é o "momento de reflexão" do app - onde o usuário entende para onde seu dinheiro foi.

O resumo deve ser **simples e bonito**: um número grande mostrando o total gasto, um gráfico claro mostrando a distribuição por categorias, e insights básicos que ajudem o usuário a identificar padrões.

A linguagem deve ser **positiva e não-punitiva**. Em vez de "Você gastou DEMAIS com comida!", usar "40% dos seus gastos foram com alimentação". O objetivo é informar, não alarmar.

## Critérios de Aceitação

### Visão Geral do Período
- [ ] Número grande e destacado mostrando total gasto no período selecionado
- [ ] Seletor de período visível e fácil de usar (Mês atual, Últimos 30 dias, Custom)
- [ ] Comparação opcional com período anterior (Ex: "12% a mais que o mês passado")
- [ ] Indicador visual se gastou mais ou menos (ícone sutil, sem cores alarmantes)

### Gráfico de Distribuição por Categoria
- [ ] Gráfico de rosca (donut chart) mostrando proporção de cada categoria
- [ ] Cores consistentes com as categorias (mesmo esquema do histórico)
- [ ] Percentual visível para cada categoria (Ex: 40%, 25%)
- [ ] Legenda clara com nome da categoria + valor absoluto + percentual
- [ ] Interativo: toque em fatia destaca categoria
- [ ] Responsivo: adapta tamanho para diferentes telas

### Detalhamento por Categoria
- [ ] Lista ordenada por valor (maior gasto primeiro)
- [ ] Cada item mostra: ícone, nome da categoria, valor total, percentual, barra de progresso
- [ ] Barra de progresso visual para comparar categorias rapidamente
- [ ] Número de transações por categoria (Ex: "12 despesas")
- [ ] Toque em categoria filtra histórico para aquela categoria

### Insights Automáticos
- [ ] Cartão com insight principal (Ex: "Sua maior despesa: Alimentação - R$ 400")
- [ ] Média de gasto por dia no período
- [ ] Dia da semana com mais gastos (opcional)
- [ ] Categoria que mais cresceu vs período anterior (opcional)
- [ ] Linguagem amigável e não-julgadora

### Período de Análise
- [ ] Seletor de período no topo da tela
- [ ] Opções pré-definidas: Mês atual, Últimos 30 dias, Últimos 7 dias
- [ ] Opção customizada com date picker
- [ ] Transição suave ao mudar período
- [ ] Loading state durante cálculos

### Empty States
- [ ] Quando não há despesas no período: mensagem clara + CTA
- [ ] Quando período selecionado está no futuro: mensagem orientando ajuste
- [ ] Ilustração amigável para empty states

## Campos Calculados

| Campo | Tipo | Cálculo | Exibição |
|-------|------|---------|----------|
| totalGasto | Number | Soma de todas despesas do período | R$ 0.000,00 (grande, destacado) |
| gastosPorCategoria | Array | Agrupa e soma por categoria | Lista + Gráfico |
| percentualPorCategoria | Number | (valor_categoria / total) × 100 | XX% |
| comparacaoPeriodoAnterior | Number | ((atual - anterior) / anterior) × 100 | +XX% ou -XX% |
| mediaPorDia | Number | total / dias_periodo | R$ XX,XX/dia |
| numeroDespesas | Number | Contagem total de transações | XX despesas |
| categoriaComMaisGastos | Object | Categoria com maior valor | Nome + valor |

## Cenários de Uso

| ID | Cenário | Input | Output Esperado |
|----|---------|-------|-----------------|
| 01 | Visualizar resumo do mês atual | Período: Mês atual, 20 despesas | Total, gráfico e lista de categorias |
| 02 | Comparar com mês anterior | Período: Mês atual com 20% a mais | Badge "+20% vs mês passado" |
| 03 | Visualizar resumo vazio | Período: Sem despesas | Empty state com CTA |
| 04 | Alternar para últimos 30 dias | Mudar seletor para "30 dias" | Dados recalculados instantaneamente |
| 05 | Tocar em categoria Alimentação | Clicar em fatia do gráfico | Navega para histórico filtrado |
| 06 | Tocar em categoria na lista | Clicar em item da lista | Navega para histórico filtrado |
| 07 | Visualizar insight principal | 40% gasto em alimentação | "Sua maior despesa: Alimentação - R$ 400 (40%)" |
| 08 | Calcular média por dia | 30 dias, R$ 900 total | "Média de R$ 30,00 por dia" |
| 09 | Período customizado (semana passada) | Date picker: 08-14 Jan | Dados da semana selecionada |
| 10 | Período com uma única despesa | 1 despesa de R$ 50 | Gráfico com 100% em uma categoria |

## Fluxos de Tela

### Fluxo Principal: Visualização do Resumo
```
Bottom Navigation
    ↓ [Toque em "Resumo"]
Tela de Resumo
    - Header com seletor de período
    - Card "Total Gasto" (grande, destacado)
    - Card "Comparação" (se aplicável)
    - Gráfico de Rosca
    - Lista de Categorias (detalhamento)
    - Card de Insights

[Opções de interação]
    ↓ [Toque em fatia do gráfico]
    → Histórico filtrado por categoria

    ↓ [Toque em categoria na lista]
    → Histórico filtrado por categoria

    ↓ [Mudar período]
    → Recalcula dados + animação de transição
```

### Fluxo de Seleção de Período
```
Tela de Resumo
    ↓ [Toque no seletor de período]
Sheet/Dropdown de Períodos
    - Mês atual (selecionado)
    - Últimos 30 dias
    - Últimos 7 dias
    - ─────────────
    - Personalizado (abre date picker)
    ↓ [Selecionar "Últimos 30 dias"]
Loading skeleton (300ms)
    ↓
Resumo recalculado com novos dados
```

### Fluxo de Drill-down por Categoria
```
Tela de Resumo
    ↓ [Toque em "Alimentação" (40% - R$ 400)]
Tela de Histórico
    - Filtro de categoria "Alimentação" pré-aplicado
    - Badge "1 filtro ativo"
    - Lista mostrando apenas despesas de alimentação
    - Botão "Limpar filtro" visível
```

## Requisitos Visuais

### Layout e Hierarquia
**Card Total Gasto:**
- Background com gradient sutil
- Valor em fonte display (48-56px)
- Label "Total gasto em Janeiro" (text-sm)
- Two-layer shadow para destaque

**Gráfico de Rosca:**
- Tamanho: 280-320px em mobile, 400px em desktop
- Espessura do anel: 40-60px
- Espaçamento entre fatias: 2px
- Centro pode mostrar total ou categoria selecionada

**Lista de Categorias:**
- Items com 64-72px de altura
- Ícone 32px + nome + valor + barra de progresso
- Barra de progresso com cor da categoria (opacity 0.3)

### Componentes Premium (5 Princípios)
- **Two-layer shadows**:
  - Card total: `shadow-lg + inner glow`
  - Cards de insights: `shadow-md + inner highlight`
- **Color layering**:
  - Background do card: Shade 1
  - Valor total: Shade 4 (máximo destaque)
  - Labels: Shade 3
  - Gráfico: cores vibrantes das categorias
- **Espaçamentos premium**:
  - gap-8 entre seções principais
  - p-8 nos cards grandes
  - p-6 nos cards de insight
- **Tipografia hierárquica**:
  - Valor total: Display (text-5xl font-bold)
  - Títulos de seção: Heading (text-xl font-semibold)
  - Labels: Body (text-base)
  - Percentuais: Caption (text-sm)
  - Hints: Helper (text-xs)
- **Micro-interações**:
  - Gráfico anima ao carregar (draw animation)
  - Fatias destacam em hover/press (scale 1.05)
  - Transição suave ao mudar período (fade + slide)
  - Números animam ao mudar (count-up effect)

### Paleta do Gráfico
Usar cores consistentes das categorias:
```typescript
const categoryColors = {
  Alimentação: "hsl(var(--orange))",
  Transporte: "hsl(var(--blue))",
  Lazer: "hsl(var(--purple))",
  Casa: "hsl(var(--green))",
  Saúde: "hsl(var(--red))",
  Compras: "hsl(var(--pink))",
  Educação: "hsl(var(--indigo))",
  Outros: "hsl(var(--gray))"
}
```

### Estados Visuais
- **Loading**: Skeleton para cards + spinner no gráfico
- **Empty**: Ilustração + texto + CTA para adicionar despesas
- **Erro**: Toast com mensagem amigável
- **Hover (gráfico)**: Fatia destacada + tooltip com detalhes
- **Selected (categoria)**: Background highlight na lista

## Cálculos - Especificação Detalhada

### Total Gasto
```typescript
function calculateTotal(expenses: Expense[], period: Period): number {
  return expenses
    .filter(exp => isInPeriod(exp.date, period))
    .reduce((sum, exp) => sum + exp.value, 0)
}
```

### Gastos por Categoria
```typescript
function groupByCategory(expenses: Expense[]): CategoryGroup[] {
  const groups = expenses.reduce((acc, exp) => {
    if (!acc[exp.category]) {
      acc[exp.category] = { total: 0, count: 0, expenses: [] }
    }
    acc[exp.category].total += exp.value
    acc[exp.category].count += 1
    acc[exp.category].expenses.push(exp)
    return acc
  }, {})

  return Object.entries(groups)
    .map(([category, data]) => ({
      category,
      total: data.total,
      count: data.count,
      percentage: (data.total / calculateTotal(expenses)) * 100
    }))
    .sort((a, b) => b.total - a.total)
}
```

### Comparação com Período Anterior
```typescript
function compareWithPreviousPeriod(current: number, previous: number) {
  if (previous === 0) return null
  const change = ((current - previous) / previous) * 100
  return {
    percentage: change,
    direction: change > 0 ? "up" : "down",
    label: change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`
  }
}
```

## Insights - Exemplos de Mensagens

### Insight Principal
- "Sua maior despesa: [Categoria] - R$ [valor] ([XX]%)"
- "Você fez [XX] despesas este mês"
- "Média de R$ [XX] por dia"

### Comparação
- "Você gastou [XX]% a mais que o mês passado"
- "Você economizou [XX]% comparado ao mês passado"
- "Seus gastos se mantiveram estáveis"

### Padrões (opcional)
- "[Categoria] é sua despesa mais frequente ([XX] vezes)"
- "Você gasta mais às [dia da semana]"
- "[Categoria] cresceu [XX]% este mês"

## Notas para Desenvolvimento

### Prioridades de Implementação
**Alta:**
- Cálculo de totais e agrupamentos
- Gráfico de rosca funcional e responsivo
- Lista de categorias ordenada
- Seletor de período

**Média:**
- Comparação com período anterior
- Insights automáticos
- Animações do gráfico
- Drill-down para histórico

**Baixa:**
- Exportação de relatório (PDF/CSV)
- Gráficos alternativos (barras, linhas)
- Insights avançados (ML/padrões)

### Considerações Técnicas
- Usar biblioteca de gráficos leve (recharts, nivo, chart.js)
- Memoizar cálculos para evitar reprocessamento
- Usar Web Workers para cálculos pesados (opcional)
- Cachear resultados por período em localStorage
- Implementar debounce ao mudar período

### Dados de Teste
Criar dataset que demonstre:
- 8 categorias com distribuição variada (40%, 25%, 15%, 8%, 5%, 3%, 2%, 2%)
- Total significativo (R$ 1.200 - R$ 2.500)
- Comparação positiva e negativa com mês anterior
- Períodos vazios para testar empty states
- Categoria única (100%) para testar edge case

### Bibliotecas Recomendadas
- **Gráficos**: recharts (leve, responsivo, customizável)
- **Formatação**: Intl.NumberFormat (nativo)
- **Datas**: date-fns (já usado no histórico)
- **Animações**: framer-motion (já no projeto)
