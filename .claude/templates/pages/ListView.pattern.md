# ListView Pattern Premium

## Padrão Completo de Página de Lista

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';

export default function EntityListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]); // MOCK - substituir por API

  return (
    <div className="
      min-h-screen
      bg-neutral-50 dark:bg-neutral-950
      p-6 md:p-8
    ">
      <div className="
        container mx-auto
        max-w-7xl
        space-y-8
      ">
        {/* Header */}
        <header className="
          flex flex-col sm:flex-row
          items-start sm:items-center
          justify-between
          gap-4
        ">
          <div className="space-y-2">
            <h1 className="
              text-4xl md:text-5xl
              font-bold tracking-tight leading-tight
              text-neutral-900 dark:text-neutral-50
            ">
              Entidades
            </h1>
            <p className="
              text-lg
              text-neutral-600 dark:text-neutral-400
            ">
              Gerencie todos os registros do sistema
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/entities/new">
              <Button className="
                bg-gradient-to-b from-primary-light to-primary-dark
                shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-sm
                hover:shadow-md
                transition-all duration-200
                hover:scale-[1.02]
                active:scale-[0.98]
                text-white font-semibold
                px-6 py-3
              ">
                <Plus className="w-4 h-4 mr-2" />
                Novo
              </Button>
            </Link>
          </div>
        </header>

        {/* Filters */}
        <div className="
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-sm
          rounded-lg
          p-6
        ">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="
                absolute left-3 top-1/2 -translate-y-1/2
                w-5 h-5
                text-neutral-400
              " />
              <Input
                placeholder="Buscar por nome, documento..."
                className="
                  pl-10
                  bg-neutral-100 dark:bg-neutral-800
                  border-neutral-300 dark:border-neutral-700
                  transition-all duration-200
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="
                transition-all duration-200
                hover:scale-[1.02]
              "
            >
              Filtros
            </Button>
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="
          grid
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-6
        ">
          {items.map((item) => (
            <Link key={item.id} href={`/entities/${item.id}`}>
              <Card className="
                group
                cursor-pointer
                h-full
                bg-white dark:bg-neutral-900
                border border-neutral-200 dark:border-neutral-800
                shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
                hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg
                hover:scale-[1.01]
                hover:-translate-y-1
                transition-all duration-300
                rounded-lg
                p-6
              ">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
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
                    <Badge className="
                      bg-neutral-100 dark:bg-neutral-800
                      text-neutral-700 dark:text-neutral-300
                    ">
                      Status
                    </Badge>
                  </div>

                  <CardTitle className="
                    text-xl
                    font-semibold tracking-tight
                    text-neutral-900 dark:text-neutral-50
                    transition-colors duration-200
                    group-hover:text-primary
                  ">
                    {item.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="
                    text-base leading-relaxed
                    text-neutral-600 dark:text-neutral-400
                  ">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="
            text-center py-16
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
            rounded-lg
          ">
            <div className="
              inline-flex items-center justify-center
              w-16 h-16 rounded-full
              bg-neutral-100 dark:bg-neutral-800
              mb-4
            ">
              <Icon className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="
              text-lg font-semibold
              text-neutral-900 dark:text-neutral-100
              mb-2
            ">
              Nenhum registro encontrado
            </h3>
            <p className="
              text-neutral-600 dark:text-neutral-400
              mb-6
            ">
              Comece criando seu primeiro registro
            </p>
            <Link href="/entities/new">
              <Button>Criar Novo</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
```

## Princípios Aplicados

- ✅ **Color Layering**: Page (neutral-50) → Cards (white)
- ✅ **Two-Layer Shadows**: Cards e filters com inner+outer
- ✅ **Espaçamentos Premium**: p-6 md:p-8, gap-6, space-y-8
- ✅ **Tipografia Hierárquica**: Display (4xl) → Heading (xl) → Body (base)
- ✅ **Grid Responsivo**: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
- ✅ **Group Hover**: Icon e título mudam juntos
- ✅ **Transições**: 300ms para cards, 200ms para elements
- ✅ **Empty State**: Elegante com ícone e CTA
- ✅ **Search**: Input com ícone interno e focus state

## Elementos Chave

1. **Page Background**: Shade 1 (neutral-50/950)
2. **Filters Card**: Shade 2 com shadow
3. **Item Cards**: Shade 2 com hover effect
4. **Typography**: Escala 4xl → xl → base
5. **Spacing**: 32px entre seções (space-y-8)
6. **Grid**: Responsivo com gap-6 (24px)
