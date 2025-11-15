import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  UtensilsCrossed,
  Car,
  Gamepad2,
  Home,
  Heart,
  ShoppingBag,
  GraduationCap,
  MoreHorizontal,
} from 'lucide-react';
import type { ExpenseCardProps, ExpenseCategory } from '@/features/expenses/types';
import { CATEGORIES } from '@/features/expenses/types';

/**
 * ExpenseCard
 *
 * Descrição: Card compacto de despesa para exibição em timeline
 *
 * VISUAL-ONLY: Estrutura visual apenas.
 * Implementação necessária:
 * - [ ] Integrar onClick para navegação para detalhes
 * - [ ] Formatar valor monetário corretamente (Intl.NumberFormat)
 * - [ ] Formatar hora de criação (ex: "14:30")
 */

const iconMap: Record<ExpenseCategory, React.ComponentType<{ className?: string }>> = {
  alimentacao: UtensilsCrossed,
  transporte: Car,
  lazer: Gamepad2,
  casa: Home,
  saude: Heart,
  compras: ShoppingBag,
  educacao: GraduationCap,
  outros: MoreHorizontal,
};

const colorMap: Record<ExpenseCategory, { bg: string; text: string }> = {
  alimentacao: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
  transporte: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
  lazer: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
  casa: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
  saude: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' },
  compras: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-400' },
  educacao: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' },
  outros: { bg: 'bg-neutral-100 dark:bg-neutral-800', text: 'text-neutral-600 dark:text-neutral-400' },
};

export function ExpenseCard({ expense, onClick }: ExpenseCardProps) {
  const categoryMeta = CATEGORIES.find((c) => c.id === expense.categoria);
  const Icon = iconMap[expense.categoria];
  const colors = colorMap[expense.categoria];

  // Mock de formatação de hora (devs implementarão corretamente)
  const mockTime = new Date(expense.criadoEm).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Mock de formatação de valor (devs implementarão com Intl.NumberFormat)
  const mockValue = `R$ ${expense.valor.toFixed(2).replace('.', ',')}`;

  return (
    // [Refine v2.0.0] Two-layer shadow + Color layering + Micro-interações aplicadas
    <Card
      className="
        group cursor-pointer
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-sm
        hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-md
        hover:scale-[1.01] hover:-translate-y-1
        transition-all duration-300
        rounded-lg
      "
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          {/* Ícone da Categoria */}
          {/* [Refine v2.0.0] Color layering (Shade 3) + Micro-interação */}
          <div
            className={`
              flex items-center justify-center
              w-14 h-14 rounded-lg
              ${colors.bg}
              transition-all duration-200
              group-hover:scale-110
            `}
          >
            <Icon className={`w-7 h-7 ${colors.text} transition-transform duration-200 group-hover:scale-105`} />
          </div>

          {/* Informações */}
          {/* [Refine v2.0.0] Hierarquia tipográfica aplicada */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 transition-colors duration-200 group-hover:text-primary">
                {categoryMeta?.label || 'Categoria'}
              </h3>
              <p className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50 whitespace-nowrap">
                {mockValue}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              {expense.descricao && (
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 truncate">
                  {expense.descricao}
                </p>
              )}
              <span className="text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                {mockTime}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
