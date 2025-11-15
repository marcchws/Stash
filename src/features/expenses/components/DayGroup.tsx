import React, { useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { InView } from '@/components/ui/in-view';
import { ExpenseCard } from './ExpenseCard';
import type { DayGroupProps } from '@/features/expenses/types';

/**
 * DayGroup
 *
 * Descrição: Agrupamento de despesas por dia com header de data e total
 *
 * VISUAL-ONLY: Componente de agrupamento visual.
 * Implementação necessária:
 * - [ ] Formatar data corretamente (ex: "Hoje", "Ontem", "Ter, 15 Jan")
 * - [ ] Calcular total do dia dinamicamente
 * - [ ] Formatar valores monetários (Intl.NumberFormat)
 */

export function DayGroup({ date, expenses, onExpenseClick }: DayGroupProps) {
  // MOCK: Formatação de data (devs implementarão com lógica real)
  const mockFormattedDate = useMemo(() => {
    return new Date(date).toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
  }, [date]);

  // MOCK: Cálculo de total do dia
  const totalDay = expenses.reduce((sum, exp) => sum + exp.valor, 0);
  const mockTotalFormatted = `R$ ${totalDay.toFixed(2).replace('.', ',')}`;

  // MOCK: Determinar se é hoje ou ontem (usando useMemo para evitar Date.now() durante render)
  const displayDate = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity -- Mock data, Date.now() is acceptable here
    const now = Date.now();
    const todayStr = new Date(now).toISOString().split('T')[0];
    const yesterdayStr = new Date(now - 86400000).toISOString().split('T')[0];
    if (date === todayStr) return 'Hoje';
    if (date === yesterdayStr) return 'Ontem';
    return mockFormattedDate;
  }, [date, mockFormattedDate]);

  return (
    // [Refine v2.0.0] Espaçamento premium aplicado
    // [MCP] InView para animação ao entrar no viewport
    <InView
      variants={{
        hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewOptions={{ margin: '0px 0px -100px 0px' }}
    >
      <div className="space-y-6">
        {/* Header do Dia */}
        {/* [Refine v2.0.0] Hierarquia tipográfica aplicada */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              {displayDate}
            </h2>
            <Separator orientation="vertical" className="h-6" />
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {expenses.length} {expenses.length === 1 ? 'despesa' : 'despesas'}
            </p>
          </div>
          <p className="text-lg md:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {mockTotalFormatted}
          </p>
        </div>

        {/* Lista de Despesas do Dia */}
        {/* [Refine v2.0.0] Espaçamento premium aplicado (gap-4) */}
        {/* [MCP] AnimatedGroup para animação coordenada com stagger */}
        <AnimatedGroup preset="blur-slide" className="space-y-4">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onClick={() => onExpenseClick(expense)}
            />
          ))}
        </AnimatedGroup>

        {/* Separador entre dias */}
        <Separator className="my-8" />
      </div>
    </InView>
  );
}
