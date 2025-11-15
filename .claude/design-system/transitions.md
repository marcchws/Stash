# Sistema de Micro-interações

> Transições Suaves + Hover Effects + Loading States + Focus States

---

## 🎯 Objetivo

Criar **feedback visual** através de micro-interações que:
1. Confirmam ações do usuário
2. Guiam a atenção
3. Melhoram percepção de velocidade
4. Criam conexão emocional

**Regra de Ouro**: Toda interação do usuário deve ter feedback visual (100-300ms).

---

## 1️⃣ Sistema de Durations

### Escala de Velocidade

```typescript
// src/theme/config.ts
transitions: {
  fast: {
    duration: '150ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'  // ease-in-out
  },
  base: {
    duration: '200ms',  // ⭐ PADRÃO
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  slow: {
    duration: '300ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
}
```

### Quando Usar Cada Duration

**150ms (Fast)** - Feedback imediato:
- Hover em buttons/links
- Mudanças de cor
- Checkbox/radio toggle
- Icon rotations

**200ms (Base)** ⭐ - Transições padrão:
- Hover scale em cards
- Button states
- Dropdown expand
- Tab switching

**300ms (Slow)** - Transições complexas:
- Shadow changes (depth perception)
- Modal/dialog open
- Sidebar collapse/expand
- Page transitions

---

### Aplicação Básica

```tsx
// Fast (150ms)
<Button className="transition-colors duration-150">

// Base (200ms) - PADRÃO
<Button className="transition-all duration-200">

// Slow (300ms)
<Card className="transition-shadow duration-300">
```

---

## 2️⃣ Tipos de Transitions

### `transition-all`

Anima **todas** as propriedades CSS que mudarem:

```tsx
<Button className="
  transition-all duration-200
  hover:scale-[1.02]
  hover:bg-primary-dark
  active:scale-[0.98]
">
  Anima tudo
</Button>
```

**Quando usar**: Elementos com poucas mudanças (buttons, badges)

**⚠️ Performance**: Pode ser custoso se muitas propriedades mudarem.

---

### `transition-colors`

Anima **apenas cores** (background, text, border):

```tsx
<Link className="
  transition-colors duration-150
  text-primary
  hover:text-primary-dark
">
  Link com cor animada
</Link>
```

**Quando usar**: Links, text buttons, badges

**✅ Performance**: Muito leve, use à vontade.

---

### `transition-shadow`

Anima **apenas sombras**:

```tsx
<Card className="
  shadow-md
  transition-shadow duration-300
  hover:shadow-lg
">
  Card com sombra animada
</Card>
```

**Quando usar**: Cards, dropdowns, modals

**💡 Dica**: Shadows são "pesadas" visualmente, use duration-300 (slow).

---

### `transition-transform`

Anima **transformações** (scale, rotate, translate):

```tsx
<Button className="
  transition-transform duration-200
  hover:scale-[1.05]
  active:scale-[0.95]
">
  Botão com escala
</Button>
```

**Quando usar**: Hover effects, mobile menus (translate)

**✅ Performance**: Transform é muito performático (GPU accelerated).

---

### `transition-opacity`

Anima **opacidade**:

```tsx
<div className="
  transition-opacity duration-200
  opacity-0
  hover:opacity-100
">
  Fade in on hover
</div>
```

**Quando usar**: Tooltips, overlays, fade effects

---

## 3️⃣ Hover Effects

### **Button Hover (Padrão)**

```tsx
<Button className="
  transition-all duration-200
  hover:scale-[1.02]    {/* Cresce 2% */}
  active:scale-[0.98]   {/* Encolhe 2% ao clicar */}
  hover:bg-primary-dark
">
  Botão Premium
</Button>
```

**Micro-interações aplicadas**:
- Scale up no hover (1.02) - "vem em sua direção"
- Scale down no active (0.98) - "você pressionou"
- Background escurece - feedback visual

---

### **Card Hover**

```tsx
<Card className="
  shadow-md
  transition-all duration-300
  hover:shadow-lg
  hover:scale-[1.01]    {/* Escala sutil - 1% */}
  hover:-translate-y-1  {/* Levita 4px */}
  cursor-pointer
">
  Card Interativo
</Card>
```

**Micro-interações aplicadas**:
- Shadow aumenta (depth change)
- Escala sutil (1.01) - quase imperceptível, mas sentido
- Translate up (-4px) - "levita" sobre a página
- Cursor pointer - affordance clara

---

### **Link Hover**

```tsx
<Link className="
  text-primary
  transition-colors duration-150
  hover:text-primary-dark
  hover:underline
  underline-offset-4
">
  Link com underline animado
</Link>
```

**Alternativa - Underline animado**:
```tsx
<Link className="
  relative
  text-primary
  after:content-['']
  after:absolute
  after:bottom-0
  after:left-0
  after:w-0
  after:h-0.5
  after:bg-primary
  after:transition-all
  after:duration-200
  hover:after:w-full
">
  Link com underline que cresce
</Link>
```

---

### **Image Hover (Zoom)**

```tsx
<div className="overflow-hidden rounded-lg">
  <img
    src="image.jpg"
    className="
      w-full h-full object-cover
      transition-transform duration-300
      hover:scale-110  {/* Zoom 10% */}
    "
  />
</div>
```

**⚠️ Importante**: Wrap em div com `overflow-hidden` para não "vazar".

---

## 4️⃣ Loading States

### **Skeleton Loaders**

```tsx
<Card className="animate-pulse">
  {/* Título */}
  <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mb-4" />

  {/* Linhas de texto */}
  <div className="space-y-3">
    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6" />
  </div>
</Card>
```

**Vantagens**:
- Mantém estrutura visual (sem "pulo" ao carregar)
- `animate-pulse` é built-in do Tailwind
- Melhora percepção de velocidade

---

### **Spinner Premium**

```tsx
<div className="flex items-center justify-center py-12">
  <div className="
    animate-spin
    rounded-full
    h-8 w-8
    border-2
    border-primary
    border-t-transparent
  " />
  <span className="ml-3 text-neutral-600 dark:text-neutral-400">
    Carregando...
  </span>
</div>
```

---

### **Progress Bar**

```tsx
<div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2">
  <div
    className="
      bg-primary
      h-2 rounded-full
      transition-all duration-300
    "
    style={{ width: `${progress}%` }}
  />
</div>
```

**Transição suave**: Quando `progress` muda, a barra anima suavemente.

---

## 5️⃣ Focus States (Acessibilidade)

### **Input Focus**

```tsx
<Input className="
  border-neutral-300 dark:border-neutral-700
  transition-all duration-200
  focus:border-primary
  focus:ring-2
  focus:ring-primary/20  {/* 20% opacity */}
  focus:outline-none
" />
```

**Micro-interações aplicadas**:
- Border muda para primary
- Ring aparece (glow effect)
- Transição suave (200ms)

---

### **Button Focus**

```tsx
<Button className="
  transition-all duration-200
  focus:outline-none
  focus:ring-2
  focus:ring-primary
  focus:ring-offset-2
  focus:ring-offset-white dark:focus:ring-offset-neutral-900
">
  Botão Acessível
</Button>
```

---

### **Link Focus (Keyboard Navigation)**

```tsx
<Link className="
  rounded
  transition-all duration-150
  focus:outline-none
  focus:ring-2
  focus:ring-primary
  focus:ring-offset-2
">
  Link navegável por teclado
</Link>
```

---

## 6️⃣ Active States (Pressed)

### **Button Press**

```tsx
<Button className="
  transition-all duration-200
  hover:scale-[1.02]
  active:scale-[0.98]   {/* ⭐ Feedback de "pressionado" */}
  active:brightness-90  {/* Escurece ao pressionar */}
">
  Pressione-me
</Button>
```

**Sequência**:
1. Hover → Cresce (1.02)
2. Click/Press → Encolhe (0.98) + escurece
3. Release → Volta ao hover

---

### **Card Press (se clicável)**

```tsx
<Card className="
  cursor-pointer
  transition-all duration-200
  hover:scale-[1.01]
  active:scale-[0.99]   {/* Leve encolhimento */}
">
  Card clicável
</Card>
```

---

## 7️⃣ Disabled States

### **Button Disabled**

```tsx
<Button
  disabled
  className="
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:scale-100    {/* Cancela hover */}
    disabled:active:scale-100   {/* Cancela active */}
  "
>
  Desabilitado
</Button>
```

---

### **Input Disabled**

```tsx
<Input
  disabled
  className="
    disabled:bg-neutral-100 dark:disabled:bg-neutral-800
    disabled:text-neutral-400 dark:disabled:text-neutral-600
    disabled:cursor-not-allowed
    disabled:border-neutral-200 dark:disabled:border-neutral-700
  "
/>
```

---

## 8️⃣ Group Hover (Parent → Child)

### **Card com Icon**

```tsx
<Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg">
  <div className="flex items-center gap-3">
    {/* Icon que muda quando card recebe hover */}
    <div className="
      p-2 rounded-lg
      bg-neutral-100 dark:bg-neutral-800
      transition-colors duration-200
      group-hover:bg-primary/10
    ">
      <Icon className="
        w-5 h-5
        text-neutral-600 dark:text-neutral-400
        transition-colors duration-200
        group-hover:text-primary
      " />
    </div>

    <span className="
      transition-colors duration-200
      group-hover:text-primary
    ">
      Hover no card afeta tudo
    </span>
  </div>
</Card>
```

**Como funciona**:
1. Adicione `group` no pai
2. Use `group-hover:` nos filhos
3. Quando passa o mouse no pai, todos os filhos com `group-hover:` reagem

---

## 9️⃣ Animações Especiais

### **Fade In (Enter Animation)**

```tsx
<div className="
  animate-in
  fade-in
  duration-300
">
  Aparece suavemente
</div>
```

---

### **Slide In from Bottom**

```tsx
<Dialog className="
  animate-in
  slide-in-from-bottom
  fade-in
  duration-300
">
  Modal que desliza de baixo
</Dialog>
```

---

### **Bounce (Call-to-Action)**

```tsx
<Button className="
  animate-bounce
  hover:animate-none  {/* Para ao fazer hover */}
">
  Atenção! 🎯
</Button>
```

**⚠️ Use com moderação**: Animações repetitivas podem irritar.

---

## 📋 Checklist de Micro-interações

Ao criar componentes interativos:

- [ ] **Hover**: Feedback visual em 150-200ms
- [ ] **Active**: Estado pressionado (scale down 0.98)
- [ ] **Focus**: Ring visível para teclado (ring-2 ring-primary)
- [ ] **Disabled**: Opacidade reduzida + cursor not-allowed
- [ ] **Loading**: Skeleton ou spinner enquanto carrega
- [ ] **Transitions**: Usa transition-all ou específico (colors, shadow, transform)
- [ ] **Duration**: 150ms (fast), 200ms (base), 300ms (slow)
- [ ] **Group Hover**: Elementos relacionados reagem juntos

---

## 🚫 Erros Comuns

❌ **Sem transição**:
```tsx
<Button className="hover:bg-primary-dark"> {/* Mudança abrupta */}
```

❌ **Transição muito longa**:
```tsx
<Button className="transition-all duration-1000"> {/* 1s é MUITO lento */}
```

❌ **Hover sem cursor pointer**:
```tsx
<Card className="hover:shadow-lg"> {/* Sem cursor-pointer */}
```

❌ **Sem feedback no active**:
```tsx
<Button className="hover:scale-[1.02]"> {/* Sem active:scale-[0.98] */}
```

✅ **Correto**:
```tsx
<Button className="
  cursor-pointer
  transition-all duration-200
  hover:scale-[1.02]
  hover:bg-primary-dark
  active:scale-[0.98]
  focus:outline-none focus:ring-2 focus:ring-primary
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Botão Completo
</Button>
```

---

## 🎓 Exemplo Completo

```tsx
export function InteractiveCard({ title, content, onClick }: Props) {
  return (
    <Card
      onClick={onClick}
      className="
        group
        cursor-pointer
        shadow-md
        transition-all duration-300
        hover:shadow-lg
        hover:scale-[1.01]
        hover:-translate-y-1
        active:scale-[0.99]
        focus:outline-none focus:ring-2 focus:ring-primary
      "
    >
      <CardHeader className="flex flex-row items-center gap-3">
        {/* Icon badge com group-hover */}
        <div className="
          p-2 rounded-lg
          bg-neutral-100 dark:bg-neutral-800
          transition-all duration-200
          group-hover:bg-primary/10
          group-hover:scale-110
        ">
          <Icon className="
            w-5 h-5
            text-neutral-600 dark:text-neutral-400
            transition-colors duration-200
            group-hover:text-primary
          " />
        </div>

        {/* Título com group-hover */}
        <CardTitle className="
          text-xl font-semibold
          transition-colors duration-200
          group-hover:text-primary
        ">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="
          text-base leading-relaxed
          text-neutral-600 dark:text-neutral-400
        ">
          {content}
        </p>

        {/* Button secundário */}
        <Button
          className="
            mt-4 w-full
            transition-all duration-200
            hover:scale-[1.02]
            active:scale-[0.98]
          "
          variant="outline"
        >
          Saiba mais
        </Button>
      </CardContent>
    </Card>
  );
}
```

**Micro-interações aplicadas**:
- ✅ Card hover (shadow + scale + translate)
- ✅ Group hover (icon + título mudam juntos)
- ✅ Button hover/active
- ✅ Transições suaves (200-300ms)
- ✅ Focus state para acessibilidade

---

**Referência**: [principles.md](./principles.md) | [responsive.md](./responsive.md)
