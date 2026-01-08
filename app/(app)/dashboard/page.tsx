// ===========================================
// Dashboard - Página Principal
// ===========================================
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Header, ItemCard, EmptyState } from '@/components'
import { typeIcons, typeLabels } from '@/lib/utils'

// Estatísticas do dashboard
async function getStats() {
  const [total, favorites, byType, recentItems, favoriteItems, mostUsed] = await Promise.all([
    prisma.item.count(),
    prisma.item.count({ where: { favorite: true } }),
    prisma.item.groupBy({
      by: ['type'],
      _count: { type: true },
    }),
    prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.item.findMany({
      where: { favorite: true },
      orderBy: { updatedAt: 'desc' },
      take: 4,
    }),
    prisma.item.findMany({
      where: { usageCount: { gt: 0 } },
      orderBy: { usageCount: 'desc' },
      take: 4,
    }),
  ])

  const typeStats = byType.reduce((acc, curr) => {
    acc[curr.type] = curr._count.type
    return acc
  }, {} as Record<string, number>)

  return { total, favorites, typeStats, recentItems, favoriteItems, mostUsed }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const stats = await getStats()

  return (
    <div className="min-h-screen">
      <Header 
        title={`Olá, ${session?.user?.name || 'Dev'}! 👋`}
        subtitle="O que vamos criar hoje?"
      />

      <div className="p-6 space-y-8">
        {/* Cards de Estatísticas */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total de Itens */}
          <div className="p-5 bg-arsenal-surface border border-arsenal-border rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-arsenal-text-secondary">Total de Itens</p>
                <p className="text-3xl font-bold text-arsenal-text mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-arsenal-accent/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          </div>

          {/* Favoritos */}
          <div className="p-5 bg-arsenal-surface border border-arsenal-border rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-arsenal-text-secondary">Favoritos</p>
                <p className="text-3xl font-bold text-arsenal-text mt-1">{stats.favorites}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>

          {/* Por Tipo - Prompts */}
          <div className="p-5 bg-arsenal-surface border border-arsenal-border rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-arsenal-text-secondary">Prompts</p>
                <p className="text-3xl font-bold text-arsenal-text mt-1">
                  {stats.typeStats['prompt'] || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
            </div>
          </div>

          {/* Por Tipo - Snippets */}
          <div className="p-5 bg-arsenal-surface border border-arsenal-border rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-arsenal-text-secondary">Snippets</p>
                <p className="text-3xl font-bold text-arsenal-text mt-1">
                  {stats.typeStats['snippet'] || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💻</span>
              </div>
            </div>
          </div>
        </section>

        {/* Atalhos Rápidos */}
        <section>
          <h2 className="text-lg font-semibold text-arsenal-text mb-4">Atalhos Rápidos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(typeLabels).map(([type, label]) => (
              <Link
                key={type}
                href={`/items/new?type=${type}`}
                className="flex items-center gap-3 p-4 bg-arsenal-surface border border-arsenal-border rounded-xl hover:border-arsenal-accent/50 hover:bg-arsenal-hover transition-all duration-200"
              >
                <span className="text-2xl">{typeIcons[type]}</span>
                <span className="text-sm font-medium text-arsenal-text">
                  Novo {label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Itens Recentes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-arsenal-text">Itens Recentes</h2>
            <Link 
              href="/items" 
              className="text-sm text-arsenal-accent hover:text-arsenal-accent-hover transition-colors"
            >
              Ver todos →
            </Link>
          </div>

          {stats.recentItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.recentItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🚀"
              title="Comece seu arsenal"
              description="Crie seu primeiro item e comece a organizar seus recursos de produtividade."
              actionLabel="Criar primeiro item"
              actionHref="/items/new"
            />
          )}
        </section>

        {/* Favoritos */}
        {stats.favoriteItems.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-arsenal-text">⭐ Favoritos</h2>
              <Link 
                href="/items?favorite=true" 
                className="text-sm text-arsenal-accent hover:text-arsenal-accent-hover transition-colors"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.favoriteItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Mais Usados */}
        {stats.mostUsed.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-arsenal-text">🔥 Mais Usados</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.mostUsed.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
