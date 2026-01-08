// ===========================================
// Tipos TypeScript para o App
// ===========================================

// Tipos de item disponíveis
export type ItemType = 'prompt' | 'template' | 'snippet' | 'tool' | 'checklist'

// Interface do Item
export interface Item {
  id: string
  type: ItemType
  title: string
  description: string | null
  content: string
  tags: string // JSON string
  category: string | null
  stack: string | null
  favorite: boolean
  usageCount: number
  createdAt: Date
  updatedAt: Date
}

// Item com tags parseadas
export interface ItemWithParsedTags extends Omit<Item, 'tags'> {
  tags: string[]
}

// Payload para criar/editar item
export interface ItemPayload {
  type: ItemType
  title: string
  description?: string
  content: string
  tags: string[]
  category?: string
  stack?: string
  favorite?: boolean
}

// Filtros de busca
export interface ItemFilters {
  search?: string
  type?: ItemType
  category?: string
  stack?: string
  favorite?: boolean
}

// Resposta paginada
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Estatísticas do dashboard
export interface DashboardStats {
  total: number
  favorites: number
  byType: Record<ItemType, number>
  recentItems: Item[]
  favoriteItems: Item[]
  mostUsed: Item[]
}

// Extensão do NextAuth
declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name?: string | null
  }

  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
  }
}
