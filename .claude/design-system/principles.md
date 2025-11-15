# Princípios de Design Premium v2.0.0

> Sistema de Design Automatizado - Filosofia "Premium by Design"

Este documento centraliza os princípios fundamentais de UI/UX que são aplicados automaticamente em TODOS os componentes gerados pelo workflow de design.

---

## 🎯 Filosofia Central

**"Premium by Design, Refined by Choice"**

1. **Premium desde o início**: Todos os componentes nascem com design de alta qualidade
2. **Consistência Total**: Mesmos princípios aplicados em todo o sistema
3. **Baseado em Tokens**: 100% dos valores vêm de `src/theme/config.ts`
4. **Dark Mode Nativo**: Suporte completo desde o dia zero
5. **Responsivo por Padrão**: Mobile-first em tudo

---

## 📚 Princípios Detalhados

Este sistema é composto por 5 pilares fundamentais:

### 1. [Profundidade Visual](./shadows.md)
- **Two-Layer Shadows**: Sombras compostas (inner + outer) para profundidade realista
- **Color Layering**: 3-4 shades para criar hierarquia visual
- **Gradientes Sutis**: Para elementos interativos premium

### 2. [Sistema de Cores](./colors.md)
- **Regra 60-30-10**: Neutral (60%), Secondary (30%), Primary (10%)
- **Color Scales**: 8-10 shades por cor
- **Cores Semânticas**: Success, Warning, Error, Info
- **Dark Mode**: Variantes automáticas para todos os elementos

### 3. [Responsividade](./responsive.md)
- **Mobile-First**: Sempre começar com mobile
- **Layout Inteligente**: Que "respira" ao invés de "quebrar"
- **Espaçamentos Premium**: 24px base ao invés de 16px
- **Breakpoints Consistentes**: sm, md, lg, xl

### 4. [Tipografia](./typography.md)
- **Hierarquia Clara**: 5 níveis (Display, Heading, Body, Caption, Helper)
- **Tracking e Leading**: Otimizado para legibilidade
- **Font Weights**: Uso estratégico (400, 500, 600, 700)
- **Responsive Type**: Escalas fluidas em diferentes telas

### 5. [Micro-interações](./transitions.md)
- **Transições Suaves**: 150ms (fast), 200ms (base), 300ms (slow)
- **Hover Effects**: Scale, shadow, color com feedback visual
- **Loading States**: Elegant skeleton loaders
- **Focus States**: Acessibilidade com estilo

---

## 🔧 Aplicação Prática

### Quando Cada Princípio é Aplicado

**`/design:init`**:
- Cria `src/theme/config.ts` com TODOS os tokens necessários
- Configura `globals.css` com variáveis CSS
- Gera `design.md` documentando o sistema

**`/design:feature`**:
- Aplica AUTOMATICAMENTE os 5 princípios em todos os componentes
- Usa templates premium de `.claude/templates/`
- Gera código com two-layer shadows, color layering, etc.

**`/design:refine`**:
- Refina visualmente (80% do foco)
- Ajusta espaçamentos, shadows, cores, transições
- Opcionalmente busca componentes MCP (20%)

**`/design:integrate`**:
- Aplica mesmos princípios no Sidebar e HomePage
- Layout global com profundidade visual
- Navegação com micro-interações

---

## 📖 Guia de Consulta Rápida

### Para Aplicar Shadows Premium
```tsx
// Ver detalhes em shadows.md
<Card className="shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md hover:shadow-lg transition-shadow duration-300">
```

### Para Aplicar Color Layering
```tsx
// Ver detalhes em colors.md
<div className="bg-neutral-50 dark:bg-neutral-950"> {/* Page - Shade 1 */}
  <Card className="bg-white dark:bg-neutral-900"> {/* Card - Shade 2 */}
    <Button className="bg-neutral-100 dark:bg-neutral-800"> {/* Interactive - Shade 3 */}
```

### Para Espaçamentos Premium
```tsx
// Ver detalhes em responsive.md
<div className="space-y-6 p-6 md:p-8"> {/* 24px → 32px */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Para Tipografia Hierárquica
```tsx
// Ver detalhes em typography.md
<h1 className="text-4xl font-bold tracking-tight leading-tight">
<p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
```

### Para Transições Suaves
```tsx
// Ver detalhes em transitions.md
<Button className="transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
```

---

## ✅ Checklist de Qualidade

Ao criar ou revisar componentes, garanta que:

- [ ] **Shadows**: Usa two-layer shadows (inner + outer)
- [ ] **Colors**: Segue regra 60-30-10 e color layering
- [ ] **Spacing**: Usa 24px (gap-6) como base, não 16px
- [ ] **Typography**: Hierarquia clara (5 níveis)
- [ ] **Responsive**: Mobile-first com breakpoints
- [ ] **Transitions**: Todas as interações têm feedback visual (200-300ms)
- [ ] **Dark Mode**: Variantes dark: para TODOS os elementos
- [ ] **Tokens**: 100% dos valores vêm de theme.colors/typography/spacing
- [ ] **Acessibilidade**: Focus states visíveis, contraste adequado (WCAG AA)

---

## 🚫 Anti-Patterns (O que NÃO fazer)

❌ **Shadows simples**:
```tsx
<Card className="shadow-md"> {/* Apenas outer shadow */}
```

✅ **Two-layer shadows**:
```tsx
<Card className="shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md">
```

---

❌ **Espaçamentos genéricos**:
```tsx
<div className="space-y-4 gap-4 p-4"> {/* 16px - muito apertado */}
```

✅ **Espaçamentos premium**:
```tsx
<div className="space-y-6 gap-6 p-6 md:p-8"> {/* 24px → 32px - respiro visual */}
```

---

❌ **Tipografia flat**:
```tsx
<h1 className="text-2xl font-semibold"> {/* Sem hierarquia */}
```

✅ **Tipografia hierárquica**:
```tsx
<h1 className="text-4xl font-bold tracking-tight leading-tight"> {/* Hierarquia clara */}
```

---

❌ **Cores flat (sem layering)**:
```tsx
<div className="bg-white"> {/* Tudo no mesmo nível */}
  <Card className="bg-white">
```

✅ **Color layering (profundidade)**:
```tsx
<div className="bg-neutral-50 dark:bg-neutral-950"> {/* Shade 1 */}
  <Card className="bg-white dark:bg-neutral-900"> {/* Shade 2 */}
```

---

❌ **Transições ausentes**:
```tsx
<Button className="hover:bg-primary-dark"> {/* Mudança abrupta */}
```

✅ **Transições suaves**:
```tsx
<Button className="transition-all duration-200 hover:bg-primary-dark hover:scale-[1.02]">
```

---

## 🎓 Aprendizado Progressivo

**Iniciante**: Comece aplicando os princípios básicos
- Use classes pré-definidas dos templates
- Siga os exemplos de código

**Intermediário**: Customize com conhecimento
- Ajuste valores mantendo proporções
- Combine princípios de forma criativa

**Avançado**: Estenda o sistema
- Adicione novos tokens em `theme/config.ts`
- Crie variantes personalizadas

---

## 📞 Referências

- **Documentação Completa**: Veja os 5 arquivos individuais nesta pasta
- **Templates Práticos**: `.claude/templates/` com exemplos completos
- **Theme Config**: `src/theme/config.ts` - Fonte da verdade para todos os tokens

---

**Última atualização**: v2.0.0 - Refatoração Completa
**Filosofia**: Premium by Design, Refined by Choice
