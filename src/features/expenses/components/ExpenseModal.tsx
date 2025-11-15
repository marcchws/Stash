'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';
import { CategoryGrid } from './CategoryGrid';
import type { ExpenseModalProps, ExpenseCategory } from '@/features/expenses/types';

/**
 * ExpenseModal
 *
 * Descrição: Modal de criação/edição rápida de despesa
 *
 * VISUAL-ONLY com simulação básica de estado local.
 * Implementação necessária:
 * - [ ] Integrar react-hook-form para gerenciamento de formulário
 * - [ ] Adicionar validação com Zod (valor > 0, categoria obrigatória)
 * - [ ] Implementar máscara de valor monetário (apenas números e vírgula)
 * - [ ] Implementar lógica de salvamento real (POST/PUT API)
 * - [ ] Adicionar feedback de erro/sucesso (toast)
 * - [ ] Implementar teclado numérico otimizado para mobile
 */

export function ExpenseModal({ isOpen, onClose, initialData, onSave }: ExpenseModalProps) {
  const isEditMode = !!initialData;

  // SIMULAÇÃO: Estado local do formulário
  // Usar função inicializadora para evitar Date.now() durante render
  const [valor, setValor] = useState(() => initialData?.valor.toString() || '');
  const [categoria, setCategoria] = useState<ExpenseCategory | undefined>(() => initialData?.categoria);
  const [data, setData] = useState(() => {
    if (initialData?.data) return initialData.data;
    // Usar função para calcular data apenas na inicialização
    return new Date().toISOString().split('T')[0];
  });
  const [descricao, setDescricao] = useState(() => initialData?.descricao || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form quando modal abre/fecha
  useEffect(() => {
    if (isOpen && !initialData) {
      // Usar função de callback para evitar setState direto no effect
      const resetForm = () => {
        setValor('');
        setCategoria(undefined);
        setData(new Date().toISOString().split('T')[0]);
        setDescricao('');
      };
      // Usar setTimeout para evitar setState síncrono
      const timeoutId = setTimeout(resetForm, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, initialData]);

  // SIMULAÇÃO: Submit do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implementar validação real com Zod
    if (!valor || !categoria) {
      console.log('Validação: Valor e categoria são obrigatórios');
      return;
    }

    setIsSubmitting(true);

    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock de objeto de despesa
    const mockExpense = {
      id: initialData?.id || `mock-${Date.now()}`,
      valor: parseFloat(valor.replace(',', '.')),
      categoria,
      data,
      descricao: descricao || undefined,
      criadoEm: initialData?.criadoEm || new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    };

    console.log('Despesa salva (simulação):', mockExpense);

    // TODO: Implementar chamada real de API
    if (onSave) {
      onSave(mockExpense);
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {/* [Refine v2.0.0] Hierarquia tipográfica aplicada */}
          <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {isEditMode ? 'Editar Despesa' : 'Nova Despesa'}
          </DialogTitle>
        </DialogHeader>

        {/* [Refine v2.0.0] Espaçamento premium aplicado */}
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          {/* Campo de Valor */}
          <div className="space-y-2">
            <Label htmlFor="valor" className="text-base font-semibold">
              Valor *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl font-bold text-neutral-500">
                R$
              </span>
              <Input
                id="valor"
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="
                  pl-12 text-2xl md:text-3xl font-bold text-right
                  h-16
                  border-2
                  focus:ring-2 focus:ring-blue-500
                "
                autoFocus
                required
              />
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Use vírgula para centavos (ex: 7,50)
            </p>
          </div>

          {/* Grade de Categorias */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Categoria *</Label>
            <CategoryGrid selectedCategory={categoria} onSelectCategory={setCategoria} />
          </div>

          {/* Campo de Data */}
          <div className="space-y-2">
            <Label htmlFor="data" className="text-base font-semibold">
              Data
            </Label>
            <Input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="border-2"
              required
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Padrão: hoje (não pode ser futura)
            </p>
          </div>

          {/* Campo de Descrição (Opcional) */}
          <div className="space-y-2">
            <Label htmlFor="descricao" className="text-base font-semibold">
              Descrição <span className="text-neutral-500 font-normal">(opcional)</span>
            </Label>
            <Textarea
              id="descricao"
              placeholder="Ex: Almoço no restaurante japonês"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              maxLength={100}
              rows={3}
              className="resize-none border-2"
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-right">
              {descricao.length}/100 caracteres
            </p>
          </div>

          {/* Botões de Ação */}
          {/* [Refine v2.0.0] Micro-interações aplicadas nos botões */}
          <DialogFooter className="gap-3 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="
                transition-all duration-200
                hover:scale-[1.02] active:scale-[0.98]
              "
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !valor || !categoria}
              className="
                bg-gradient-to-br from-blue-500 to-blue-700
                hover:from-blue-600 hover:to-blue-800
                shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-sm
                hover:shadow-md
                transition-all duration-200
                hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:scale-100 disabled:active:scale-100
              "
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Salvando...' : isEditMode ? 'Salvar Alterações' : 'Adicionar Despesa'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
