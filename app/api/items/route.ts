// ===========================================
// API Route - CRUD de Items
// ===========================================
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

// GET - Listar todos os itens
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const category = searchParams.get('category')
    const stack = searchParams.get('stack')
    const favorite = searchParams.get('favorite')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}

    if (type) where.type = type
    if (category) where.category = category
    if (stack) where.stack = stack
    if (favorite === 'true') where.favorite = true

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { content: { contains: search } },
        { tags: { contains: search } },
      ]
    }

    const items = await prisma.item.findMany({
      where,
      orderBy: [
        { favorite: 'desc' },
        { updatedAt: 'desc' },
      ],
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('Erro ao buscar itens:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// POST - Criar novo item
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()

    // Validação básica
    if (!body.type || !body.title || !body.content) {
      return NextResponse.json(
        { error: 'Tipo, título e conteúdo são obrigatórios' },
        { status: 400 }
      )
    }

    const item = await prisma.item.create({
      data: {
        type: body.type,
        title: body.title,
        description: body.description || null,
        content: body.content,
        tags: body.tags || '[]',
        category: body.category || null,
        stack: body.stack || null,
        favorite: body.favorite || false,
      },
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar item:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
