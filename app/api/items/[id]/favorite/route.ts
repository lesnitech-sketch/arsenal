// ===========================================
// API Route - Toggle Favorito
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

// PATCH - Toggle favorito
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

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
        favorite: body.favorite ?? !existing.favorite,
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
