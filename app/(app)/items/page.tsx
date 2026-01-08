// ===========================================
// Listagem de Itens
// ===========================================
import prisma from '@/lib/prisma'
import { Header, ItemCard, FilterBar, EmptyState } from '@/components'
import { ItemType } from '@/lib/types'

interface ItemsPageProps {
  searchParams: Promise<{
    search?: string
    type?: ItemType
    category?: string
    stack?: string
    favorite?: string
  }>
}

async function getItems(params: {
  search?: string
  type?: ItemType
  category?: string
  stack?: string
  favorite?: string
}) {
  const where: Record<string, unknown> = {}

  // Filtro por tipo
  if (params.type) {
    where.type = params.type
  }

  // Filtro por categoria
  if (params.category) {
    where.category = params.category
  }

  // Filtro por stack
  if (params.stack) {
    where.stack = params.stack
  }

  // Filtro por favoritos
  if (params.favorite === 'true') {
    where.favorite = true
  }

  // Busca por texto (title, description, content, tags)
  if (params.search) {
    where.OR = [
      { title: { contains: params.search } },
      { description: { contains: params.search } },
      { content: { contains: params.search } },
      { tags: { contains: params.search } },
    ]
  }

  const items = await prisma.item.findMany({
    where,
    orderBy: [
      { favorite: 'desc' },
      { updatedAt: 'desc' },
    ],
  })

  return items
}

// Obter categorias e stacks únicas para filtros
async function getFilterOptions() {
  const [categories, stacks] = await Promise.all([
    prisma.item.groupBy({
      by: ['category'],
      where: { category: { not: null } },
    }),
    prisma.item.groupBy({
      by: ['stack'],
      where: { stack: { not: null } },
    }),
  ])

  return {
    categories: categories.map((c) => c.category).filter(Boolean) as string[],
    stacks: stacks.map((s) => s.stack).filter(Boolean) as string[],
  }
}

export default async function ItemsPage({ searchParams }: ItemsPageProps) {
  const params = await searchParams
  const items = await getItems(params)
  const filters = await getFilterOptions()

  // Título dinâmico baseado nos filtros
  let title = 'Todos os Itens'
  if (params.type) {
    const typeNames: Record<string, string> = {
      prompt: 'Prompts',
      template: 'Templates',
      snippet: 'Snippets',
      tool: 'Ferramentas',
      checklist: 'Checklists',
    }
    title = typeNames[params.type] || 'Itens'
  }
  if (params.favorite === 'true') {
    title = 'Favoritos'
  }
  if (params.search) {
    title = `Resultados para "${params.search}"`
  }

  return (
    <div className="min-h-screen">
      <Header 
        title={title}
        subtitle={`${items.length} ${items.length === 1 ? 'item encontrado' : 'itens encontrados'}`}
      />

      <div className="p-6 space-y-6">
        {/* Barra de Filtros */}
        <FilterBar />

        {/* Lista de Itens */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={params.search ? '🔍' : '📭'}
            title={params.search ? 'Nenhum resultado' : 'Nenhum item ainda'}
            description={
              params.search 
                ? `Não encontramos itens para "${params.search}". Tente outra busca.`
                : 'Comece criando seu primeiro item para o arsenal.'
            }
            actionLabel="Criar novo item"
            actionHref="/items/new"
          />
        )}
      </div>
    </div>
  )
}
