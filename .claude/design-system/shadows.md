# Sistema de Profundidade Visual

> Two-Layer Shadows + Color Layering para criar profundidade realista

---

## 🎯 Objetivo

Criar **profundidade visual** através de duas técnicas complementares:
1. **Two-Layer Shadows**: Sombras compostas (inner + outer) que simulam luz realista
2. **Color Layering**: Uso de 3-4 shades de cor para criar hierarquia de planos

---

## 1️⃣ Two-Layer Shadows

### Conceito

Sombras realistas são compostas por **duas camadas**:
- **Inner Shadow (Top)**: Luz refletida na borda superior (clara)
- **Outer Shadow (Bottom)**: Sombra projetada embaixo (escura)

Isso simula como objetos físicos se comportam sob iluminação de cima.

---

### Níveis de Shadow

#### **Small Shadow (Subtle)**

Use para: Elementos sutis, nav items, tabs, badges

```tsx
// Tailwind CSS
className="shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] shadow-sm"

// Equivalente CSS
box-shadow:
  inset 0 1px 0 rgba(255,255,255,0.1),  /* Top highlight */
  0 2px 4px rgba(0,0,0,0.1);             /* Bottom shadow */
```

**Quando usar**:
- Profile cards pequenos
- Navigation items
- Badges e labels
- Elementos que precisam de definição sutil

---

#### **Medium Shadow (Standard)** ⭐ PADRÃO

Use para: Cards, dropdowns, modals, maioria dos componentes

```tsx
// Tailwind CSS
className="shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md"

// Equivalente CSS
box-shadow:
  inset 0 1px 0 rgba(255,255,255,0.15), /* Top highlight */
  0 8px 12px rgba(0,0,0,0.15);          /* Bottom shadow */
```

**Quando usar**:
- Cards de conteúdo
- Dropdowns e menus
- Modals e dialogs
- Componentes padrão do sistema

**Tokens de referência**:
```typescript
// src/theme/config.ts
shadows: {
  md: {
    outer: '0 8px 12px rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    combined: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 12px rgba(0,0,0,0.15)'
  }
}
```

---

#### **Large Shadow (Prominent)**

Use para: Hover states, focused elements, modals importantes

```tsx
// Tailwind CSS
className="shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] shadow-lg"

// Equivalente CSS
box-shadow:
  inset 0 2px 0 rgba(255,255,255,0.2), /* Top highlight */
  0 16px 24px rgba(0,0,0,0.2);         /* Bottom shadow */
```

**Quando usar**:
- Hover states de cards
- Focused elements (formulários)
- Modals críticos
- Call-to-actions importantes

---

### Aplicação Prática

#### Exemplo 1: Card Básico

```tsx
<Card className="
  bg-white dark:bg-neutral-900
  border border-neutral-200 dark:border-neutral-800
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
  hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
  transition-shadow duration-300
  rounded-lg
">
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo com profundidade visual
  </CardContent>
</Card>
```

#### Exemplo 2: Button com Gradiente + Shadow

```tsx
<Button className="
  bg-gradient-to-b from-primary-light to-primary-dark
  shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-sm
  hover:shadow-md
  transition-all duration-200
  text-white font-semibold
  px-6 py-3 rounded-md
">
  Botão Premium
</Button>
```

---

## 2️⃣ Color Layering

### Conceito

Usar **3-4 shades** de uma cor para criar camadas visuais que simulam profundidade.

**Analogia**: Imagine que você está olhando camadas de papel sobrepostas. Quanto mais claro, mais "perto" do usuário.

---

### Sistema de Shades

#### Criação de Shades

Para qualquer cor base (ex: `neutral-200`), crie 4 shades:

```
Shade 1 (Page Background - mais escuro):  base - 0.1 lightness
Shade 2 (Containers - médio):             base (seu ponto de partida)
Shade 3 (Interactive - claro):            base + 0.1 lightness
Shade 4 (Hover/Selected - mais claro):    base + 0.2 lightness
```

#### Aplicação no Projeto (usando Zinc)

```tsx
// Shade 1: Page Background (mais escuro)
className="bg-neutral-50 dark:bg-neutral-950"

// Shade 2: Card/Container backgrounds (médio)
className="bg-white dark:bg-neutral-900"

// Shade 3: Interactive elements (claro)
className="bg-neutral-100 dark:bg-neutral-800"

// Shade 4: Hover/selected states (mais claro)
className="bg-neutral-50 dark:bg-neutral-700"
```

---

### Hierarquia de Aplicação

#### 1. **Page Background (Shade 1)**

O plano mais distante - cor mais escura

```tsx
<div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
  {/* Todo o conteúdo aqui */}
</div>
```

#### 2. **Containers/Cards (Shade 2)**

Elementos que "flutuam" sobre o background

```tsx
<Card className="bg-white dark:bg-neutral-900">
  {/* Conteúdo */}
</Card>
```

#### 3. **Interactive Elements (Shade 3)**

Botões, inputs, tabs - elementos clicáveis

```tsx
<Button className="bg-neutral-100 dark:bg-neutral-800">
  Clique aqui
</Button>

<Input className="bg-neutral-100 dark:bg-neutral-800" />
```

#### 4. **Hover/Selected (Shade 4)**

Estados ativos - cor mais clara = mais próxima do usuário

```tsx
<TabsTrigger className="
  bg-neutral-100 dark:bg-neutral-800
  data-[state=active]:bg-neutral-50 data-[state=active]:dark:bg-neutral-700
">
  Tab Ativa
</TabsTrigger>
```

---

### Aplicação por Tipo de Componente

#### **Tabs**

```tsx
<Tabs className="bg-white dark:bg-neutral-900"> {/* Shade 2 */}
  <TabsList className="bg-neutral-100 dark:bg-neutral-800"> {/* Shade 3 */}
    <TabsTrigger className="
      data-[state=active]:bg-neutral-50
      data-[state=active]:dark:bg-neutral-700
    "> {/* Shade 4 quando ativo */}
      Tab 1
    </TabsTrigger>
  </TabsList>
</Tabs>
```

#### **Cards com Destaque**

```tsx
<div className="bg-neutral-50 dark:bg-neutral-950 p-8"> {/* Shade 1 */}
  <Card className="bg-white dark:bg-neutral-900"> {/* Shade 2 */}
    <CardHeader className="bg-neutral-100 dark:bg-neutral-800"> {/* Shade 3 - destaque */}
      <CardTitle>Título Destacado</CardTitle>
    </CardHeader>
    <CardContent>
      Conteúdo regular
    </CardContent>
  </Card>
</div>
```

#### **Dropdown/Select**

```tsx
<Select>
  <SelectTrigger className="
    bg-neutral-100 dark:bg-neutral-800
    shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-sm
  "> {/* Shade 3 + shadow */}
    <SelectValue />
  </SelectTrigger>
  <SelectContent className="
    bg-white dark:bg-neutral-900
    shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-lg
  "> {/* Shade 2 + large shadow */}
    <SelectItem>Opção 1</SelectItem>
  </SelectContent>
</Select>
```

#### **Tables (De-emphasis)**

Tabelas devem receder visualmente (Shade 1 - mais escuro):

```tsx
<Table className="bg-neutral-50 dark:bg-neutral-950"> {/* Mais escuro = mais distante */}
  <TableRow>
    <TableCell>Dados</TableCell>
  </TableRow>
</Table>
```

---

## 3️⃣ Gradientes Premium

### Quando Usar

Gradientes adicionam **sofisticação visual** em:
- Dropdowns importantes
- Buttons principais (CTAs)
- Headers e hero sections

### Implementação

```tsx
// Gradiente linear (top → bottom)
<Button className="
  bg-gradient-to-b from-primary-light to-primary-dark
  shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-sm
  text-white
">
  CTA Principal
</Button>

// Com tokens do tema
style={{
  background: `linear-gradient(to bottom, ${theme.colors.primary.light}, ${theme.colors.primary.dark})`
}}
```

---

## 4️⃣ Controle de Ênfase

### Regra de Ouro

**Quanto mais CLARO, mais PRÓXIMO do usuário (maior ênfase)**
**Quanto mais ESCURO, mais DISTANTE do usuário (menor ênfase)**

### Para Enfatizar

Use shades mais claros (3 ou 4):

```tsx
<div className="bg-neutral-50 dark:bg-neutral-700"> {/* Shade 4 - destaca */}
  Elemento importante
</div>
```

### Para De-enfatizar

Use shades mais escuros (1 ou 2):

```tsx
<div className="bg-neutral-50 dark:bg-neutral-950"> {/* Shade 1 - recua */}
  Elemento secundário
</div>
```

---

## 5️⃣ Dark Mode

### Inversão de Lógica

No dark mode, a lógica se inverte:
- **Light mode**: Claro = ênfase
- **Dark mode**: Ainda mais claro = ênfase

```tsx
// Light mode: bg-white (claro) enfatiza
// Dark mode: bg-neutral-900 (ainda mais claro que neutral-950) enfatiza
<Card className="bg-white dark:bg-neutral-900">
```

### Regra Prática

Sempre use `dark:` variants que mantêm a hierarquia:

```
Light Mode          →  Dark Mode
bg-neutral-50       →  dark:bg-neutral-950  (Page)
bg-white            →  dark:bg-neutral-900  (Card)
bg-neutral-100      →  dark:bg-neutral-800  (Interactive)
bg-neutral-50       →  dark:bg-neutral-700  (Hover)
```

---

## 📋 Checklist de Implementação

Ao criar componentes com profundidade:

- [ ] **Two-Layer Shadows**: Inner + Outer aplicados
- [ ] **Color Layering**: Pelo menos 2 shades diferentes usados
- [ ] **Hierarquia Clara**: Page → Card → Interactive → Hover
- [ ] **Dark Mode**: Variantes dark: mantêm hierarquia
- [ ] **Transições**: Shadow changes têm duration-300
- [ ] **Tokens**: Usa theme.shadows quando possível
- [ ] **Borders Mínimos**: Apenas em Shade 1 e 2 se necessário

---

## 🚫 Erros Comuns

❌ **Usar apenas outer shadow**:
```tsx
<Card className="shadow-md"> {/* Sem inner highlight */}
```

❌ **Todas as cores no mesmo shade**:
```tsx
<div className="bg-white">
  <Card className="bg-white"> {/* Sem layering */}
```

❌ **Borders desnecessários com Shade 3/4**:
```tsx
<Button className="bg-neutral-50 border border-neutral-300"> {/* Border redundante */}
```

✅ **Correto**:
```tsx
<Card className="
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
  bg-white dark:bg-neutral-900
  border border-neutral-200 dark:border-neutral-800
">
```

---

## 🎓 Exemplo Completo

```tsx
export function PremiumCard({ title, content }: Props) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-8"> {/* Shade 1: Page */}
      <Card className="
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
        hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
        transition-shadow duration-300
        rounded-lg
      "> {/* Shade 2: Card */}
        <CardHeader className="border-b border-neutral-200 dark:border-neutral-800 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800"> {/* Shade 3: Icon badge */}
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold tracking-tight">
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {content}
          </p>
          <Button className="
            mt-6 w-full
            bg-gradient-to-b from-primary-light to-primary-dark
            shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-sm
            hover:shadow-md
            transition-all duration-200
            hover:scale-[1.02]
            text-white font-semibold
          ">
            Ação Principal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

**Referência**: [principles.md](./principles.md) | [colors.md](./colors.md)
