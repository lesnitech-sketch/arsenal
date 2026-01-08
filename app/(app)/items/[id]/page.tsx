// ===========================================
// Página - Detalhes/Editar Item
// ===========================================
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Header } from '@/components'
import ItemDetail from './ItemDetail'

interface ItemPageProps {
  params: Promise<{
    id: string
  }>
}

async function getItem(id: string) {
  const item = await prisma.item.findUnique({
    where: { id },
  })

  return item
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params
  const item = await getItem(id)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header 
        title={item.title}
        showSearch={false}
      />

      <div className="p-6">
        <ItemDetail item={item} />
      </div>
    </div>
  )
}
