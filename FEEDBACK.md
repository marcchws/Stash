# Feedback - Correções e Melhorias

## 🔧 Correção: Dialog Width na Web

### Problema
O componente Dialog do Shadcn/UI apresentava largura incorreta na versão web (desktop), enquanto funcionava corretamente no mobile. O problema ocorria porque o Radix UI (biblioteca base do Shadcn) aplica estilos inline dinamicamente que sobrescrevem as classes Tailwind padrão.

### Contexto
- **Quando ocorre**: Após instalar o Shadcn/UI via `/design:init` ou quando usar Dialog em modais via `/design:feature`
- **Sintoma**: Dialog fica muito largo na web, ocupando quase toda a largura da tela, mesmo com classes `max-w-*` aplicadas
- **Causa raiz**: Estilos inline do Radix UI têm maior especificidade que classes Tailwind, sobrescrevendo as larguras definidas

### Solução Necessária
Para garantir que o Dialog funcione corretamente em todas as telas, é necessário aplicar a correção em múltiplas camadas para garantir especificidade suficiente:

1. **Estilos inline no componente DialogContent** - Força largura inicial
2. **Classes Tailwind com !important** - Sobrescreve conflitos de classes
3. **CSS customizado no globals.css** - Garante prioridade máxima via seletor de atributo (exemplo: `[data-slot="dialog-content"]`)

### Comportamento Esperado
- **Mobile**: Dialog deve respeitar margens laterais adequadas
- **Desktop**: Dialog deve ter largura máxima limitada (não ocupar toda a tela)

### Impacto nos Comandos

#### `/design:init`
Quando instalar o Shadcn/UI e gerar o componente `dialog.tsx`, o DialogContent deve incluir mecanismos para garantir largura correta em todas as telas, aplicando as três camadas de correção mencionadas acima.

#### `/design:feature`
Quando usar Dialog em modais, o componente base já deve estar corrigido. É importante garantir que o CSS customizado esteja presente no `globals.css` e não sobrescrever as classes de largura do DialogContent.
