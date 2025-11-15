# Escopo do Projeto: Stash

## Visão Geral

**Stash** é um aplicativo de controle financeiro pessoal focado em simplicidade e registro indolor de despesas. O objetivo é permitir que usuários rastreiem seus gastos de forma rápida, sem fricção, e ganhem consciência financeira através de resumos visuais simples.

## Conceito

"Guarde o registro, entenda seu dinheiro." - Um app para "guardar" (stash) seus gastos de forma rápida e indolor.

## Problema a Resolver

Usuários perdem o controle de suas finanças porque:
- Apps de finanças são complexos demais
- Requerem integração bancária (gerando desconfiança)
- Geram ansiedade com excesso de notificações e gráficos
- São lentos e difíceis de usar no dia a dia

**Resultado:** Falta de controle financeiro e sensação de vergonha ao final do mês.

## Solução Proposta

Um aplicativo minimalista que permite:
- **Registro em 3 toques:** Abrir app → digitar valor → selecionar categoria → salvar
- **Sem fricção:** Não requer CPF, integração bancária ou cadastros complexos
- **Consciência, não punição:** Resumos simples e visuais que informam sem julgar
- **Autocuidado:** Usar o app é um ato positivo, não uma tarefa chata

## Público-Alvo

- Jovens profissionais (20-35 anos)
- Estudantes universitários
- Pessoas intimidadas por apps de finanças complexos
- Usuários que desejam controle financeiro mínimo e consciente

## Escopo do MVP

### 1. Adição Rápida de Despesas
- FAB (Floating Action Button) grande e centralizado na tela inicial
- Formulário mínimo: Valor + Categoria
- Data preenchida automaticamente (hoje)
- Máximo 3 toques para registrar uma despesa

### 2. Histórico Simples
- Lista de gastos recentes agrupados por dia
- Apresentação: "Hoje", "Ontem", "Segunda, 13 Jan", etc.
- Visualização clara com ícones de categoria
- Ações rápidas: editar e excluir

### 3. Resumo Visual
- Total gasto no mês atual (número grande e destacado)
- Gráfico de rosca ou barras mostrando distribuição por categoria
- Percentuais simples (Ex: 40% Comida, 25% Transporte)
- Comparação opcional com mês anterior

### 4. Categorias Pré-definidas
Categorias padrão com ícones:
- 🍔 Alimentação
- 🚗 Transporte
- 🎮 Lazer
- 🏠 Casa
- 🏥 Saúde
- 🛒 Compras
- 📚 Educação
- ✨ Outros

## Funcionalidades Fora do Escopo (Versão 1.0)

❌ Integração bancária
❌ Receitas/ganhos
❌ Metas de economia
❌ Notificações push
❌ Exportação de relatórios
❌ Múltiplas contas/carteiras
❌ Sincronização cloud
❌ Autenticação de usuário

## Princípios de Design

1. **Velocidade:** Toda ação principal deve ser concluída em ≤ 3 toques
2. **Minimalismo:** Remover tudo que não é essencial
3. **Clareza:** Informações visuais simples e diretas
4. **Não-julgamento:** Linguagem positiva, sem "alertas" ou "limites"
5. **Mobile-first:** Otimizado para uso rápido em smartphones

## Tecnologias (Stack Visual)

- **Framework:** Next.js 16+ (App Router)
- **Linguagem:** TypeScript
- **Componentes:** Shadcn/UI
- **Estilização:** Tailwind CSS v4
- **Ícones:** Lucide React
- **Temas:** next-themes (dark mode nativo)

## Features Principais

1. **Despesas** (expenses) - CRUD completo de despesas
2. **Histórico** (history) - Visualização cronológica agrupada
3. **Resumo** (summary) - Dashboard com métricas mensais

## Métricas de Sucesso

- Tempo médio de registro de despesa: ≤ 10 segundos
- Taxa de conclusão do fluxo de registro: > 95%
- Usuários que visualizam o resumo semanalmente: > 60%
- NPS (Net Promoter Score): > 50

## Próximos Passos

1. Executar `/design:init` para configurar projeto
2. Gerar features a partir das specs em `specs/`
3. Validar protótipo visual com usuários
4. Handoff para desenvolvimento backend
