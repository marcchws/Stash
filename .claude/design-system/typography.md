# Sistema de Tipografia

> Hierarquia Clara + Legibilidade Otimizada + Escala Responsiva

---

## 🎯 Objetivo

Criar **hierarquia tipográfica** que:
1. Diferencia claramente níveis de importância
2. Mantém legibilidade em todas as telas
3. Usa font weights estrategicamente
4. Escala responsivamente

---

## 1️⃣ Hierarquia de 5 Níveis

### Conceito

Texto bem estruturado tem **5 níveis claros** de hierarquia:

```
1. Display    - Títulos hero/principais (muito grande)
2. Heading    - Títulos de seção (grande)
3. Body       - Texto regular (médio)
4. Caption    - Legendas e helper text (pequeno)
5. Helper     - Textos auxiliares/disabled (muito pequeno)
```

---

### Nível 1: Display (Hero Titles)

Use para: Títulos de páginas, hero sections, primeiras impressões

```tsx
<h1 className="
  text-4xl md:text-5xl lg:text-6xl  {/* 36px → 48px → 60px */}
  font-bold                           {/* 700 */}
  tracking-tight                      {/* -0.025em */}
  leading-tight                       {/* 1.25 */}
  text-neutral-900 dark:text-neutral-50
">
  Título Principal da Página
</h1>
```

**Características**:
- **Tamanho**: 36px-60px (escala responsiva)
- **Weight**: 700 (bold)
- **Tracking**: Tight (-0.025em) - letras mais próximas
- **Leading**: Tight (1.25) - linhas mais próximas
- **Cor**: Máximo contraste (neutral-900/50)

**Quando usar**:
- Homepage hero
- Títulos de landing pages
- Primeira coisa que o usuário vê

---

### Nível 2: Heading (Section Titles)

Use para: Títulos de seções, cards importantes, modais

```tsx
<h2 className="
  text-2xl md:text-3xl lg:text-4xl  {/* 24px → 30px → 36px */}
  font-bold                          {/* 700 */}
  tracking-tight                     {/* -0.025em */}
  text-neutral-900 dark:text-neutral-50
">
  Título de Seção
</h2>

{/* Variante: Subtítulo (h3) */}
<h3 className="
  text-xl md:text-2xl  {/* 20px → 24px */}
  font-semibold        {/* 600 */}
  tracking-tight
  text-neutral-700 dark:text-neutral-300
">
  Subtítulo
</h3>
```

**Características h2**:
- **Tamanho**: 24px-36px
- **Weight**: 700 (bold)
- **Tracking**: Tight
- **Cor**: Máximo contraste

**Características h3**:
- **Tamanho**: 20px-24px
- **Weight**: 600 (semibold) - ligeiramente menos pesado
- **Cor**: Contraste médio-alto (neutral-700/300)

---

### Nível 3: Body (Regular Text)

Use para: Parágrafos, descrições, conteúdo principal

```tsx
<p className="
  text-base md:text-lg  {/* 16px → 18px */}
  font-normal            {/* 400 */}
  leading-relaxed        {/* 1.75 */}
  text-neutral-600 dark:text-neutral-400
">
  Este é o texto regular do corpo. Deve ser facilmente legível
  e confortável para leitura prolongada.
</p>

{/* Variante: Texto de destaque */}
<p className="
  text-lg                {/* 18px */}
  font-medium            {/* 500 */}
  text-neutral-700 dark:text-neutral-300
">
  Texto com leve destaque
</p>
```

**Características**:
- **Tamanho**: 16px-18px (escala sutil)
- **Weight**: 400 (normal), ocasionalmente 500 (medium)
- **Leading**: Relaxed (1.75) - espaçamento generoso entre linhas
- **Cor**: Contraste médio (neutral-600/400)

**Regra**: Texto de corpo NUNCA deve usar bold. Use medium para destaque leve.

---

### Nível 4: Caption (Labels & Metadata)

Use para: Labels, metadados, timestamps, legendas

```tsx
<span className="
  text-sm            {/* 14px */}
  font-normal        {/* 400 */}
  text-neutral-500 dark:text-neutral-500
">
  Publicado em 10 de janeiro de 2025
</span>

{/* Labels de formulário */}
<Label className="
  text-sm            {/* 14px */}
  font-medium        {/* 500 */}
  text-neutral-700 dark:text-neutral-300
">
  Nome Completo
</Label>
```

**Características**:
- **Tamanho**: 14px (geralmente fixo)
- **Weight**: 400-500 (normal ou medium)
- **Cor**: Contraste médio-baixo (neutral-500)

**Quando usar**:
- Labels de inputs
- Timestamps
- Metadados (autor, data, categoria)
- Legendas de imagens

---

### Nível 5: Helper (Auxiliary Text)

Use para: Textos auxiliares, disabled, placeholders

```tsx
<p className="
  text-xs               {/* 12px */}
  font-normal           {/* 400 */}
  text-neutral-400 dark:text-neutral-600
">
  Este campo é opcional
</p>

{/* Texto desabilitado */}
<span className="
  text-sm
  text-neutral-400 dark:text-neutral-600
  italic
">
  Função desabilitada
</span>
```

**Características**:
- **Tamanho**: 12px-14px
- **Weight**: 400 (normal)
- **Cor**: Contraste baixo (neutral-400/600)
- **Opcional**: Italic para enfatizar auxiliaridade

---

## 2️⃣ Font Weights Estratégicos

### Escala de Weights

```typescript
light: 300      // Raramente usado
normal: 400     // Body text padrão ⭐
medium: 500     // Body text com leve destaque
semibold: 600   // Subtítulos (h3, h4)
bold: 700       // Títulos principais (h1, h2) ⭐
```

### Regras de Uso

**❌ NÃO faça**:
```tsx
<p className="font-bold"> {/* Body text nunca é bold */}
<h1 className="font-normal"> {/* Títulos nunca são normais */}
```

**✅ FAÇA**:
```tsx
<h1 className="font-bold">      {/* Títulos principais */}
<h3 className="font-semibold">  {/* Subtítulos */}
<p className="font-normal">     {/* Body text */}
<p className="font-medium">     {/* Body com leve destaque */}
```

---

## 3️⃣ Tracking (Letter Spacing)

### Conceito

**Tracking** controla o espaçamento entre letras:
- **Tight (-0.025em)**: Para títulos grandes - cria unidade visual
- **Normal (0)**: Para body text - padrão legível
- **Wide (+0.025em)**: Raramente usado (textos uppercase)

### Aplicação

```tsx
// Títulos grandes - tracking tight
<h1 className="text-5xl font-bold tracking-tight">
  Classe A Locadora
</h1>

// Body text - sem tracking (normal)
<p className="text-base">
  Texto regular sem ajuste
</p>

// Uppercase - tracking wide
<span className="text-xs uppercase tracking-wide">
  NOVO
</span>
```

---

## 4️⃣ Leading (Line Height)

### Conceito

**Leading** controla o espaçamento entre linhas:
- **Tight (1.25)**: Para títulos grandes - compacto
- **Normal (1.5)**: Para body text curto
- **Relaxed (1.75)**: Para body text longo - mais confortável ⭐

### Aplicação

```tsx
// Título - leading tight
<h1 className="text-5xl leading-tight">
  Título em
  Múltiplas Linhas
</h1>

// Body text - leading relaxed
<p className="text-base leading-relaxed">
  Texto longo que precisa de espaçamento generoso entre linhas
  para facilitar a leitura prolongada e evitar fadiga visual.
</p>
```

**Regra**: Quanto mais texto, mais leading (relaxed).

---

## 5️⃣ Hierarquia de Cores

### Princípio

Hierarquia não é só tamanho/weight - **cor** também importa:

```
Mais Importante  → Mais Contraste  → neutral-900/50
Médio            → Contraste Médio → neutral-700/300
Menos Importante → Menos Contraste → neutral-500
Auxiliar         → Baixo Contraste → neutral-400/600
```

### Exemplo Prático

```tsx
<div>
  {/* Nível 1: Máximo contraste */}
  <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
    Título Principal
  </h1>

  {/* Nível 2: Alto contraste */}
  <h2 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300">
    Subtítulo
  </h2>

  {/* Nível 3: Contraste médio */}
  <p className="text-base text-neutral-600 dark:text-neutral-400">
    Texto do corpo
  </p>

  {/* Nível 4: Contraste baixo */}
  <span className="text-sm text-neutral-500 dark:text-neutral-500">
    Metadados
  </span>

  {/* Nível 5: Contraste muito baixo */}
  <span className="text-xs text-neutral-400 dark:text-neutral-600">
    Helper text
  </span>
</div>
```

---

## 6️⃣ Tipografia Responsiva

### Escala Móvel

Textos devem escalar suavemente entre mobile e desktop:

```tsx
// Display - escala agressiva
text-4xl md:text-5xl lg:text-6xl    // 36px → 48px → 60px

// Heading - escala moderada
text-2xl md:text-3xl lg:text-4xl    // 24px → 30px → 36px

// Body - escala sutil
text-base md:text-lg                 // 16px → 18px

// Caption/Helper - geralmente fixo
text-sm                              // 14px (não escala)
```

### Regra

**Quanto maior o texto, mais agressiva a escala**.

---

## 7️⃣ Aplicação por Contexto

### **Cards**

```tsx
<Card>
  <CardHeader>
    {/* Título do card - Heading nível 2/3 */}
    <CardTitle className="
      text-xl md:text-2xl
      font-semibold
      tracking-tight
      text-neutral-900 dark:text-neutral-50
    ">
      Título do Card
    </CardTitle>

    {/* Descrição - Caption */}
    <CardDescription className="
      text-sm
      text-neutral-500 dark:text-neutral-500
    ">
      Descrição breve
    </CardDescription>
  </CardHeader>

  <CardContent>
    {/* Conteúdo - Body */}
    <p className="
      text-base
      leading-relaxed
      text-neutral-600 dark:text-neutral-400
    ">
      Texto do conteúdo
    </p>
  </CardContent>
</Card>
```

---

### **Formulários**

```tsx
<form className="space-y-6">
  <div className="space-y-2">
    {/* Label - Caption medium */}
    <Label className="
      text-sm
      font-medium
      text-neutral-700 dark:text-neutral-300
    ">
      Nome Completo
    </Label>

    {/* Input */}
    <Input className="
      text-base
      text-neutral-900 dark:text-neutral-50
    " />

    {/* Helper text - Helper */}
    <p className="
      text-xs
      text-neutral-500 dark:text-neutral-500
    ">
      Digite seu nome conforme documento
    </p>
  </div>
</form>
```

---

### **Navegação (Sidebar)**

```tsx
<nav>
  {items.map(item => (
    <Link className="flex items-center gap-3 px-4 py-3">
      <Icon className="w-5 h-5" />

      {/* Label de navegação - Body medium */}
      <span className="
        text-base
        font-medium
        text-neutral-700 dark:text-neutral-300
      ">
        {item.name}
      </span>
    </Link>
  ))}
</nav>
```

---

## 📋 Checklist de Tipografia

Ao aplicar texto:

- [ ] **Hierarquia**: 5 níveis claramente diferenciados
- [ ] **Tamanhos**: Display (36-60px), Heading (20-36px), Body (16-18px)
- [ ] **Weights**: Bold para títulos (700), Normal para body (400)
- [ ] **Tracking**: Tight para títulos grandes
- [ ] **Leading**: Relaxed para body text (1.75)
- [ ] **Cores**: Segue hierarquia (neutral-900 → 400/600)
- [ ] **Responsivo**: Títulos escalam (md:text-*, lg:text-*)
- [ ] **Legibilidade**: Body text tem leading-relaxed

---

## 🚫 Erros Comuns

❌ **Body text em bold**:
```tsx
<p className="font-bold"> {/* Body nunca é bold */}
```

❌ **Títulos sem escala responsiva**:
```tsx
<h1 className="text-4xl"> {/* Não escala para desktop */}
```

❌ **Sem hierarquia de cor**:
```tsx
<h1 className="text-neutral-600"> {/* Contraste fraco para título */}
<p className="text-neutral-600">  {/* Mesma cor = sem hierarquia */}
```

❌ **Leading apertado em body**:
```tsx
<p className="leading-tight"> {/* Dificulta leitura longa */}
```

✅ **Correto**:
```tsx
<h1 className="
  text-4xl md:text-5xl lg:text-6xl
  font-bold
  tracking-tight
  leading-tight
  text-neutral-900 dark:text-neutral-50
">
  Título
</h1>

<p className="
  text-base md:text-lg
  font-normal
  leading-relaxed
  text-neutral-600 dark:text-neutral-400
">
  Corpo de texto
</p>
```

---

## 🎓 Exemplo Completo

```tsx
export function TypographyExample() {
  return (
    <div className="space-y-8">
      {/* Display */}
      <h1 className="
        text-4xl md:text-5xl lg:text-6xl
        font-bold
        tracking-tight
        leading-tight
        text-neutral-900 dark:text-neutral-50
      ">
        Sistema de Tipografia Premium
      </h1>

      {/* Heading 2 */}
      <h2 className="
        text-2xl md:text-3xl
        font-bold
        tracking-tight
        text-neutral-900 dark:text-neutral-50
      ">
        Hierarquia Clara
      </h2>

      {/* Heading 3 */}
      <h3 className="
        text-xl md:text-2xl
        font-semibold
        tracking-tight
        text-neutral-700 dark:text-neutral-300
      ">
        Subtítulo com Semibold
      </h3>

      {/* Body */}
      <p className="
        text-base md:text-lg
        font-normal
        leading-relaxed
        text-neutral-600 dark:text-neutral-400
      ">
        Este é um exemplo de texto de corpo com espaçamento relaxado
        para melhor legibilidade. Note como o leading generoso facilita
        a leitura prolongada.
      </p>

      {/* Caption */}
      <p className="
        text-sm
        font-normal
        text-neutral-500 dark:text-neutral-500
      ">
        Legenda ou metadados em tamanho menor
      </p>

      {/* Helper */}
      <p className="
        text-xs
        font-normal
        text-neutral-400 dark:text-neutral-600
      ">
        Texto auxiliar ou helper text
      </p>
    </div>
  );
}
```

---

**Referência**: [principles.md](./principles.md) | [colors.md](./colors.md)
