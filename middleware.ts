// ===========================================
// Middleware de Proteção de Rotas
// ===========================================
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Usuário autenticado, permitir acesso
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Rotas públicas - sempre permitir
        const publicPaths = ['/login', '/api/auth']
        const isPublicPath = publicPaths.some(path => 
          req.nextUrl.pathname.startsWith(path)
        )
        
        if (isPublicPath) {
          return true
        }
        
        // Outras rotas - requer autenticação
        return !!token
      },
    },
    pages: {
      signIn: '/login',
    },
  }
)

// Rotas que o middleware deve proteger
export const config = {
  matcher: [
    /*
     * Proteger todas as rotas exceto:
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico
     * - Arquivos públicos
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/auth).*)',
  ],
}
