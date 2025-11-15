import React from 'react';
import { Plus } from 'lucide-react';
import type { ExpenseFABProps } from '@/features/expenses/types';

/**
 * ExpenseFAB (Floating Action Button)
 *
 * Descrição: Botão flutuante principal para adicionar nova despesa
 *
 * VISUAL-ONLY: Botão com estilo premium e micro-interações.
 * Implementação necessária:
 * - [ ] Integrar onClick com abertura de modal
 */

export function ExpenseFAB({ onClick }: ExpenseFABProps) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 md:w-16 md:h-16
        flex items-center justify-center
        rounded-full
        bg-gradient-to-br from-blue-500 to-blue-700
        text-white
        shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-lg
        hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.4)] hover:shadow-xl
        hover:scale-110 active:scale-95
        transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-blue-400/50
      "
      aria-label="Adicionar nova despesa"
    >
      <Plus className="w-7 h-7 md:w-8 md:h-8 stroke-[2.5]" />
    </button>
  );
}
