'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DayGroup } from '@/features/expenses/components/DayGroup';
import { ExpenseFAB } from '@/features/expenses/components/ExpenseFAB';
import { ExpenseModal } from '@/features/expenses/components/ExpenseModal';
import type { Expense } from '@/features/expenses/types';

/**
 * Expenses List Page (Timeline View)
 *
 * Rota: /expenses
 *
 * Descrição: Página principal de despesas com timeline agrupada por dia
 *
 * VISUAL-ONLY com simulação básica: Possui useState local para simular CRUD.
 * Implementação necessária:
 * - [ ] Integrar com API para buscar despesas reais (GET /api/expenses)
 * - [ ] Implementar paginação/scroll infinito para grandes volumes
 * - [ ] Adicionar filtros (por categoria, período)
 * - [ ] Implementar busca por descrição
 * - [ ] Adicionar estados de loading e erro
 * - [ ] Implementar pull-to-refresh para mobile
 * - [ ] Adicionar ordenação (data, valor)
 * - [ ] Implementar cache local (React Query/SWR)
 */

export default function ExpensesPage() {
  const router = useRouter();

  // SIMULAÇÃO: Dados mockados de despesas (usando useMemo para evitar Date.now() durante render)
  const initialExpenses = useMemo((): Expense[] => {
    // eslint-disable-next-line react-hooks/purity -- Mock data, Date.now() is acceptable here
    const now = Date.now();
    const today = new Date(now).toISOString().split('T')[0];
    const yesterday = new Date(now - 86400000).toISOString().split('T')[0];
    
    return [
      {
        id: '1',
        valor: 7.5,
        categoria: 'alimentacao' as const,
        data: today,
        descricao: 'Café da manhã',
        criadoEm: new Date(now - 3600000).toISOString(),
        atualizadoEm: new Date(now - 3600000).toISOString(),
      },
      {
        id: '2',
        valor: 15.0,
        categoria: 'transporte' as const,
        data: today,
        descricao: 'Uber para trabalho',
        criadoEm: new Date(now - 7200000).toISOString(),
        atualizadoEm: new Date(now - 7200000).toISOString(),
      },
      {
        id: '3',
        valor: 45.9,
        categoria: 'lazer' as const,
        data: today,
        descricao: 'Cinema com pipoca',
        criadoEm: new Date(now - 10800000).toISOString(),
        atualizadoEm: new Date(now - 10800000).toISOString(),
      },
      {
        id: '4',
        valor: 120.0,
        categoria: 'compras' as const,
        data: yesterday,
        descricao: 'Supermercado',
        criadoEm: new Date(now - 86400000 - 3600000).toISOString(),
        atualizadoEm: new Date(now - 86400000 - 3600000).toISOString(),
      },
      {
        id: '5',
        valor: 30.0,
        categoria: 'alimentacao' as const,
        data: yesterday,
        descricao: 'Almoço self-service',
        criadoEm: new Date(now - 86400000 - 7200000).toISOString(),
        atualizadoEm: new Date(now - 86400000 - 7200000).toISOString(),
      },
    ];
  }, []);

  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Agrupar despesas por data
  const expensesByDay = expenses.reduce((acc, expense) => {
    const date = expense.data;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(expense);
    return acc;
  }, {} as Record<string, Expense[]>);

  // Ordenar datas (mais recentes primeiro)
  const sortedDates = Object.keys(expensesByDay).sort((a, b) => b.localeCompare(a));

  const handleExpenseClick = (expense: Expense) => {
    router.push(`/expenses/${expense.id}`);
  };

  const handleSaveExpense = (expense: Expense) => {
    // SIMULAÇÃO: Adicionar ou atualizar despesa localmente
    setExpenses((prev) => {
      const existing = prev.find((e) => e.id === expense.id);
      if (existing) {
        return prev.map((e) => (e.id === expense.id ? expense : e));
      }
      return [expense, ...prev];
    });
  };

  return (
    // [Refine v2.0.0] Color layering aplicado (Shade 1)
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6 md:p-8">
      {/* [Refine v2.0.0] Espaçamento premium aplicado (base 24px) */}
      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Header */}
        {/* [Refine v2.0.0] Hierarquia tipográfica aplicada */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-neutral-50">
            Despesas
          </h1>
          <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            Acompanhe todos os seus gastos de forma simples e rápida
          </p>
        </div>

        {/* Timeline de Despesas Agrupadas por Dia */}
        {sortedDates.length > 0 ? (
          <div className="space-y-8">
            {sortedDates.map((date) => (
              <DayGroup
                key={date}
                date={date}
                expenses={expensesByDay[date]}
                onExpenseClick={handleExpenseClick}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          // [Refine v2.0.0] Two-layer shadow + Color layering aplicados
          <div className="
            flex flex-col items-center justify-center
            py-16 space-y-6
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
            shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
            rounded-lg
          ">
            <div className="
              inline-flex items-center justify-center
              w-20 h-20 rounded-full
              bg-neutral-100 dark:bg-neutral-800
              text-5xl
              transition-transform duration-200
              hover:scale-110
            ">
              💸
            </div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Nenhuma despesa registrada
            </h2>
            <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 text-center max-w-md">
              Comece a registrar suas despesas clicando no botão &quot;+&quot; abaixo
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <ExpenseFAB onClick={() => setIsModalOpen(true)} />

      {/* Modal de Criação/Edição */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveExpense}
      />
    </div>
  );
}
