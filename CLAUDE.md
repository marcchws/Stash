# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Stash** is a minimalist personal finance tracking application focused on frictionless expense recording. The goal is to enable users to track their spending quickly without friction and gain financial awareness through simple visual summaries.

Core concept: "Guarde o registro, entenda seu dinheiro" (Store the record, understand your money) - An app to "stash" your expenses quickly and painlessly.

**Problem being solved**: Users lose control of finances because finance apps are too complex, require bank integration (creating distrust), generate anxiety with excessive notifications/charts, and are slow/difficult to use daily.

**Solution**: A minimalist app allowing expense recording in 3 taps: Open app → enter amount → select category → save.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (configured via `@theme` in globals.css, NOT tailwind.config.ts)
- **Components**: Shadcn/UI + multiple registries via MCP (@aceternity, @magicui, @kokonutui, @cult-ui, @motion-primitives, @blocks, @nativeui)
- **Icons**: Lucide React (exclusive - do NOT use react-icons)
- **Theme Management**: next-themes (dark mode native)
- **Font**: Poppins (Google Fonts)

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

This project uses a **spec-driven design workflow** with automated feature generation:

```
stash/
├── .claude/                    # Design system automation
│   ├── commands/design/        # /design:* slash commands
│   ├── design-system/          # 5 Premium Principles documentation
│   ├── templates/              # Premium component patterns
│   └── docs/                   # Additional documentation
├── specs/                      # Feature specifications (.md)
│   ├── expenses.md             # Expense CRUD feature
│   ├── history.md              # Timeline view feature
│   └── summary.md              # Dashboard feature
├── src/
│   ├── app/                    # Next.js App Router (file-based routing)
│   │   ├── layout.tsx          # Root layout with ThemeProvider
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Tailwind v4 theme config (@theme directive)
│   │   └── [feature]/          # Feature pages (expenses, history, summary)
│   ├── features/               # Feature modules (autocontained)
│   │   └── [feature-name]/
│   │       ├── components/     # Feature-specific components
│   │       ├── types/          # TypeScript interfaces
│   │       └── utils/          # Feature utilities
│   ├── components/             # Global components ONLY
│   │   ├── ui/                 # Shadcn/UI primitives
│   │   ├── theme-provider.tsx
│   │   └── mode-toggle.tsx
│   ├── theme/                  # Design system configuration
│   │   └── config.ts           # Design tokens (colors, spacing, etc.)
│   └── navigation/             # Route configuration (if needed)
├── components.json             # Shadcn/UI + MCP registries config
└── design.md                   # Design system documentation
```

**Key architectural decisions:**
- **App Router**: Uses Next.js file-based routing (NOT React Router DOM)
- **Feature Modules**: Each feature is self-contained in `src/features/[feature-name]/`
- **Separation of Concerns**: Routes live in `app/`, business logic in `features/`, global UI in `components/`
- **Visual-Only Prototypes**: Generated code is UI/UX only - no business logic, validations, or API calls

## Design System (Premium v2.0)

This project implements **5 Premium Principles** that must be applied to all UI components:

### 1. Two-Layer Shadows
Combine inner shadow (highlight) + outer shadow (drop shadow) for realistic depth:
```tsx
className="shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shadow-md
           hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:shadow-lg"
```

### 2. Color Layering
Use 3-4 shades for visual hierarchy:
- Shade 1 (Page): `bg-neutral-50 dark:bg-neutral-950`
- Shade 2 (Cards): `bg-white dark:bg-neutral-900`
- Shade 3 (Interactive): `bg-neutral-100 dark:bg-neutral-800`
- Shade 4 (Hover): `hover:bg-neutral-200 dark:hover:bg-neutral-700`

### 3. Premium Spacing
Use 24px base (not 16px):
- Page layouts: `p-6 md:p-8 space-y-8`
- Grids: `gap-6`
- Card interiors: `p-6 space-y-4`

### 4. Hierarchical Typography
5 clear levels:
- Display (Page titles): `text-4xl md:text-5xl font-bold tracking-tight`
- Heading (Section titles): `text-xl md:text-2xl font-semibold`
- Body (Main content): `text-base leading-relaxed`
- Caption (Metadata): `text-sm text-neutral-600`
- Helper (Hints): `text-xs text-neutral-500`

### 5. Micro-interactions
Smooth transitions with visual feedback:
```tsx
className="transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
```

**Always include dark mode variants** using `dark:` prefix for all color classes.

## Design Workflow Commands

This project uses specialized slash commands for feature generation:

### `/design:init [project-name]`
**IMPORTANT**: Must run AFTER Next.js is manually installed (via `create-next-app`)

Initializes the design system:
- Configures Shadcn/UI + Tailwind v4
- Creates theme with premium tokens (two-layer shadows, transitions)
- Sets up dark mode (next-themes)
- Configures MCP registries
- Creates folder structure

### `/design:feature <spec-path>`
Generates a complete feature module from a specification:
- Reads `.md` spec from `specs/` folder
- Creates pages in `src/app/[feature-name]/` (App Router)
- Creates module in `src/features/[feature-name]/`
- Generates TypeScript types, components, and utils
- Applies all 5 Premium Principles automatically
- Installs required Shadcn primitives via MCP
- Creates README.md with implementation checklist

### `/design:integrate`
Integrates all features into a navigable app:
- Creates premium sidebar with navigation
- Creates global layout
- Creates homepage with feature dashboard
- Applies all 5 Premium Principles

### `/design:refine <feature-name>`
Refines an existing feature (80% principles + 20% MCP components):
- Applies/enhances 5 Premium Principles
- Optionally adds advanced MCP components (user approval required)

### `/design:validate-spec <spec-path>`
Validates spec structure before generation

## Specification Format

Feature specs follow this structure (see `specs/*.md` for examples):

```markdown
# Feature: [Name]

## Objetivo
Clear description of the feature purpose (1-3 paragraphs)

## Critérios de Aceitação
- [ ] Specific, testable criteria grouped by category

## Campos
| Campo | Tipo | Obrigatório | Validação | Descrição |
|-------|------|-------------|-----------|-----------|

## Cenários de Uso
| ID | Cenário | Input | Output Esperado |
|----|---------|-------|-----------------|
```

## Target Features (MVP)

1. **Despesas** (expenses) - Complete expense CRUD
2. **Histórico** (history) - Chronological grouped view
3. **Resumo** (summary) - Monthly metrics dashboard

## Styling Conventions

### Tailwind v4 Configuration
- Theme is configured in `src/app/globals.css` using `@theme` directive
- NO `tailwind.config.ts` file (v4 doesn't use it)
- Custom tokens defined as CSS variables

### Color Palette
- Primary: Blue 600 (#2563eb) - Trust/professionalism
- Secondary: Slate 500 (#64748b)
- Accent: Sky 500 (#0ea5e9)
- Full neutral scale (50-900) for light/dark variants

### Border Radius (Bold & Vibrant style)
- sm: 0.375rem (6px)
- md: 0.5rem (8px) - default
- lg: 0.75rem (12px)
- full: 9999px (pills/badges)

### Shadows (Two-Layer System)
Defined in `src/theme/config.ts`:
- sm: `0 2px 4px rgba(0,0,0,0.1)` + inner highlight
- md: `0 8px 12px rgba(0,0,0,0.15)` + inner highlight
- lg: `0 16px 24px rgba(0,0,0,0.2)` + inner highlight
- xl: `0 24px 32px rgba(0,0,0,0.25)` + inner highlight

### Container Max-Widths
Standardized content width limits:
- `max-w-prose` (65ch) - Long-form text
- `max-w-2xl` (672px) - Forms and medium text
- `max-w-4xl` (896px) - Detail pages
- `max-w-7xl` (1280px) - Overall layout

## Development Principles

### Visual-Only Philosophy
Generated code contains ONLY visual structure (UI/UX). DO NOT expect:
- ❌ Business logic (calculations, transformations)
- ❌ Form validations (Zod schemas)
- ❌ API calls (fetch, axios)
- ❌ State management (beyond basic useState simulations)
- ❌ Authentication/authorization

Generated code DOES include:
- ✅ React/TSX component structure
- ✅ Tailwind styling with theme tokens
- ✅ Navigation between views (App Router)
- ✅ Layout and composition
- ✅ Mock data for visual demonstration
- ✅ TypeScript interfaces for future implementation
- ✅ Basic simulations (filters, loading states) for UX demonstration

### Development Workflow
1. Create detailed specs in `specs/[feature-name].md`
2. Run `/design:feature specs/[feature-name].md` to generate module
3. Review generated code and customize as needed
4. Implement business logic, validations, and API integration
5. Add tests, error handling, and optimizations

### Mobile-First Approach
- All layouts are responsive with mobile breakpoints
- Minimum target: 3 taps to complete primary action
- FAB (Floating Action Button) for main actions
- Optimized for one-handed use
- Fast (≤10 seconds) to record an expense

## UI/UX Guidelines

### User Experience Priorities
1. **Speed**: Every main action must complete in ≤3 taps
2. **Minimalism**: Remove everything non-essential
3. **Clarity**: Simple, direct visual information
4. **Non-judgmental**: Positive language, no "alerts" or "limits"
5. **Mobile-first**: Optimized for quick smartphone use

### Success Metrics
- Average expense recording time: ≤10 seconds
- Completion rate for recording flow: >95%
- Users viewing summary weekly: >60%
- NPS (Net Promoter Score): >50

### Component Usage
- Always prefer Shadcn/UI components over custom implementations
- Use Lucide React for ALL icons (never react-icons)
- Apply theme tokens from `@/theme/config` consistently
- Include dark mode variants for all color classes
- Follow the 5 Premium Principles for all new components

## Important Notes

### Tailwind v4 Differences
- Configuration is in `globals.css` using `@theme`, NOT in `tailwind.config.ts`
- CSS variables are the primary theming mechanism
- Import order matters: `@import "tailwindcss"` must be first

### App Router Specifics
- Use `'use client'` directive for components with hooks (useState, useEffect)
- Use `Link` from `next/link` (NOT react-router-dom)
- Use `useRouter()` from `next/navigation` (NOT next/router)
- Use `useParams()` from `next/navigation` for dynamic routes
- Pages are automatically routed based on file structure in `app/`

### MCP Integration
- MCP Server (Shadcn) is configured in `.mcp.json`
- Multiple component registries available beyond standard Shadcn
- Use `/design:refine` to explore advanced components
- Always get user approval before installing MCP components

### Dark Mode
- Configured globally via `next-themes` in root layout
- ThemeProvider wraps all content
- ModeToggle component available for theme switching
- Always add `dark:` variants to color utilities
- Test all components in both light and dark modes

## Common Tasks

### Adding a New Feature
1. Create spec: `specs/[feature-name].md`
2. Validate: `/design:validate-spec specs/[feature-name].md`
3. Generate: `/design:feature specs/[feature-name].md`
4. Review generated code in `src/app/[feature-name]/` and `src/features/[feature-name]/`
5. Integrate: `/design:integrate` (after multiple features)

### Customizing a Feature
- Modify components in `src/features/[feature-name]/components/`
- Update types in `src/features/[feature-name]/types/`
- Add utilities in `src/features/[feature-name]/utils/`
- Keep changes consistent with design system tokens

### Installing Shadcn Components
```bash
npx shadcn@latest add [component-name]
```
Or use the MCP server for advanced registry components.

### Testing Features Locally
```bash
npm run dev
# Navigate to http://localhost:3000/[feature-name]
```

## Resources

- Project brief: `briefing_stash.md`
- Project scope: `escopo.md`
- Design system: `design.md`
- 5 Premium Principles: `.claude/design-system/principles.md`
- Component patterns: `.claude/templates/`
- Spec examples: `specs/*.md`
- Workflow documentation: `.claude/README.md`
- Shadcn MCP docs: `.claude/docs/shad-mcp.md`
- Dark mode setup: `.claude/docs/dark.md`
