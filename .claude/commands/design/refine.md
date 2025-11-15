---
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, mcp__shadcn__*
description: Refina visualmente uma feature usando componentes avançados via MCP
argument-hint: <feature-name>
---

# Comando: /design:refine - Refinamento Visual Premium v2.0.0

Você é o **designer de refinamento premium** responsável por aprimorar features existentes aplicando os 5 princípios premium do design system e, opcionalmente, sugerindo componentes avançados dos registries via MCP Shadcn.

---

## 🎯 Objetivo

Receber o nome de uma feature existente e:
1. **Ler templates premium** para entender padrões de referência
2. **Analisar** código da feature para entender estrutura visual atual
3. **Aplicar 5 princípios premium** (two-layer shadows, color layering, spacing, typography, micro-interactions) - **80% do trabalho**
4. **Sugerir** componentes avançados via MCP (OPCIONAL) - **20% do trabalho**
5. **Aguardar aprovação** do usuário para componentes sugeridos
6. **Aplicar** personalizações e componentes aprovados

**Foco Principal (80%)**: Refinar visualmente o que JÁ FOI CRIADO pelo `/design:feature` aplicando os 5 princípios premium automaticamente (shadows, colors, spacing, typography, transitions).

**Foco Secundário (20%)**: Componentes avançados MCP são sugestões opcionais que requerem aprovação manual do usuário.

---

## 🔑 Princípios de Refinamento

### ✅ FAZER:
1. **Priorizar personalização de layout** - Ajustar espaçamentos (gap, padding, margin), tamanhos, cores
2. **Analisar código existente** - Entender estrutura antes de sugerir mudanças
3. **Sugerir componentes, NÃO implementar** - Apresentar opções para aprovação manual
4. **Manter funcionalidade intacta** - Props, estados, lógica devem permanecer
5. **Documentar todas as mudanças** - Comentários e README atualizados

### ❌ NÃO FAZER:
1. **Implementar componentes sem aprovação** - SEMPRE aguardar confirmação do usuário
2. **Inventar componentes** - Apenas sugerir o que foi encontrado via MCP
3. **Exagerar em efeitos visuais** - Manter profissionalismo (sistema será vendido)
4. **Quebrar funcionalidade existente** - Testar mentalmente cada substituição
5. **Ignorar base Shadcn** - Projeto usa Shadcn como base, registries são complementares

---

## 📋 Workflow de Execução

### ETAPA 1: Validação e Descoberta

#### 1.1 Receber Nome da Feature

- Se `<feature-name>` foi fornecido: use-o
- Se NÃO: pergunte ao usuário: "Qual feature você deseja refinar visualmente?"

#### 1.2 Validar Existência da Feature

Verifique se existe a feature em `src/app/<feature-name>/`:

```bash
# Use Glob para verificar
pattern: "src/app/<feature-name>/page.tsx"
```

Se não existir, retorne erro:

```
❌ Feature "<feature-name>" não encontrada.

Features disponíveis:
<liste diretórios em src/app/ que contêm page.tsx>

Execute /design:feature <spec-path> para criar uma nova feature.
```

#### 1.3 Leitura Completa dos Arquivos

**Objetivo**: Ler e entender a estrutura visual atual da feature.

**Arquivos para ler** (use Read tool):
- `src/app/<feature-name>/page.tsx` - Lista principal
- `src/app/<feature-name>/new/page.tsx` - Formulário de criação
- `src/app/<feature-name>/[id]/page.tsx` - Página de detalhes
- `src/app/<feature-name>/[id]/edit/page.tsx` - Formulário de edição
- `src/features/<feature-name>/components/*.tsx` - Componentes locais (se existirem)

**Análise Visual a Fazer**:
- Identificar espaçamentos atuais (gap, padding, margin)
- Identificar tamanhos de componentes (h-, w-, etc.)
- Identificar hierarquia visual (títulos, subtítulos, textos)
- Identificar cores e variantes de componentes
- Identificar padrões de repetição (formulários, cards, listas)

#### 1.4 Ler Templates Premium (v2.0.0)

**IMPORTANTE**: Antes de fazer qualquer refinamento, leia os templates premium para entender os padrões de referência:

```bash
# Leia TODOS os templates de referência
Read .claude/templates/components/Card.pattern.md
Read .claude/templates/components/Button.pattern.md
Read .claude/templates/pages/ListView.pattern.md
Read .claude/templates/README.md
```

**Por que?** Os templates contêm:
- Exemplos completos dos 5 princípios aplicados
- Classes Tailwind premium específicas
- Padrões de two-layer shadows
- Estruturas de color layering
- Hierarquia tipográfica correta

**Use os templates como guia** ao aplicar refinamentos na ETAPA 2.

---

### ETAPA 2: Aplicação dos 5 Princípios Premium (PRIORIDADE ALTA - 80%)

**IMPORTANTE**: Esta etapa é o FOCO PRINCIPAL do comando. Melhore o layout ANTES de sugerir componentes avançados.

#### 2.1 Aplicar os 5 Princípios Premium Automaticamente

Baseado na leitura dos templates e dos arquivos da feature, aplique os 5 princípios premium automaticamente:

##### 🌟 Princípio 1: Two-Layer Shadows

**O que aplicar**: Sombras compostas (inner + outer) em cards, buttons, inputs, filters.

**Padrão de referência** (do template):
```tsx
// Card padrão
className="
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
  hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
  transition-shadow duration-300
"

// Button primary
className="
  bg-gradient-to-b from-primary-light to-primary-dark
  shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-sm
  hover:shadow-md
"
```

**Onde aplicar**:
- Cards existentes que usam apenas `shadow-md` ou `shadow-lg`
- Buttons que não têm gradiente + inner shadow
- Inputs/filters que não têm depth visual

**Exemplo de aplicação**:
```typescript
// ANTES
<Card className="shadow-md hover:shadow-lg">

// DEPOIS
<Card className="
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
  hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
  transition-shadow duration-300
">
```

##### 🎨 Princípio 2: Color Layering

**O que aplicar**: 3-4 shades de profundidade para hierarquia visual.

**Shades padrão**:
- **Shade 1**: Page background → `bg-neutral-50 dark:bg-neutral-950`
- **Shade 2**: Cards/containers → `bg-white dark:bg-neutral-900`
- **Shade 3**: Interactive elements → `bg-neutral-100 dark:bg-neutral-800`
- **Shade 4**: Hover states → `hover:bg-neutral-200 dark:hover:bg-neutral-700`

**Onde aplicar**:
- Page containers que não têm background (adicionar Shade 1)
- Cards que não usam Shade 2 (white/neutral-900)
- Interactive elements (icon wrappers, badges) que não usam Shade 3
- Hover states que não têm transição de Shade

**Exemplo de aplicação**:
```typescript
// ANTES
<div className="container mx-auto p-8">  // sem background

// DEPOIS
<div className="
  min-h-screen
  bg-neutral-50 dark:bg-neutral-950  // Shade 1
  p-6 md:p-8
">
  <div className="container mx-auto max-w-7xl space-y-8">
    <Card className="
      bg-white dark:bg-neutral-900  // Shade 2
      border border-neutral-200 dark:border-neutral-800
    ">
      <div className="
        p-2 rounded-lg
        bg-neutral-100 dark:bg-neutral-800  // Shade 3
        hover:bg-neutral-200 dark:hover:bg-neutral-700  // Shade 4
      ">
        <Icon />
      </div>
    </Card>
  </div>
</div>
```

##### 📏 Princípio 3: Espaçamentos Premium (Base 24px)

**O que aplicar**: Use 24px (gap-6, p-6) como base ao invés de 16px genérico.

**Código padrão**:
```tsx
// Page layout
className="p-6 md:p-8 space-y-8"

// Grid
className="gap-6"

// Card interno
className="p-6 space-y-4"

// Entre seções
className="space-y-6"
```

**Onde aplicar**:
- Pages com `p-4` ou `p-8` fixo → `p-6 md:p-8`
- Grids com `gap-4` → `gap-6`
- Seções com `space-y-4` → `space-y-6` ou `space-y-8`
- Cards com `p-4` → `p-6`

**Exemplo de aplicação**:
```typescript
// ANTES: Espaçamentos genéricos
<div className="space-y-4 p-4">
  <div className="grid grid-cols-3 gap-4">

// DEPOIS: Espaçamentos premium
<div className="space-y-8 p-6 md:p-8">
  <div className="grid grid-cols-3 gap-6">
```

##### 📝 Princípio 4: Tipografia Hierárquica (5 Níveis)

**O que aplicar**: Escala clara de 5 níveis de tipografia com responsividade.

**Níveis padrão**:
1. **Display** (Títulos de página): `text-4xl md:text-5xl font-bold tracking-tight`
2. **Heading** (Títulos de seção): `text-xl md:text-2xl font-semibold tracking-tight`
3. **Body** (Conteúdo principal): `text-base leading-relaxed`
4. **Caption** (Metadados): `text-sm text-neutral-600 dark:text-neutral-400`
5. **Helper** (Dicas): `text-xs text-neutral-500 dark:text-neutral-500`

**Onde aplicar**:
- Títulos de página (h1) que usam `text-2xl` ou `text-3xl`
- Títulos de seção que não têm hierarquia clara
- Parágrafos sem `leading-relaxed`
- Textos de apoio sem cores neutras

**Exemplo de aplicação**:
```typescript
// ANTES: Títulos genéricos
<h1 className="text-2xl font-bold">Título</h1>
<h2 className="text-xl">Subtítulo</h2>
<p>Conteúdo</p>

// DEPOIS: Hierarquia clara
<h1 className="
  text-4xl md:text-5xl
  font-bold tracking-tight leading-tight
  text-neutral-900 dark:text-neutral-50
">
  Título
</h1>
<h2 className="
  text-xl md:text-2xl
  font-semibold tracking-tight
  text-neutral-900 dark:text-neutral-50
">
  Subtítulo
</h2>
<p className="
  text-base leading-relaxed
  text-neutral-600 dark:text-neutral-400
">
  Conteúdo
</p>
```

##### ⚡ Princípio 5: Micro-interações (Feedback Visual)

**O que aplicar**: Transições suaves de 150-300ms com feedback hover/active.

**Código padrão**:
```tsx
// Button com micro-interação
className="
  transition-all duration-200
  hover:scale-[1.02]
  active:scale-[0.98]
"

// Card clicável
className="
  transition-all duration-300
  hover:scale-[1.01]
  hover:-translate-y-1
"

// Icon com group-hover
className="
  transition-colors duration-200
  group-hover:text-primary
  group-hover:scale-110
"
```

**Onde aplicar**:
- Buttons sem transitions
- Cards clicáveis sem hover effects
- Icons sem animações
- Links sem feedback visual

**Exemplo de aplicação**:
```typescript
// ANTES: Sem micro-interações
<Button className="bg-primary">Salvar</Button>
<Card className="cursor-pointer">...</Card>

// DEPOIS: Com micro-interações
<Button className="
  bg-primary
  transition-all duration-200
  hover:scale-[1.02]
  active:scale-[0.98]
">
  Salvar
</Button>
<Card className="
  group cursor-pointer
  transition-all duration-300
  hover:scale-[1.01]
  hover:-translate-y-1
">
  <Icon className="
    transition-colors duration-200
    group-hover:text-primary
  " />
  ...
</Card>
```

##### ✅ Checklist de Aplicação dos 5 Princípios

Antes de prosseguir para componentes MCP, verifique mentalmente:

- [ ] Two-layer shadows aplicadas em cards/buttons?
- [ ] Color layering (Shade 1-4) aplicado na página?
- [ ] Espaçamentos premium (gap-6, p-6, space-y-8)?
- [ ] Tipografia hierárquica (Display → Heading → Body)?
- [ ] Micro-interações (hover, active, transitions)?
- [ ] Dark mode em TODOS os elementos (dark: variants)?

**Se a resposta for NÃO em qualquer item, aplique antes de prosseguir para ETAPA 3.**

#### 2.2 Aplicar Personalizações

Use Edit tool para aplicar as melhorias dos 5 princípios identificadas. **Documente cada mudança com comentário**:

```typescript
// [Refine v2.0.0] Two-layer shadow aplicada
<Card className="
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
  hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
  transition-shadow duration-300
">

// [Refine v2.0.0] Color layering aplicado (Shade 1-4)
<div className="
  min-h-screen bg-neutral-50 dark:bg-neutral-950
  p-6 md:p-8
">

// [Refine v2.0.0] Espaçamento premium aplicado (base 24px)
<div className="space-y-8 gap-6">

// [Refine v2.0.0] Hierarquia tipográfica aplicada
<h1 className="
  text-4xl md:text-5xl
  font-bold tracking-tight leading-tight
  text-neutral-900 dark:text-neutral-50
">

// [Refine v2.0.0] Micro-interações aplicadas
<Button className="
  transition-all duration-200
  hover:scale-[1.02] active:scale-[0.98]
">
```

**IMPORTANTE**: Aplique os 5 princípios ANTES de buscar componentes via MCP.

---

### ETAPA 3: Busca de Componentes Avançados (OPCIONAL - 20%)

**IMPORTANTE**: Esta etapa é OPCIONAL e serve apenas para SUGERIR componentes avançados dos registries MCP. O usuário deve aprovar MANUALMENTE quais deseja implementar.

**Esta etapa representa apenas 20% do trabalho de refinement. Os 5 princípios premium (ETAPA 2) são 80% do trabalho.**

**Pergunte ao usuário ANTES de buscar**:
```
✅ 5 Princípios Premium aplicados com sucesso!

• Two-Layer Shadows aplicadas em <X> cards/buttons
• Color Layering (Shade 1-4) aplicado na página
• Espaçamentos Premium (base 24px) aplicados
• Tipografia Hierárquica (5 níveis) aplicada
• Micro-interações aplicadas em elementos interativos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Deseja que eu busque componentes avançados (animações sofisticadas,
efeitos visuais complexos) dos registries MCP para sugerir melhorias
adicionais OPCIONAIS?

[Sim] [Não, os princípios premium já são suficientes]
```

Se o usuário responder **NÃO**, pule para ETAPA 6 (Documentação).

Se o usuário responder **SIM**, continue abaixo:

#### 3.1 Analisar Padrões para Busca

Use Grep para detectar padrões que podem se beneficiar de componentes avançados:

```bash
# Detectar formulários
grep -r "form\|<Form\|<Input\|<Label" "src/app/<feature-name>"

# Detectar listas/grids
grep -r "map(\|grid\|flex.*gap" "src/app/<feature-name>"

# Detectar cards
grep -r "<Card\|CardHeader\|CardContent" "src/app/<feature-name>"
```

#### 3.2 Definir Queries de Busca

Para cada categoria detectada, defina queries de busca específicas:

**Para Formulários/Inputs**:
```typescript
// Buscar inputs avançados
queries = [
  "input fancy animated",
  "form field enhanced",
  "text input effect",
  "search input"
]
```

**Para Listas/Cards**:
```typescript
// Buscar animações de lista
queries = [
  "animated list",
  "card stagger",
  "fade in grid",
  "animated card"
]
```

**Para Hover Effects**:
```typescript
// Buscar efeitos de hover
queries = [
  "hover effect card",
  "border gradient",
  "card glow",
  "spotlight"
]
```

#### 3.3 Executar Buscas via MCP

Para cada query, use `mcp__shadcn__search_items_in_registries`:

```typescript
// Exemplo: Buscar inputs fancy
mcp__shadcn__search_items_in_registries({
  registries: ["@shadcn", "@aceternity", "@magicui", "@motion-primitives"],
  query: "input fancy animated",
  limit: 5
})
```

**Importante**:
- Busque nos registries mais relevantes: @aceternity, @magicui, @motion-primitives
- Limite a 3-5 resultados por query para não sobrecarregar
- Armazene os resultados para apresentar ao usuário

#### 3.4 Obter Exemplos de Uso

Para componentes promissores, busque exemplos:

```typescript
// Ver exemplos de uso do componente encontrado
mcp__shadcn__get_item_examples_from_registries({
  registries: ["@aceternity"],
  query: "input fancy demo"
})
```

**Por que?** Exemplos mostram como usar o componente corretamente e se ele realmente se encaixa no contexto.

---

### ETAPA 4: Apresentação de Sugestões (NÃO IMPLEMENTAR)

**CRÍTICO**: Nesta etapa você APENAS APRESENTA os componentes encontrados. NÃO implemente nada ainda!

#### 4.1 Formato de Apresentação

Mostre sugestões de forma clara e organizada, com nomes exatos dos componentes:

```
🎨 Componentes Avançados Sugeridos para "<feature-name>"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 FORMULÁRIOS E INPUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Detectado: 8 inputs básicos em src/app/<feature>/new/page.tsx

┌─────────────────────────────────────────┐
│ Opção 1: @magicui/fancy-input           │
├─────────────────────────────────────────┤
│ ✓ Labels flutuantes animados            │
│ ✓ Ícones integrados                     │
│ ✓ Efeitos visuais ao focar              │
│ 📦 Demo: fancy-input-demo               │
│                                         │
│ Nome exato: @magicui/fancy-input        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Opção 2: @aceternity/floating-label     │
├─────────────────────────────────────────┤
│ ✓ Label flutuante com animação         │
│ ✓ Bordas com gradiente                 │
│ 📦 Demo: floating-label-demo            │
│                                         │
│ Nome exato: @aceternity/floating-label  │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎭 ANIMAÇÕES DE LISTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Detectado: Lista com map() em src/app/<feature>/page.tsx

┌─────────────────────────────────────────┐
│ Opção 3: @motion-primitives/stagger     │
├─────────────────────────────────────────┤
│ ✓ Animação cascata (stagger)           │
│ ✓ Fade-in suave                         │
│ ✓ Performance otimizada                 │
│ 📦 Demo: stagger-demo                   │
│                                         │
│ Nome exato: @motion-primitives/stagger  │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 PRÓXIMO PASSO:

Por favor, pesquise os componentes acima manualmente e me informe
quais você deseja que eu implemente.

Responda com:
- Os números das opções (ex: "1, 3")
- "nenhum" para não implementar componentes avançados
```

**IMPORTANTE**:
- Apresente os **nomes exatos** dos componentes (ex: `@magicui/fancy-input`)
- Inclua o **nome do demo** encontrado
- Deixe claro que o usuário deve **pesquisar manualmente** e aprovar

#### 4.2 Aguardar Confirmação do Usuário

**NÃO PROSSIGA** sem a resposta do usuário. Aguarde que ele confirme quais componentes deseja implementar.

Se o usuário responder **"nenhum"**, pule para ETAPA 6 (Documentação).

Se o usuário fornecer números (ex: "1, 3"), prossiga para ETAPA 5.

---

### ETAPA 5: Instalação e Aplicação de Componentes Aprovados

**IMPORTANTE**: Só execute esta etapa se o usuário aprovou componentes na ETAPA 4.

Para cada componente aprovado pelo usuário, siga este fluxo:

#### 5.1 Obter Comando de Instalação

Use `mcp__shadcn__get_add_command_for_items` para obter o comando exato:

```typescript
// Exemplo: Obter comando para instalar fancy-input
mcp__shadcn__get_add_command_for_items({
  items: ["@magicui/fancy-input"]
})

// Retorno esperado:
// "npx shadcn@latest add @magicui/fancy-input"
```

#### 5.2 Executar Instalação via Bash

Execute o comando retornado:

```bash
npx shadcn@latest add @magicui/fancy-input
```

**Importante**:
- Execute ONE comando por vez
- Aguarde conclusão antes do próximo
- Verifique se a instalação foi bem-sucedida

#### 5.3 Buscar Código de Exemplo

Após instalação, busque o exemplo de uso completo:

```typescript
mcp__shadcn__get_item_examples_from_registries({
  registries: ["@magicui"],
  query: "fancy-input-demo"
})
```

**Por que?** O exemplo mostra:
- Como importar o componente
- Quais props aceita
- Como usar corretamente
- Dependências adicionais

#### 5.4 Aplicação Contextual dos Componentes

**CRÍTICO**: Aplique os componentes mantendo toda a funcionalidade existente.

**Regras de Substituição**:

Ao aplicar refinamentos, siga estas regras:

**✅ MANTER**:
- Props existentes (onClick, onChange, value, etc.)
- Lógica de validação (mesmo que visual-only)
- Estrutura de dados e tipos
- Classes Tailwind importantes (responsividade, dark mode)
- Funcionalidade de navegação

**🔄 SUBSTITUIR/ADICIONAR**:
- Componente base por versão avançada
- Classes de animação/transição
- Efeitos visuais e microinterações
- Imports necessários

**❌ NÃO TOCAR**:
- Lógica de negócio (comentários TODO)
- Event handlers
- Estrutura de state management
- Rotas e navegação

**Exemplos Práticos de Aplicação**:

**Exemplo 1: Refinando Inputs em Formulário**

Arquivo: `src/app/<feature>/new/page.tsx`

**ANTES**:
```typescript
<div className="space-y-4">
  <div>
    <Label htmlFor="name">Nome Completo</Label>
    <Input
      id="name"
      type="text"
      placeholder="Digite o nome"
      className="mt-1"
    />
  </div>
  <div>
    <Label htmlFor="email">E-mail</Label>
    <Input
      id="email"
      type="email"
      placeholder="email@exemplo.com"
      className="mt-1"
    />
  </div>
</div>
```

**DEPOIS** (com @magicui/fancy-input):
```typescript
import { FancyInput } from '@/components/ui/fancy-input';
import { User, Mail } from 'lucide-react';

<div className="space-y-6">
  <FancyInput
    id="name"
    type="text"
    label="Nome Completo"
    placeholder="Digite o nome"
    icon={User}
    variant="floating"
    className="w-full"
  />
  <FancyInput
    id="email"
    type="email"
    label="E-mail"
    placeholder="email@exemplo.com"
    icon={Mail}
    variant="floating"
    className="w-full"
  />
</div>
```

**Mudanças aplicadas**:
- ✅ Substituído `<Label>` + `<Input>` por `<FancyInput>` com label integrado
- ✅ Adicionado ícones relevantes
- ✅ Variant "floating" para label animado
- ✅ Mantida estrutura e spacing

**Exemplo 2: Animando Lista de Cards**

Arquivo: `src/app/<feature>/page.tsx`

**ANTES**:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Link key={item.id} href={`/<feature>/${item.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{item.description}</p>
        </CardContent>
      </Card>
    </Link>
  ))}
</div>
```

**DEPOIS** (com @motion-primitives/fade-in):
```typescript
import { FadeIn } from '@/components/ui/fade-in';

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item, index) => (
    <FadeIn
      key={item.id}
      delay={index * 0.05}
      duration={0.3}
    >
      <Link href={`/<feature>/${item.id}`}>
        <Card className="h-full hover:shadow-lg hover:scale-[1.02] transition-all">
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{item.description}</p>
          </CardContent>
        </Card>
      </Link>
    </FadeIn>
  ))}
</div>
```

**Mudanças aplicadas**:
- ✅ Wrapper `<FadeIn>` com stagger delay
- ✅ Adicionado `scale` no hover para feedback visual
- ✅ Mantida estrutura de Link e Card
- ✅ Mantida responsividade (grid-cols)

**Exemplo 3: Melhorando Hover em Cards**

Arquivo: `src/features/<feature>/components/ItemCard.tsx`

**ANTES**:
```typescript
export function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(item.id)}
    >
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge>{item.status}</Badge>
      </CardContent>
    </Card>
  );
}
```

**DEPOIS** (com @aceternity/hover-border-gradient):
```typescript
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

export function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <HoverBorderGradient
      containerClassName="cursor-pointer"
      className="w-full"
      onClick={() => onClick(item.id)}
    >
      <Card className="border-0">
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge>{item.status}</Badge>
        </CardContent>
      </Card>
    </HoverBorderGradient>
  );
}
```

**Mudanças aplicadas**:
- ✅ Wrapper `<HoverBorderGradient>` para efeito de borda
- ✅ Removida borda do Card (border-0) para não conflitar
- ✅ Mantido onClick funcionando
- ✅ Mantida estrutura interna

---

### ETAPA 6: Documentação e Conclusão

#### 6.1 Atualizar README da Feature

Se existir `src/features/<feature-name>/README.md`, adicione uma seção de refinamentos:

```markdown
## 🎨 Refinamentos Visuais

> Refinado com `/design:refine` em <data>

### Componentes Avançados Aplicados

| Componente | Registry | Onde foi aplicado | Benefício |
|------------|----------|-------------------|-----------|
| FancyInput | @magicui | Formulários (new/edit) | Labels flutuantes + ícones |
| FadeIn | @motion-primitives | Lista principal | Animação de entrada suave |
| HoverBorderGradient | @aceternity | Cards de item | Borda animada no hover |

### Melhorias de UX

✅ **Formulários**:
- Inputs com labels flutuantes animados
- Ícones contextuais (User, Mail, etc.)
- Feedback visual ao focar

✅ **Listas**:
- Animação de entrada com stagger (cascata)
- Hover effects mais pronunciados
- Transições suaves

✅ **Cards**:
- Efeitos de hover com bordas gradientes
- Animação de escala sutil
- Sombras dinâmicas

### Performance

- Todas animações respeitam `prefers-reduced-motion`
- Stagger limitado a 20 itens para evitar lag
- Componentes otimizados para dark mode

### Próximos Passos

Para refinamentos adicionais, execute novamente:
```bash
/design:refine <feature-name>
```
```

#### 6.2 Mensagem de Conclusão

Exiba um resumo detalhado das mudanças aplicadas:

```
✅ Refinamento Premium v2.0.0 Completo - "<feature-name>"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌟 5 PRINCÍPIOS PREMIUM APLICADOS (80%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Two-Layer Shadows em <X> cards/buttons
✓ Color Layering (Shade 1-4) aplicado
✓ Espaçamentos Premium (base 24px) aplicados
✓ Tipografia Hierárquica (5 níveis) aplicada
✓ Micro-interações em elementos interativos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 COMPONENTES AVANÇADOS (20% - Opcional)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<Se aplicável, listar componentes MCP instalados>
✓ @magicui/fancy-input
✓ @motion-primitives/fade-in
✓ @aceternity/hover-border-gradient

<Se não aplicável>
Nenhum componente avançado foi instalado.
Os 5 princípios premium são suficientes para um visual profissional.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 ARQUIVOS MODIFICADOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• src/app/<feature>/page.tsx
  → [v2.0.0] Two-layer shadows aplicadas
  → [v2.0.0] Color layering (Shade 1-4)
  → [v2.0.0] Espaçamentos premium (gap-6, p-6 md:p-8)
  → [v2.0.0] Tipografia hierárquica
  → [v2.0.0] Micro-interações (hover/active)
  → [Opcional] Componentes MCP (se aplicável)

• src/app/<feature>/new/page.tsx
  → [v2.0.0] Princípios premium aplicados
  → [Opcional] Componentes MCP (se aplicável)

• src/features/<feature>/components/*.tsx
  → [v2.0.0] Princípios premium aplicados
  → [Opcional] Componentes MCP (se aplicável)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 RESULTADO VISUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Profundidade realista (two-layer shadows)
✓ Hierarquia visual clara (color layering + typography)
✓ Layout que "respira" (espaçamento premium)
✓ Feedback visual instantâneo (micro-interações)
✓ Dark mode totalmente suportado
✓ Responsividade mantida em todas as alterações

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 PRÓXIMOS PASSOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Teste a feature refinada:
   npm run dev
   Navegue para /<feature-name>

2. Compare com a versão anterior:
   • Observe a profundidade visual (shadows)
   • Note a hierarquia clara (colors + typography)
   • Sinta o "respiro" do layout (spacing)
   • Interaja para ver micro-animações

3. Aplique refinamentos v2.0.0 a outras features:
   /design:refine <outra-feature>

📚 Referências Premium:
   • Design System: .claude/design-system/
   • Templates: .claude/templates/
   • Princípios: design.md

⚠️  LEMBRE-SE: Refinamentos v2.0.0 são 80% princípios premium
   (automáticos) + 20% componentes MCP (opcionais). A lógica de
   negócio deve ser implementada separadamente.
```

---

## 📋 Checklist de Qualidade

Antes de concluir o refinamento, verifique:

### ✅ Funcionalidade
- [ ] Props originais preservadas (onClick, onChange, etc.)
- [ ] Event handlers funcionando
- [ ] Navegação intacta
- [ ] Responsividade mantida (grid-cols, etc.)

### ✅ Visual
- [ ] Dark mode suportado
- [ ] Animações suaves (duration < 0.5s)
- [ ] Stagger limitado (max 20 itens)
- [ ] Hover effects consistentes

### ✅ Acessibilidade
- [ ] `prefers-reduced-motion` respeitado
- [ ] Contraste adequado (dark + light mode)
- [ ] Keyboard navigation preservada

### ✅ Documentação
- [ ] README.md atualizado
- [ ] Imports corretos
- [ ] Componentes instalados via Shadcn

---

## 🎯 Recomendações de Uso do MCP

### Queries Eficazes por Categoria

**Para Formulários**:
```
✓ "input floating label"
✓ "form field enhanced"
✓ "fancy input icon"
```

**Para Listas**:
```
✓ "animated list stagger"
✓ "fade in grid"
✓ "card animation enter"
```

**Para Hover Effects**:
```
✓ "hover border gradient"
✓ "card glow effect"
✓ "button shine animation"
```

### Registries Prioritários

1. **@motion-primitives** - Animações essenciais (fade-in, slide-in)
2. **@magicui** - Inputs e componentes interativos
3. **@aceternity** - Efeitos visuais sofisticados

### Dicas de Instalação

- Sempre busque exemplos antes de instalar
- Verifique dependências do componente
- Teste em dark mode após instalação

---

## 💡 Valores de Referência (Guia Rápido)

### Timing de Animações
```typescript
duration: 0.3  // Padrão para fade-in, scale
duration: 0.5  // Máximo recomendado
delay: 0.05    // Stagger delay por item
delay: 0.1     // Delay inicial
```

### Limites de Performance
```typescript
Stagger máximo: 20 itens
Grid animado: até 50 cards
Efeitos complexos: usar com moderação
```

### Consistência
- **Formulários**: Sempre mesmo tipo de input (ex: todos floating label)
- **Listas**: Sempre mesmo efeito de entrada (fade-in OU slide-in, não misturar)
- **Cards**: Hover effect consistente em todo o sistema

---

## 🚀 Workflow Resumido

```
1. Validar feature existe (src/app/<feature>/)
2. Ler arquivos da feature (Read tool)
3. [PRIORIDADE] Personalizar layout (gap, padding, margin, etc.)
4. [OPCIONAL] Perguntar se usuário quer sugestões de componentes
5. [OPCIONAL] Buscar componentes via MCP (search + examples)
6. [OPCIONAL] Apresentar sugestões COM NOMES EXATOS
7. [OPCIONAL] AGUARDAR aprovação do usuário
8. [OPCIONAL] Instalar e aplicar componentes aprovados
9. Documentar mudanças (README.md + mensagem final)
```

**Foco Principal**: Personalização de layout (ETAPA 2)
**Diferencial**: Sugestões inteligentes via MCP que requerem aprovação manual

---

**Última atualização**: Sistema refatorado para priorizar personalização de layout 🎨
