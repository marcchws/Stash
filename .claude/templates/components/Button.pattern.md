# Button Pattern Premium

## Padrão: Primary Button (CTA)

```tsx
<Button className="
  bg-gradient-to-b from-primary-light to-primary-dark
  shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-sm
  hover:shadow-md
  transition-all duration-200
  hover:scale-[1.02]
  active:scale-[0.98]
  text-white font-semibold
  px-6 py-3
  rounded-md
">
  Salvar
</Button>
```

## Padrão: Secondary Button

```tsx
<Button
  variant="outline"
  className="
    bg-white dark:bg-neutral-900
    border-neutral-300 dark:border-neutral-700
    text-neutral-700 dark:text-neutral-300
    shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-sm
    hover:bg-neutral-100 dark:hover:bg-neutral-800
    hover:shadow-md
    transition-all duration-200
    hover:scale-[1.02]
    active:scale-[0.98]
    font-semibold
    px-6 py-3
    rounded-md
  "
>
  Cancelar
</Button>
```

## Padrão: Ghost Button

```tsx
<Button
  variant="ghost"
  className="
    text-neutral-700 dark:text-neutral-300
    hover:bg-neutral-100 dark:hover:bg-neutral-800
    transition-colors duration-150
    font-medium
    px-4 py-2
    rounded-md
  "
>
  Voltar
</Button>
```

## Padrão: Icon Button

```tsx
<Button
  size="icon"
  className="
    bg-neutral-100 dark:bg-neutral-800
    hover:bg-neutral-200 dark:hover:bg-neutral-700
    transition-all duration-200
    hover:scale-110
    active:scale-95
    rounded-lg
  "
>
  <Icon className="w-5 h-5" />
</Button>
```

## Estados Especiais

### Disabled

```tsx
<Button
  disabled
  className="
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:scale-100
    disabled:active:scale-100
  "
>
  Desabilitado
</Button>
```

### Loading

```tsx
<Button disabled className="relative">
  <span className="opacity-0">Salvando...</span>
  <div className="
    absolute inset-0
    flex items-center justify-center
  ">
    <div className="
      animate-spin rounded-full
      h-5 w-5 border-2
      border-white border-t-transparent
    " />
  </div>
</Button>
```

## Princípios Aplicados

- ✅ **Gradient + Inner Shadow**: Efeito premium em primary
- ✅ **Scale on Hover/Active**: 1.02 → 0.98
- ✅ **Transições**: 200ms (base)
- ✅ **Tipografia**: font-semibold para primary, font-medium para secondary
- ✅ **Focus States**: ring-2 ring-primary
- ✅ **Disabled**: opacity + cursor-not-allowed
