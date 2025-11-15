'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  FileText,
  Clock,
  UtensilsCrossed,
  Car,
  Gamepad2,
  Home,
  Heart,
  ShoppingBag,
  GraduationCap,
  MoreHorizontal,
} from 'lucide-react';
import { ExpenseModal } from '@/features/expenses/components/ExpenseModal';
import type { Expense, ExpenseCategory } from '@/features/expenses/types';
import { CATEGORIES } from '@/features/expenses/types';

/**
 * Expense Detail Page
 *
 * Rota: /expenses/[id]
 *
 * Descrição: Página de visualização detalhada de uma despesa
 *
 * VISUAL-ONLY com simulação básica.
 * Implementação necessária:
 * - [ ] Buscar despesa real por ID via API (GET /api/expenses/:id)
 * - [ ] Implementar exclusão com confirmação (DELETE /api/expenses/:id)
 * - [ ] Adicionar estados de loading/erro
 * - [ ] Adicionar modal de confirmação de exclusão
 * - [ ] Formatar valores monetários corretamente
 * - [ ] Formatar datas/timestamps corretamente
 * - [ ] Adicionar breadcrumbs de navegação
 * - [ ] Implementar tratamento de erro 404 (despesa não encontrada)
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

export default function ExpenseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // MOCK DATA - Substituir por fetching real baseado em `id`
  const mockExpense: Expense = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity -- Mock data, Date.now() is acceptable here
    const now = Date.now();
    return {
      id: id,
      valor: 45.9,
      categoria: 'lazer',
      data: new Date(now).toISOString().split('T')[0],
      descricao: 'Cinema com pipoca e refrigerante',
      criadoEm: new Date(now - 10800000).toISOString(),
      atualizadoEm: new Date(now - 10800000).toISOString(),
    };
  }, [id]);

  const categoryMeta = CATEGORIES.find((c) => c.id === mockExpense.categoria);
  const Icon = iconMap[mockExpense.categoria];
  const colors = colorMap[mockExpense.categoria];

  // Mock de formatação
  const mockValueFormatted = `R$ ${mockExpense.valor.toFixed(2).replace('.', ',')}`;
  const mockDateFormatted = new Date(mockExpense.data).toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const mockCreatedFormatted = new Date(mockExpense.criadoEm).toLocaleString('pt-BR');

  const handleDelete = () => {
    // TODO: Implementar modal de confirmação + chamada DELETE à API
    console.log('Exclusão a ser implementada');
    // Após deletar, redirecionar para lista
    // router.push('/expenses');
  };

  const handleSaveEdit = (expense: Expense) => {
    // TODO: Implementar atualização real via API (PUT /api/expenses/:id)
    console.log('Despesa atualizada (simulação):', expense);
    // Atualizar UI com novos dados
  };

  return (
    // [Refine v2.0.0] Color layering aplicado (Shade 1) + Espaçamento premium
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6 md:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Header com Navegação */}
        {/* [Refine v2.0.0] Hierarquia tipográfica + Micro-interações */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="
                transition-all duration-200
                hover:bg-neutral-100 dark:hover:bg-neutral-800
                hover:scale-105 active:scale-95
              "
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-neutral-50">
                Detalhes da Despesa
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                ID: {id}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDelete}
              className="
                transition-all duration-200
                hover:bg-red-50 hover:text-red-600 hover:border-red-300
                dark:hover:bg-red-950/30 dark:hover:text-red-400
                hover:scale-105 active:scale-95
              "
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setIsEditModalOpen(true)}
              className="
                transition-all duration-200
                hover:scale-[1.02] active:scale-[0.98]
              "
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        </div>

        {/* Card Principal */}
        {/* [Refine v2.0.0] Two-layer shadow aplicada + Color layering (Shade 2) */}
        <Card className="
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
          hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
          transition-shadow duration-300
          rounded-lg
        ">
          <CardHeader className="p-6 pb-4">
            {/* Categoria e Valor */}
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                {/* [Refine v2.0.0] Color layering (Shade 3) + Micro-interação */}
                <div className={`
                  flex items-center justify-center
                  w-20 h-20 rounded-xl
                  ${colors.bg}
                  transition-transform duration-200
                  hover:scale-110
                `}>
                  <Icon className={`w-10 h-10 ${colors.text}`} />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                    {categoryMeta?.label || 'Categoria'}
                  </CardTitle>
                  <Badge className={`${colors.bg} ${colors.text} border-0`}>
                    {categoryMeta?.emoji} {categoryMeta?.label}
                  </Badge>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500">Valor</p>
                <p className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                  {mockValueFormatted}
                </p>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="p-6 pt-6 space-y-6">
            {/* Informações Organizadas */}
            {/* [Refine v2.0.0] Espaçamento premium aplicado (gap-6) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Data */}
              <div className="flex items-start gap-3">
                {/* [Refine v2.0.0] Color layering (Shade 3) */}
                <div className="
                  p-3 rounded-lg
                  bg-neutral-100 dark:bg-neutral-800
                  transition-colors duration-200
                ">
                  <Calendar className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500">
                    Data da Despesa
                  </p>
                  <p className="text-base font-semibold leading-relaxed text-neutral-900 dark:text-neutral-50">
                    {mockDateFormatted}
                  </p>
                </div>
              </div>

              {/* Criado Em */}
              <div className="flex items-start gap-3">
                <div className="
                  p-3 rounded-lg
                  bg-neutral-100 dark:bg-neutral-800
                  transition-colors duration-200
                ">
                  <Clock className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500">
                    Registrado em
                  </p>
                  <p className="text-base font-semibold leading-relaxed text-neutral-900 dark:text-neutral-50">
                    {mockCreatedFormatted}
                  </p>
                </div>
              </div>
            </div>

            {/* Descrição (se houver) */}
            {mockExpense.descricao && (
              <>
                <Separator />
                <div className="flex items-start gap-3">
                  <div className="
                    p-3 rounded-lg
                    bg-neutral-100 dark:bg-neutral-800
                    transition-colors duration-200
                  ">
                    <FileText className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500">
                      Descrição
                    </p>
                    <p className="text-base leading-relaxed text-neutral-900 dark:text-neutral-50">
                      {mockExpense.descricao}
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Informação Adicional */}
        {/* [Refine v2.0.0] Color layering (Shade 2) + Espaçamento premium */}
        <div className="
          p-6 rounded-lg
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] shadow-sm
        ">
          <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center leading-relaxed">
            Última atualização: {new Date(mockExpense.atualizadoEm).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Modal de Edição */}
      <ExpenseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={mockExpense}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
