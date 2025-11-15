# Card Pattern Premium

## Padrão Completo

```tsx
<Card className="
  bg-white dark:bg-neutral-900
  border border-neutral-200 dark:border-neutral-800
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
  hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
  transition-shadow duration-300
  rounded-lg
  p-6
">
  <CardHeader className="pb-4">
    <CardTitle className="
      text-xl md:text-2xl
      font-semibold tracking-tight
      text-neutral-900 dark:text-neutral-50
    ">
      Título do Card
    </CardTitle>
    <CardDescription className="
      text-sm
      text-neutral-500 dark:text-neutral-500
    ">
      Descrição breve
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-4">
    <p className="
      text-base leading-relaxed
      text-neutral-600 dark:text-neutral-400
    ">
      Conteúdo do card
    </p>
  </CardContent>
</Card>
```

## Variante: Card Clicável

```tsx
<Card className="
  group
  cursor-pointer
  bg-white dark:bg-neutral-900
  border border-neutral-200 dark:border-neutral-800
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
  hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
  hover:scale-[1.01]
  hover:-translate-y-1
  transition-all duration-300
  rounded-lg
  p-6
"
  onClick={onClick}
>
  {/* Icon com group-hover */}
  <div className="
    p-2 rounded-lg mb-4
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

  <CardTitle className="
    text-xl font-semibold
    transition-colors duration-200
    group-hover:text-primary
  ">
    Título
  </CardTitle>
</Card>
```

## Princípios Aplicados

- ✅ **Two-Layer Shadow**: `shadow-[inset...] shadow-md`
- ✅ **Color Layering**: white/neutral-900 (Shade 2)
- ✅ **Espaçamento Premium**: p-6 (24px), space-y-4
- ✅ **Tipografia**: Hierarquia clara (xl/semibold → sm/normal)
- ✅ **Transições**: 300ms para shadows, 200ms para colors
- ✅ **Dark Mode**: Todas as variantes dark:
- ✅ **Group Hover**: Elementos internos reagem juntos
