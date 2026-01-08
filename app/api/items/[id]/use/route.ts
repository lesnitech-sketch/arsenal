// ===========================================
// API Route - Registrar Uso (Contador)
// ===========================================
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// POST - Incrementar contador de uso
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id } = await params

    // Verificar se item existe
    const existing = await prisma.item.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 })
    }

    const item = await prisma.item.update({
      where: { id },
      data: {
        usageCount: { increment: 1 },
      },
    })

    return NextResponse.json({ usageCount: item.usageCount })
  } catch (error) {
    console.error('Erro ao registrar uso:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
