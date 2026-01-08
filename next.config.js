/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para produção em VPS
  output: 'standalone',
  
  // Configurações de segurança
  poweredByHeader: false,
  
  // Configurações experimentais
  experimental: {
    // Otimizações de servidor
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
}

module.exports = nextConfig
