/**
 * Types para o módulo de Despesas (Expenses)
 *
 * IMPORTANTE: Esta é apenas a estrutura de tipos.
 * A lógica de validação (Zod) e transformação deve ser implementada
 * pelo time de desenvolvimento.
 */

// Enum para categorias de despesas
export type ExpenseCategory =
  | 'alimentacao'
  | 'transporte'
  | 'lazer'
  | 'casa'
  | 'saude'
  | 'compras'
  | 'educacao'
  | 'outros';

// Metadata de categoria (ícone, cor, emoji)
export interface CategoryMetadata {
  id: ExpenseCategory;
  label: string;
  icon: string; // Nome do ícone Lucide React
  color: string; // Tailwind color class
  emoji: string;
}

// Interface principal de Despesa
export interface Expense {
  id: string; // UUID gerado automaticamente
  valor: number; // Valor em R$ (ex: 7.50)
  categoria: ExpenseCategory;
  data: string; // ISO 8601 string (ex: "2024-01-15")
  descricao?: string; // Opcional, max 100 caracteres
  criadoEm: string; // ISO 8601 timestamp
  atualizadoEm: string; // ISO 8601 timestamp
}

// Props de componentes
export interface ExpenseCardProps {
  expense: Expense;
  onClick?: () => void;
}

export interface ExpenseFABProps {
  onClick: () => void;
}

export interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Expense; // Se fornecido, é modo edição
  onSave?: (expense: Expense) => void;
}

export interface CategoryGridProps {
  selectedCategory?: ExpenseCategory;
  onSelectCategory: (category: ExpenseCategory) => void;
}

export interface DayGroupProps {
  date: string; // ISO date string
  expenses: Expense[];
  onExpenseClick: (expense: Expense) => void;
}

// Constantes de categorias (metadata)
export const CATEGORIES: CategoryMetadata[] = [
  {
    id: 'alimentacao',
    label: 'Alimentação',
    icon: 'UtensilsCrossed',
    color: 'orange',
    emoji: '🍔',
  },
  {
    id: 'transporte',
    label: 'Transporte',
    icon: 'Car',
    color: 'blue',
    emoji: '🚗',
  },
  {
    id: 'lazer',
    label: 'Lazer',
    icon: 'Gamepad2',
    color: 'purple',
    emoji: '🎮',
  },
  {
    id: 'casa',
    label: 'Casa',
    icon: 'Home',
    color: 'green',
    emoji: '🏠',
  },
  {
    id: 'saude',
    label: 'Saúde',
    icon: 'Heart',
    color: 'red',
    emoji: '🏥',
  },
  {
    id: 'compras',
    label: 'Compras',
    icon: 'ShoppingBag',
    color: 'pink',
    emoji: '🛒',
  },
  {
    id: 'educacao',
    label: 'Educação',
    icon: 'GraduationCap',
    color: 'indigo',
    emoji: '📚',
  },
  {
    id: 'outros',
    label: 'Outros',
    icon: 'MoreHorizontal',
    color: 'gray',
    emoji: '✨',
  },
];
