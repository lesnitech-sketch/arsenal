// ===========================================
// Página - Criar Novo Item
// ===========================================
import { Header } from '@/components'
import ItemForm from '../ItemForm'
import { ItemType } from '@/lib/types'

interface NewItemPageProps {
  searchParams: Promise<{
    type?: ItemType
  }>
}

export default async function NewItemPage({ searchParams }: NewItemPageProps) {
  const params = await searchParams
  
  return (
    <div className="min-h-screen">
      <Header 
        title="Novo Item"
        subtitle="Adicione um novo recurso ao seu arsenal"
        showSearch={false}
      />

      <div className="p-6 max-w-3xl">
        <div className="bg-arsenal-surface border border-arsenal-border rounded-xl p-6">
          <ItemForm defaultType={params.type} />
        </div>
      </div>
    </div>
  )
}
