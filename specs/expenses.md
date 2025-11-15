# Feature: Despesas

## Objetivo

Permitir que usuários registrem, visualizem, editem e excluam suas despesas de forma rápida e indolor. Esta é a funcionalidade central do Stash - o registro deve ser tão simples que possa ser feito em fila de café, no ônibus, ou em qualquer momento do dia com máximo 3 toques.

A interface deve priorizar **velocidade** acima de tudo. O usuário deve conseguir abrir o app, adicionar uma despesa (valor + categoria) e voltar para o que estava fazendo em menos de 10 segundos.

O design deve ser **minimalista e não-intimidador**. Nada de formulários longos, validações agressivas ou campos obrigatórios além do essencial. A experiência deve parecer "guardar uma nota mental", não "preencher um relatório de despesas".

## Critérios de Aceitação

### Adicionar Despesa
- [ ] FAB (Floating Action Button) sempre visível e acessível na tela principal
- [ ] FAB usa ícone de "+" e é grande o suficiente para tap fácil (mínimo 56x56px)
- [ ] Ao clicar no FAB, abre modal/drawer com formulário mínimo
- [ ] Campo de valor aceita apenas números e vírgula/ponto decimal
- [ ] Campo de valor tem teclado numérico otimizado para mobile
- [ ] Grade de categorias com ícones grandes e coloridos para seleção visual rápida
- [ ] Data é preenchida automaticamente com "hoje"
- [ ] Usuário pode opcionalmente adicionar uma descrição curta (opcional)
- [ ] Botão "Salvar" destacado e acessível
- [ ] Após salvar, modal fecha e usuário vê feedback de sucesso
- [ ] Despesa aparece imediatamente no histórico

### Editar Despesa
- [ ] Usuário pode acessar edição ao clicar em uma despesa no histórico
- [ ] Formulário de edição pré-preenche todos os campos com valores atuais
- [ ] Permite alterar valor, categoria, data e descrição
- [ ] Botão "Salvar alterações" claramente visível
- [ ] Alterações refletem imediatamente no histórico e resumo

### Excluir Despesa
- [ ] Botão de exclusão acessível na tela de detalhes/edição
- [ ] Modal de confirmação antes de excluir ("Tem certeza?")
- [ ] Após confirmar, despesa é removida e usuário vê feedback
- [ ] Histórico e resumo atualizam automaticamente

### Validações
- [ ] Valor deve ser maior que zero
- [ ] Valor deve ter no máximo 2 casas decimais
- [ ] Categoria deve ser selecionada
- [ ] Data não pode ser futura
- [ ] Mensagens de erro são claras e não-técnicas

### UX/UI
- [ ] Interface responsiva e otimizada para mobile
- [ ] Suporte a dark mode
- [ ] Animações suaves nas transições (modal, salvamento)
- [ ] Estados de loading visíveis mas discretos
- [ ] Feedback visual imediato para todas as ações

## Campos

| Campo | Tipo | Obrigatório | Validação | Descrição |
|-------|------|-------------|-----------|-----------|
| id | String (UUID) | Sim (auto) | UUID válido | Identificador único da despesa |
| valor | Number | Sim | > 0, max 2 decimais | Valor da despesa em R$ |
| categoria | String (Enum) | Sim | Uma das categorias válidas | Categoria da despesa |
| data | Date | Sim | Não pode ser futura | Data da despesa (padrão: hoje) |
| descricao | String | Não | Max 100 caracteres | Descrição opcional da despesa |
| criadoEm | Timestamp | Sim (auto) | ISO 8601 | Data/hora de criação do registro |
| atualizadoEm | Timestamp | Sim (auto) | ISO 8601 | Data/hora da última atualização |

## Categorias Disponíveis

| Categoria | Ícone | Cor Sugerida | Emoji |
|-----------|-------|--------------|-------|
| Alimentação | UtensilsCrossed | Orange | 🍔 |
| Transporte | Car | Blue | 🚗 |
| Lazer | Gamepad2 | Purple | 🎮 |
| Casa | Home | Green | 🏠 |
| Saúde | Heart | Red | 🏥 |
| Compras | ShoppingBag | Pink | 🛒 |
| Educação | GraduationCap | Indigo | 📚 |
| Outros | MoreHorizontal | Gray | ✨ |

## Cenários de Uso

| ID | Cenário | Input | Output Esperado |
|----|---------|-------|-----------------|
| 01 | Adicionar café da manhã | Valor: 7.50, Categoria: Alimentação | Despesa criada, aparece no histórico com data de hoje |
| 02 | Adicionar Uber para trabalho | Valor: 15.00, Categoria: Transporte, Descrição: "Uber trabalho" | Despesa criada com descrição opcional |
| 03 | Tentar salvar sem valor | Categoria: Lazer, Valor: vazio | Erro: "Informe o valor da despesa" |
| 04 | Tentar salvar sem categoria | Valor: 20.00, Categoria: não selecionada | Erro: "Selecione uma categoria" |
| 05 | Tentar salvar valor negativo | Valor: -10.00 | Erro: "O valor deve ser maior que zero" |
| 06 | Editar despesa existente | Alterar valor de 7.50 para 8.00 | Despesa atualizada, histórico reflete nova informação |
| 07 | Excluir despesa | Clicar em excluir → Confirmar | Despesa removida, não aparece mais no histórico |
| 08 | Adicionar com data passada | Valor: 50.00, Data: 3 dias atrás | Despesa criada e agrupada no dia correto no histórico |
| 09 | Adicionar com data futura | Data: amanhã | Erro: "A data não pode ser no futuro" |
| 10 | Adicionar múltiplas despesas rapidamente | 3 despesas em sequência | Todas criadas, modal fecha após cada salvamento |

## Fluxos de Tela

### Fluxo Principal: Adicionar Despesa Rápida
```
Tela Inicial (Histórico)
    ↓ [Toque no FAB "+"]
Modal/Drawer de Nova Despesa
    - Campo Valor (foco automático)
    - Grade de Categorias (8 opções visíveis)
    - Data (preenchida, editável se necessário)
    - Campo Descrição (opcional, colapsado)
    - Botão "Adicionar Despesa"
    ↓ [Toque em "Adicionar"]
Toast de Sucesso
    ↓
Volta para Tela Inicial (despesa visível no topo)
```

### Fluxo Secundário: Editar/Excluir
```
Tela Inicial (Histórico)
    ↓ [Toque em uma despesa]
Tela de Detalhes da Despesa
    - Valor destacado
    - Categoria com ícone
    - Data formatada
    - Descrição (se houver)
    - Botão "Editar"
    - Botão "Excluir" (discreto)
    ↓ [Toque em "Editar"]
Modal de Edição (mesma estrutura de criação)
    ↓ [Salvar alterações]
Toast de Sucesso → Volta para Histórico

    OU

    ↓ [Toque em "Excluir"]
Modal de Confirmação
    ↓ [Confirmar]
Toast de Sucesso → Volta para Histórico
```

## Requisitos Visuais

### Layout Mobile
- FAB posicionado no canto inferior direito (16px de margem)
- Modal/drawer ocupa no máximo 90% da altura da tela
- Campo de valor com fonte grande (24-32px) para fácil leitura
- Grade de categorias: 4 colunas em mobile, 6 em tablet

### Componentes Premium (5 Princípios)
- **Two-layer shadows**: FAB e cards de despesa
- **Color layering**: Categorias com shades claras no fundo
- **Espaçamentos premium**: gap-6 entre elementos, padding generoso no modal
- **Tipografia hierárquica**: Valor em Display, categoria em Heading
- **Micro-interações**:
  - FAB com scale em hover/press
  - Categorias com bounce ao selecionar
  - Transições suaves (300ms) no modal

### Estados Visuais
- **Default**: FAB e elementos interativos visíveis
- **Loading**: Spinner discreto durante salvamento
- **Sucesso**: Toast verde com ícone de check
- **Erro**: Toast vermelho com mensagem clara
- **Empty state**: Ilustração amigável quando não há despesas

## Notas para Desenvolvimento

### Prioridades de Implementação
**Alta:**
- Persistência local (localStorage/IndexedDB) até API estar pronta
- Validações básicas no frontend
- Estados de loading e erro
- Responsividade mobile-first

**Média:**
- Animações e micro-interações
- Otimização de performance (debounce, memo)
- Acessibilidade (ARIA labels, focus management)

**Baixa:**
- PWA/offline mode
- Sincronização cloud
- Testes E2E

### Considerações Técnicas
- Usar useState para simulação de dados no protótipo
- Preparar interfaces TypeScript para integração com API
- Modal deve ser acessível via teclado (ESC para fechar)
- Formulário deve prevenir submissão acidental (Enter)
