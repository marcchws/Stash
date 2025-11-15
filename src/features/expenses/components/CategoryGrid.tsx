import React from 'react';
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
import type { CategoryGridProps, ExpenseCategory } from '@/features/expenses/types';
import { CATEGORIES } from '@/features/expenses/types';

/**
 * CategoryGrid
 *
 * Descrição: Grade de seleção visual de categorias com ícones grandes e cores
 *
 * VISUAL-ONLY: Componente de seleção visual.
 * Implementação necessária:
 * - [ ] Integrar com estado de formulário (react-hook-form)
 * - [ ] Adicionar validação de categoria selecionada
 */

// Mapeamento de ícones por categoria
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

// Mapeamento de cores Tailwind por categoria
const colorMap: Record<ExpenseCategory, { bg: string; text: string; border: string; hoverBg: string }> = {
  alimentacao: {
    bg: 'bg-orange-50 dark:bg-orange-950/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    hoverBg: 'hover:bg-orange-100 dark:hover:bg-orange-900/30',
  },
  transporte: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
  },
  lazer: {
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    hoverBg: 'hover:bg-purple-100 dark:hover:bg-purple-900/30',
  },
  casa: {
    bg: 'bg-green-50 dark:bg-green-950/20',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    hoverBg: 'hover:bg-green-100 dark:hover:bg-green-900/30',
  },
  saude: {
    bg: 'bg-red-50 dark:bg-red-950/20',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    hoverBg: 'hover:bg-red-100 dark:hover:bg-red-900/30',
  },
  compras: {
    bg: 'bg-pink-50 dark:bg-pink-950/20',
    text: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-200 dark:border-pink-800',
    hoverBg: 'hover:bg-pink-100 dark:hover:bg-pink-900/30',
  },
  educacao: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-800',
    hoverBg: 'hover:bg-indigo-100 dark:hover:bg-indigo-900/30',
  },
  outros: {
    bg: 'bg-neutral-50 dark:bg-neutral-950/20',
    text: 'text-neutral-600 dark:text-neutral-400',
    border: 'border-neutral-200 dark:border-neutral-800',
    hoverBg: 'hover:bg-neutral-100 dark:hover:bg-neutral-900/30',
  },
};

export function CategoryGrid({ selectedCategory, onSelectCategory }: CategoryGridProps) {
  return (
    // [Refine v2.0.0] Espaçamento premium aplicado (gap-4)
    <div className="grid grid-cols-4 gap-4">
      {CATEGORIES.map((category) => {
        const Icon = iconMap[category.id];
        const colors = colorMap[category.id];
        const isSelected = selectedCategory === category.id;

        return (
          // [Refine v2.0.0] Two-layer shadow + Micro-interações aplicadas
          <button
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.id)}
            className={`
              flex flex-col items-center justify-center
              p-5 rounded-lg border-2
              transition-all duration-200
              hover:scale-[1.05] active:scale-[0.95]
              ${colors.bg} ${colors.text} ${colors.hoverBg}
              ${
                isSelected
                  ? `${colors.border} ring-2 ring-offset-2 ring-current shadow-md`
                  : 'border-transparent hover:border-current/20'
              }
              shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
              hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)]
              hover:shadow-md
            `}
          >
            <Icon className="w-7 h-7 mb-2 transition-transform duration-200 hover:scale-110" />
            <span className="text-xs font-semibold text-center leading-tight">
              {category.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
