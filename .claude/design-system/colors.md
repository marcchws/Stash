# Sistema de Cores

> Regra 60-30-10 + Color Scales + Cores Semânticas

---

## 🎯 Objetivo

Criar um sistema de cores **científico e funcional** que:
1. Mantém **consistência visual** em todo o sistema
2. Define **hierarquia clara** através de proporções
3. Fornece **flexibilidade** com 8-10 shades por cor
4. Suporta **dark mode** nativamente

---

## 1️⃣ Regra 60-30-10

### Conceito

A regra 60-30-10 define as **proporções** de uso de cores em uma interface:

```
60% - COR DOMINANTE (Neutral)
30% - COR SECUNDÁRIA (Supporting)
10% - COR DE DESTAQUE (Accent)
```

**Analogia**: Imagine um quarto:
- 60% = Paredes (neutras)
- 30% = Móveis (cores de suporte)
- 10% = Almofadas decorativas (destaques)

---

### Implementação

#### **60% - Neutral Colors (Dominante)**

Use para: Backgrounds, textos, bordas - a MAIORIA da interface

```tsx
// Backgrounds
className="bg-neutral-50 dark:bg-neutral-950"     // Page
className="bg-white dark:bg-neutral-900"          // Cards
className="bg-neutral-100 dark:bg-neutral-800"    // Panels

// Textos (hierarquia)
className="text-neutral-900 dark:text-neutral-50"    // Headings
className="text-neutral-700 dark:text-neutral-300"   // Subheadings
className="text-neutral-600 dark:text-neutral-400"   // Body
className="text-neutral-500 dark:text-neutral-500"   // Captions/helpers

// Bordas
className="border-neutral-200 dark:border-neutral-800"
```

**Tokens de referência**:
```typescript
// src/theme/config.ts
neutral: {
  50: '#fafafa',   // Lightest
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',  // Primary main
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
  950: '#09090b',  // Darkest (para dark mode)
}
```

---

#### **30% - Secondary Colors (Suporte)**

Use para: Elementos de suporte, backgrounds secundários, ícones não-primários

```tsx
// Backgrounds secundários
className="bg-secondary-light dark:bg-secondary-dark"

// Ícones secundários
className="text-secondary dark:text-secondary-light"

// Borders sutis
className="border-secondary-light dark:border-secondary-dark"
```

**Tokens de referência**:
```typescript
secondary: {
  main: '#a1a1aa',     // zinc-400
  light: '#d4d4d8',    // zinc-300
  dark: '#71717a',     // zinc-500
}
```

---

#### **10% - Primary Color (Destaque)** ⭐

Use para: CTAs, links, elementos de ação, destaques - APENAS 10% da tela!

```tsx
// CTAs principais
<Button className="bg-primary text-white">Salvar</Button>

// Links
<a className="text-primary hover:underline">Ver mais</a>

// Badges de destaque
<Badge className="bg-primary text-white">Novo</Badge>

// Progress bars
<Progress className="[&>div]:bg-primary" />
```

**Tokens de referência**:
```typescript
primary: {
  main: '#52525b',      // zinc-600
  light: '#71717a',     // zinc-500
  dark: '#3f3f46',      // zinc-700
}
```

**⚠️ IMPORTANTE**: Se mais de 10% da tela é primary, você está usando DEMAIS!

---

## 2️⃣ Color Scales (8-10 Shades)

### Por que Shades são Importantes?

Cada cor deve ter **8-10 variações** para:
- **Flexibilidade**: Escolher o tom certo para cada contexto
- **Hierarquia**: Criar níveis visuais
- **Estados**: Normal, hover, active, disabled
- **Dark Mode**: Inverter luminosidade mantendo contraste

---

### Estrutura de Shades

Para QUALQUER cor, defina shades de 50 (mais claro) até 950 (mais escuro):

```
50  - Quase branco (backgrounds muito sutis)
100 - Muito claro (hover states em light mode)
200 - Claro (borders sutis)
300 - Médio-claro
400 - Médio
500 - Base (cor "média" da família)
600 - Médio-escuro (boa para primaries)
700 - Escuro
800 - Muito escuro (backgrounds em dark mode)
900 - Quase preto (textos em dark mode)
950 - Mais escuro possível (backgrounds profundos em dark mode)
```

---

### Exemplo Prático: Primary Color

```typescript
// Se sua primary é Blue
primary: {
  50: '#eff6ff',    // blue-50
  100: '#dbeafe',   // blue-100
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',   // BASE
  600: '#2563eb',   // Main (mais comum)
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
}
```

**Como usar**:
```tsx
// Light mode: Tons médios-escuros (500-700)
<Button className="bg-primary-600 hover:bg-primary-700">

// Dark mode: Tons médios-claros (400-500)
<Button className="dark:bg-primary-500 dark:hover:bg-primary-400">

// Backgrounds sutis
<div className="bg-primary-50 dark:bg-primary-950">
```

---

## 3️⃣ Cores Semânticas

### Conceito

Cores que **comunicam significado** universalmente reconhecido:
- 🟢 **Verde**: Sucesso, confirmação, positivo
- 🟡 **Amarelo/Âmbar**: Atenção, aviso, cautela
- 🔵 **Azul**: Informação, neutro, confiável
- 🔴 **Vermelho**: Erro, destrutivo, crítico

---

### Implementação

```typescript
// src/theme/config.ts
semantic: {
  success: '#10b981',   // green-500
  warning: '#f59e0b',   // amber-500
  error: '#ef4444',     // red-500
  info: '#3b82f6',      // blue-500
}
```

**⚠️ Exceção**: Se sua primary color é VERMELHA, use **laranja** para erros (para diferenciar de CTAs).

---

### Aplicação Prática

#### **Success (Verde)**

```tsx
// Toast de sucesso
<Toast className="bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-100">
  <CheckCircle className="text-green-600 dark:text-green-400" />
  <span>Operação concluída com sucesso!</span>
</Toast>

// Badge de status
<Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
  Ativo
</Badge>

// Icon inline
<CheckCircle className="text-success" />
```

---

#### **Warning (Amarelo/Âmbar)**

```tsx
// Alert de atenção
<Alert className="bg-amber-100 border-amber-500 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
  <AlertTriangle className="text-amber-600 dark:text-amber-400" />
  <AlertDescription>Atenção: Verifique os dados antes de continuar</AlertDescription>
</Alert>

// Badge
<Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
  Pendente
</Badge>
```

---

#### **Error (Vermelho)**

```tsx
// Toast de erro
<Toast className="bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-100">
  <XCircle className="text-red-600 dark:text-red-400" />
  <span>Erro ao processar solicitação</span>
</Toast>

// Input com erro
<div>
  <Input className="border-red-500 focus:ring-red-500" />
  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
    Campo obrigatório
  </p>
</div>

// Button destrutivo
<Button className="bg-red-600 hover:bg-red-700 text-white">
  Excluir
</Button>
```

---

#### **Info (Azul)**

```tsx
// Alert informativo
<Alert className="bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
  <Info className="text-blue-600 dark:text-blue-400" />
  <AlertDescription>Dica: Você pode usar atalhos de teclado</AlertDescription>
</Alert>

// Badge informativo
<Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
  Novo
</Badge>
```

---

## 4️⃣ Hierarquia de Texto

### 5 Níveis de Texto

Defina **hierarquia clara** usando shades de neutral:

```tsx
// 1. Headings (Títulos principais)
<h1 className="text-neutral-900 dark:text-neutral-50 font-bold">
  Título Principal
</h1>

// 2. Subheadings (Subtítulos)
<h2 className="text-neutral-700 dark:text-neutral-300 font-semibold">
  Subtítulo
</h2>

// 3. Body (Corpo de texto)
<p className="text-neutral-600 dark:text-neutral-400 font-normal">
  Texto regular do parágrafo
</p>

// 4. Captions (Legendas)
<span className="text-neutral-500 dark:text-neutral-500 text-sm">
  Texto auxiliar ou legenda
</span>

// 5. Helper/Disabled (Textos desabilitados)
<span className="text-neutral-400 dark:text-neutral-600 text-xs">
  Texto desabilitado ou helper
</span>
```

**Regra visual**: Quanto mais escuro (light mode) ou claro (dark mode), mais importante.

---

## 5️⃣ Dark Mode

### Inversão Inteligente

No dark mode, **inverta a luminosidade** mas mantenha o **contraste relativo**:

```tsx
// Light Mode               Dark Mode
bg-white                 → dark:bg-neutral-900
bg-neutral-100           → dark:bg-neutral-800
bg-neutral-200           → dark:bg-neutral-700

text-neutral-900         → dark:text-neutral-50
text-neutral-600         → dark:text-neutral-400
text-neutral-400         → dark:text-neutral-600

border-neutral-200       → dark:border-neutral-800
```

### Regra de Ouro

**Light Mode**: Escuro = Importante
**Dark Mode**: Claro = Importante

Sempre mantenha a hierarquia visual:

```tsx
<div className="
  bg-neutral-50 dark:bg-neutral-950 {/* Page - menos importante */}
">
  <Card className="
    bg-white dark:bg-neutral-900 {/* Card - mais importante */}
  ">
    <h1 className="
      text-neutral-900 dark:text-neutral-50 {/* Heading - MAIS importante */}
    ">Título</h1>
    <p className="
      text-neutral-600 dark:text-neutral-400 {/* Body - menos importante */}
    ">Texto</p>
  </Card>
</div>
```

---

## 6️⃣ Aplicações por Contexto

### **Formulários**

```tsx
<form className="space-y-6">
  {/* Label */}
  <div>
    <Label className="text-neutral-700 dark:text-neutral-300 font-medium">
      Nome Completo
    </Label>

    {/* Input */}
    <Input className="
      mt-1
      bg-neutral-100 dark:bg-neutral-800
      border-neutral-300 dark:border-neutral-700
      text-neutral-900 dark:text-neutral-50
      placeholder:text-neutral-500 dark:placeholder:text-neutral-500
      focus:ring-primary focus:border-primary
    " />

    {/* Helper text */}
    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">
      Digite seu nome completo conforme documento
    </p>
  </div>
</form>
```

---

### **Tabelas**

```tsx
<Table className="bg-neutral-50 dark:bg-neutral-950">
  <TableHeader className="bg-neutral-100 dark:bg-neutral-900">
    <TableRow>
      <TableHead className="text-neutral-700 dark:text-neutral-300 font-semibold">
        Coluna
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-800">
      <TableCell className="text-neutral-600 dark:text-neutral-400">
        Dados
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

### **Navegação (Sidebar)**

```tsx
<aside className="bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800">
  <nav>
    {items.map(item => (
      <Link
        key={item.path}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
          isActive
            ? "bg-primary text-white" // 10% - destaque
            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800" // 60% - neutral
        )}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{item.name}</span>
      </Link>
    ))}
  </nav>
</aside>
```

---

## 📋 Checklist de Qualidade

Ao aplicar cores:

- [ ] **60-30-10**: Neutral domina (60%), Primary é apenas destaque (10%)
- [ ] **Shades Completos**: Cada cor tem 8-10 shades (50-950)
- [ ] **Hierarquia de Texto**: 5 níveis claramente definidos
- [ ] **Semânticas**: Verde (success), Amarelo (warning), Vermelho (error), Azul (info)
- [ ] **Dark Mode**: Todas as cores têm variantes dark:
- [ ] **Contraste**: Mínimo WCAG AA (4.5:1 para texto normal)
- [ ] **Tokens**: 100% das cores vêm de theme.colors

---

## 🚫 Erros Comuns

❌ **Usar primary demais (>10%)**:
```tsx
<div className="bg-primary"> {/* Primary deve ser DESTAQUE, não dominante */}
  <Button className="bg-primary-dark">
```

❌ **Texto sem hierarquia**:
```tsx
<h1 className="text-neutral-600"> {/* Heading deve ser neutral-900/50 */}
<p className="text-neutral-600">  {/* Body também neutral-600 - sem diferença */}
```

❌ **Ignorar dark mode**:
```tsx
<div className="text-neutral-900"> {/* Sem dark:text-neutral-50 */}
```

✅ **Correto**:
```tsx
// 60% Neutral
<div className="bg-neutral-50 dark:bg-neutral-950">

  // 30% Secondary (se necessário)
  <aside className="bg-secondary-light dark:bg-secondary-dark">

  // 10% Primary (destaque)
  <Button className="bg-primary text-white">CTA</Button>
</div>
```

---

## 🎓 Exemplo Completo

```tsx
export function ColorSystemExample() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-8"> {/* 60% Neutral */}

      <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">

        {/* Heading - Hierarquia 1 */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            Sistema de Cores Premium
          </CardTitle>
          <CardDescription className="text-neutral-600 dark:text-neutral-400"> {/* Hierarquia 3 */}
            Demonstração da regra 60-30-10
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Body text - Hierarquia 3 */}
          <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            Este card demonstra o uso correto do sistema de cores.
          </p>

          {/* Semantic colors */}
          <div className="grid grid-cols-2 gap-3">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              Sucesso
            </Badge>
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
              Atenção
            </Badge>
          </div>

          {/* 10% Primary - CTA */}
          <Button className="w-full bg-primary text-white hover:bg-primary-dark transition-colors">
            Ação Principal
          </Button>

          {/* Helper text - Hierarquia 5 */}
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            Texto auxiliar em tom mais suave
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

**Referência**: [principles.md](./principles.md) | [shadows.md](./shadows.md)
