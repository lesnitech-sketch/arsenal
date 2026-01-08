// ===========================================
// API Route - Item Individual (GET, PUT, DELETE)
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

// GET - Buscar item por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id } = await params

    const item = await prisma.item.findUnique({
      where: { id },
    })

    if (!item) {
      return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error('Erro ao buscar item:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// PUT - Atualizar item
export async function PUT(request: NextRequest, { params }: RouteParams) {
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

    // Validação básica
    if (!body.type || !body.title || !body.content) {
      return NextResponse.json(
        { error: 'Tipo, título e conteúdo são obrigatórios' },
        { status: 400 }
      )
    }

    const item = await prisma.item.update({
      where: { id },
      data: {
        type: body.type,
        title: body.title,
        description: body.description || null,
        content: body.content,
        tags: body.tags || '[]',
        category: body.category || null,
        stack: body.stack || null,
        favorite: body.favorite ?? existing.favorite,
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('Erro ao atualizar item:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// DELETE - Excluir item
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    await prisma.item.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir item:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
