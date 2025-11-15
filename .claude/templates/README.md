# Templates Premium v2.0.0

> Padrões reutilizáveis para todos os comandos do workflow

Este diretório contém os **padrões premium** que são aplicados automaticamente pelos comandos `/design:feature`, `/design:refine` e `/design:integrate`.

---

## 📁 Estrutura

```
templates/
├── components/
│   ├── Card.pattern.md       - Padrão de Card com two-layer shadow
│   ├── Button.pattern.md     - Padrão de Button com gradient
│   └── Input.pattern.md      - Padrão de Input com estados premium
└── pages/
    ├── ListView.pattern.md   - Padrão de ListView com color layering
    ├── FormView.pattern.md   - Padrão de FormView com hierarquia
    └── DetailView.pattern.md - Padrão de DetailView com profundidade
```

---

## 🎯 Como os Comandos Usam os Templates

### **`/design:feature`**

Ao gerar componentes, o comando:
1. Lê os padrões em `.claude/templates/`
2. Aplica os princípios de `.claude/design-system/`
3. Gera código TSX com todos os padrões premium aplicados

### **`/design:refine`**

Ao refinar componentes, o comando:
1. Compara código existente com os padrões
2. Identifica oportunidades de melhoria
3. Aplica refinamentos automaticamente

### **`/design:integrate`**

Ao gerar Sidebar e HomePage, o comando:
1. Usa os mesmos padrões de Card/Button
2. Mantém consistência visual em todo o sistema

---

## ✅ Princípios Aplicados em TODOS os Templates

Todos os templates seguem os 5 pilares do design-system:

1. **[Two-Layer Shadows](../design-system/shadows.md)**: Inner + Outer
2. **[Color Layering](../design-system/colors.md)**: 3-4 shades de profundidade
3. **[Espaçamentos Premium](../design-system/responsive.md)**: Base 24px (gap-6, p-6)
4. **[Tipografia Hierárquica](../design-system/typography.md)**: 5 níveis claros
5. **[Micro-interações](../design-system/transitions.md)**: Feedback visual 200-300ms

---

## 📚 Referência Rápida

### Classes Premium Comuns

```tsx
// Card padrão
className="
  bg-white dark:bg-neutral-900
  border border-neutral-200 dark:border-neutral-800
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
  hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
  transition-shadow duration-300
  rounded-lg
  p-6
"

// Button padrão
className="
  bg-gradient-to-b from-primary-light to-primary-dark
  shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-sm
  hover:shadow-md
  transition-all duration-200
  hover:scale-[1.02] active:scale-[0.98]
  text-white font-semibold
  px-6 py-3 rounded-md
"

// Input padrão
className="
  bg-neutral-100 dark:bg-neutral-800
  border-neutral-300 dark:border-neutral-700
  text-neutral-900 dark:text-neutral-50
  transition-all duration-200
  focus:border-primary focus:ring-2 focus:ring-primary/20
"

// Page layout padrão
className="
  min-h-screen
  bg-neutral-50 dark:bg-neutral-950
  p-6 md:p-8
"

// Container padrão
className="
  container mx-auto
  max-w-7xl
  space-y-8
"

// Grid padrão
className="
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  gap-6
"

// Título padrão
className="
  text-4xl md:text-5xl
  font-bold tracking-tight leading-tight
  text-neutral-900 dark:text-neutral-50
"
```

---

## 🔄 Versionamento

**v2.0.0**: Templates iniciais com todos os 5 princípios integrados

Quando os templates forem atualizados, a versão será incrementada e todos os comandos usarão automaticamente os novos padrões.

---

**Última atualização**: v2.0.0 - Sistema completo
