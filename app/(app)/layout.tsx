// ===========================================
// Layout do App (Área autenticada)
// ===========================================
import { Sidebar } from '@/components'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-arsenal-bg">
      {/* Sidebar fixa */}
      <Sidebar />
      
      {/* Área de conteúdo principal */}
      <main className="ml-64">
        {children}
      </main>
    </div>
  )
}
