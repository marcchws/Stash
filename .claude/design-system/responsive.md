# Sistema Responsivo

> Mobile-First + Layout Inteligente + Espaçamentos Premium

---

## 🎯 Objetivo

Criar layouts que **"respiram"** ao invés de **"quebrar"** quando o espaço muda, mantendo:
1. **Hierarquia visual** em todas as telas
2. **Espaçamentos proporcionais** que escalam
3. **Reorganização inteligente** de elementos
4. **Performance otimizada** (mobile-first)

---

## 1️⃣ Filosofia Mobile-First

### Por que Mobile-First?

1. **Performance**: Carrega menos CSS inicial
2. **Acessibilidade**: Foca no essencial primeiro
3. **Escalabilidade**: Mais fácil adicionar do que remover

### Regra de Ouro

**SEMPRE comece com mobile (sem breakpoint), depois adicione para telas maiores**

❌ **Errado** (Desktop-first):
```tsx
<div className="grid-cols-3 md:grid-cols-1"> {/* Começa desktop */}
```

✅ **Correto** (Mobile-first):
```tsx
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> {/* Começa mobile */}
```

---

## 2️⃣ Breakpoints do Sistema

### Breakpoints Padrão (Tailwind)

```typescript
// Aplicados automaticamente
sm: '640px',   // Tablet pequeno
md: '768px',   // Tablet
lg: '1024px',  // Desktop pequeno
xl: '1280px',  // Desktop
2xl: '1536px', // Desktop grande
```

### Como Usar

```tsx
// Mobile (base) → Tablet → Desktop
<div className="
  text-base     {/* Mobile: 16px */}
  md:text-lg    {/* Tablet: 18px */}
  lg:text-xl    {/* Desktop: 20px */}
">
```

**Lógica**: Cada breakpoint **sobrescreve** o anterior quando a tela é maior ou igual.

---

## 3️⃣ Espaçamentos Premium

### Escala Premium vs Genérica

```typescript
// GENÉRICO (evitar)
gap-4    // 16px - muito apertado
p-4      // 16px - sem respiro
space-y-4 // 16px - comprimido

// PREMIUM (usar)
gap-6        // 24px - respiro visual
p-6 md:p-8   // 24px → 32px - escala
space-y-6    // 24px - hierarquia clara
```

### Regra dos 24px

**Base para espaçamentos premium é 24px (gap-6, p-6, space-y-6)**

Isso cria mais "respiro visual" e sensação de qualidade.

---

### Aplicação por Contexto

#### **Pages (Containers Principais)**

```tsx
<div className="
  min-h-screen
  bg-neutral-50 dark:bg-neutral-950
  p-6 md:p-8 lg:p-10  {/* 24px → 32px → 40px */}
">
  <div className="
    container mx-auto
    max-w-7xl  {/* Limita largura máxima */}
    space-y-8  {/* 32px entre seções */}
  ">
    {/* Conteúdo */}
  </div>
</div>
```

**Progressão**: Mobile (respiro moderado) → Desktop (respiro generoso)

---

#### **Cards**

```tsx
<Card className="
  p-6      {/* 24px padding interno */}
  space-y-4 {/* 16px entre elementos internos (pode ser menor que o container) */}
">
  <CardHeader className="pb-4"> {/* 16px espaço abaixo */}
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo
  </CardContent>
</Card>
```

---

#### **Grids Responsivos**

```tsx
<div className="
  grid
  grid-cols-1        {/* Mobile: 1 coluna */}
  sm:grid-cols-2     {/* Tablet: 2 colunas */}
  lg:grid-cols-3     {/* Desktop: 3 colunas */}
  xl:grid-cols-4     {/* Desktop grande: 4 colunas */}
  gap-6              {/* 24px gap consistente */}
">
  {items.map(item => (
    <Card key={item.id}>...</Card>
  ))}
</div>
```

**Lógica**: Aumenta colunas conforme espaço disponível, mas mantém gap consistente.

---

#### **Formulários**

```tsx
<form className="space-y-6"> {/* 24px entre fields */}
  <div className="
    grid
    grid-cols-1 md:grid-cols-2  {/* 1 col mobile, 2 cols desktop */}
    gap-6
  ">
    <div className="space-y-2"> {/* 8px entre label e input */}
      <Label>Nome</Label>
      <Input />
    </div>
    <div className="space-y-2">
      <Label>Email</Label>
      <Input />
    </div>
  </div>

  {/* Field full-width */}
  <div className="space-y-2 col-span-full">
    <Label>Descrição</Label>
    <Textarea />
  </div>
</form>
```

---

## 4️⃣ Layout Inteligente (Pensamento em Boxes)

### Conceito

Antes de escrever código, **visualize a hierarquia de boxes**:

```
┌─ Page (Shade 1) ─────────────────────┐
│  ┌─ Container (max-w) ─────────────┐ │
│  │  ┌─ Card (Shade 2) ───────────┐ │ │
│  │  │  ┌─ Header ──────────────┐ │ │ │
│  │  │  │  Title + Description  │ │ │ │
│  │  │  └───────────────────────┘ │ │ │
│  │  │  ┌─ Content ─────────────┐ │ │ │
│  │  │  │  Grid de Items        │ │ │ │
│  │  │  │  ┌──┐ ┌──┐ ┌──┐     │ │ │ │
│  │  │  │  └──┘ └──┘ └──┘     │ │ │ │
│  │  │  └───────────────────────┘ │ │ │
│  │  └─────────────────────────────┘ │ │
│  └───────────────────────────────────┘ │
└───────────────────────────────────────┘
```

### Relacionamentos

1. **Page contém Container**: Container limita largura máxima
2. **Container contém Cards**: Cards flutuam sobre o background
3. **Card contém Header + Content**: Hierarquia interna
4. **Content contém Grid**: Grid se reorganiza responsivamente

---

### Exemplo Prático

```tsx
// 1. Page (box maior)
<div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6 md:p-8">

  // 2. Container (limita largura)
  <div className="container mx-auto max-w-7xl space-y-8">

    // 3. Header (pode ser fixo)
    <header className="space-y-2">
      <h1 className="text-4xl md:text-5xl font-bold">Título</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400">Descrição</p>
    </header>

    // 4. Card (flutua sobre page)
    <Card className="p-6">

      // 5. Content interno (grid responsivo)
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </Card>
  </div>
</div>
```

---

## 5️⃣ Reorganização Inteligente

### Conceito

Elementos devem se **reorganizar naturalmente**, não "quebrar":

❌ **Layout que quebra**:
```tsx
// 4 colunas fixas - overflow em mobile
<div className="grid-cols-4 gap-4">
```

✅ **Layout que respira**:
```tsx
// Colapsa para menos colunas conforme espaço
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

---

### Padrões Comuns

#### **Sidebar + Content**

```tsx
// Mobile: Stack vertical
// Desktop: Sidebar lateral

<div className="
  flex
  flex-col lg:flex-row  {/* Vertical mobile, horizontal desktop */}
  gap-6
">
  {/* Sidebar */}
  <aside className="
    w-full lg:w-64  {/* Full width mobile, fixed desktop */}
    flex-shrink-0   {/* Não encolhe em desktop */}
  ">
    Navegação
  </aside>

  {/* Content */}
  <main className="flex-1"> {/* Ocupa espaço restante */}
    Conteúdo principal
  </main>
</div>
```

---

#### **Hero Section**

```tsx
<div className="
  flex
  flex-col lg:flex-row  {/* Stack mobile, side-by-side desktop */}
  items-center
  gap-8 lg:gap-12
">
  {/* Texto */}
  <div className="
    flex-1
    text-center lg:text-left  {/* Centralizado mobile, alinhado desktop */}
    space-y-4
  ">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
      Grande Título
    </h1>
    <p className="text-lg md:text-xl">
      Descrição
    </p>
  </div>

  {/* Imagem */}
  <div className="
    w-full lg:w-1/2  {/* Full mobile, metade desktop */}
  ">
    <img src="hero.png" className="w-full h-auto" />
  </div>
</div>
```

---

#### **Cards Responsivos**

```tsx
// 1 col mobile → 2 cols tablet → 3 cols desktop → 4 cols telas grandes
<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-6
">
  {items.map(item => (
    <Card key={item.id} className="h-full"> {/* h-full mantém altura igual */}
      <CardHeader>
        <CardTitle className="
          text-lg md:text-xl  {/* Texto escala */}
        ">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {item.content}
      </CardContent>
    </Card>
  ))}
</div>
```

---

## 6️⃣ Tipografia Responsiva

### Escala Fluida

Textos devem **escalar proporcionalmente**:

```tsx
// Display (Hero)
<h1 className="
  text-4xl    {/* Mobile: 36px */}
  md:text-5xl {/* Tablet: 48px */}
  lg:text-6xl {/* Desktop: 60px */}
  font-bold tracking-tight leading-tight
">

// Heading (Seções)
<h2 className="
  text-2xl    {/* Mobile: 24px */}
  md:text-3xl {/* Tablet: 30px */}
  lg:text-4xl {/* Desktop: 36px */}
  font-bold tracking-tight
">

// Body (Texto regular)
<p className="
  text-base   {/* Mobile: 16px */}
  md:text-lg  {/* Tablet: 18px - mais legível */}
  leading-relaxed
">
```

### Regra

- **Títulos grandes**: Escalam mais agressivamente
- **Body text**: Escala moderadamente (base → lg no máximo)
- **Captions**: Geralmente não escalam (text-sm fixo)

---

## 7️⃣ Max-Width Estratégico

### Por que Limitar Largura?

Textos muito largos são **difíceis de ler**. Linhas devem ter 60-80 caracteres.

### Aplicação

```tsx
// Containers de texto
<div className="max-w-prose"> {/* ~65ch (caracteres) */}
  <p>Texto longo...</p>
</div>

// Formulários
<form className="max-w-2xl"> {/* 672px */}
  {/* Fields */}
</form>

// Páginas de detalhe
<div className="max-w-4xl mx-auto"> {/* 896px centralizado */}
  {/* Conteúdo */}
</div>

// Layout geral
<div className="max-w-7xl mx-auto"> {/* 1280px centralizado */}
  {/* Todo o conteúdo */}
</div>
```

---

## 8️⃣ Estados Responsivos Especiais

### Hidden/Visible por Breakpoint

```tsx
// Mostra apenas em mobile
<div className="block md:hidden">
  Menu mobile
</div>

// Mostra apenas em desktop
<div className="hidden md:block">
  Menu desktop
</div>

// Sidebar colapsável
<aside className="
  fixed md:static      {/* Fixed mobile, static desktop */}
  inset-y-0 left-0
  z-50 md:z-auto
  w-64
  transform md:transform-none  {/* Transições só mobile */}
  -translate-x-full md:translate-x-0
  transition-transform md:transition-none
">
```

---

## 📋 Checklist de Responsividade

Ao criar layouts:

- [ ] **Mobile-First**: Classes base sem breakpoint
- [ ] **Espaçamentos Premium**: Base de 24px (gap-6, p-6, space-y-6)
- [ ] **Espaçamentos Escalam**: p-6 md:p-8 lg:p-10
- [ ] **Grids Responsivos**: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
- [ ] **Tipografia Escala**: text-4xl md:text-5xl lg:text-6xl
- [ ] **Max-Width**: Containers limitados (max-w-7xl)
- [ ] **Reorganização**: Stack vertical → horizontal (flex-col lg:flex-row)
- [ ] **Hidden/Visible**: Estados específicos por breakpoint quando necessário

---

## 🚫 Erros Comuns

❌ **Desktop-first**:
```tsx
<div className="grid-cols-3 md:grid-cols-1"> {/* Backwards */}
```

❌ **Espaçamentos apertados**:
```tsx
<div className="gap-4 p-4"> {/* 16px - sem premium */}
```

❌ **Sem escala responsiva**:
```tsx
<h1 className="text-4xl"> {/* Fixo - não escala */}
```

❌ **Layout quebra ao invés de reorganizar**:
```tsx
<div className="grid-cols-4"> {/* Sem fallback mobile */}
```

✅ **Correto**:
```tsx
<div className="
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  gap-6
  p-6 md:p-8
">
  <h1 className="text-4xl md:text-5xl">Título</h1>
</div>
```

---

## 🎓 Exemplo Completo

```tsx
export function ResponsiveLayout() {
  return (
    <div className="
      min-h-screen
      bg-neutral-50 dark:bg-neutral-950
      p-6 md:p-8 lg:p-10  {/* Escala de padding */}
    ">
      <div className="
        container mx-auto
        max-w-7xl  {/* Limita largura máxima */}
        space-y-8  {/* 32px entre seções principais */}
      ">
        {/* Hero responsivo */}
        <header className="
          flex flex-col lg:flex-row  {/* Stack mobile, side-by-side desktop */}
          items-center lg:items-start
          gap-8 lg:gap-12
          text-center lg:text-left
        ">
          <div className="flex-1 space-y-4">
            <h1 className="
              text-4xl md:text-5xl lg:text-6xl  {/* Tipografia escala */}
              font-bold tracking-tight
            ">
              Sistema Responsivo
            </h1>
            <p className="
              text-lg md:text-xl
              text-neutral-600 dark:text-neutral-400
              max-w-prose  {/* Limita largura do texto */}
            ">
              Layout que respira e se reorganiza inteligentemente
            </p>
          </div>
          <div className="w-full lg:w-1/3">
            <img src="hero.png" alt="Hero" className="w-full h-auto" />
          </div>
        </header>

        {/* Grid de cards responsivo */}
        <div className="
          grid
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  {/* Colapsa conforme espaço */}
          gap-6  {/* 24px gap consistente */}
        ">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="h-full p-6">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  Card {i}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Conteúdo do card que se adapta
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

**Referência**: [principles.md](./principles.md) | [typography.md](./typography.md)
