// ===========================================
// Seed - Criar usuário admin e itens de exemplo
// ===========================================
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar usuário admin
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@arsenal.dev'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Arsenal@2024'

  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Administrador',
    },
  })

  console.log(`✅ Usuário admin criado: ${admin.email}`)

  // Criar itens de exemplo
  const items = [
    {
      type: 'prompt',
      title: 'Prompt para Code Review',
      description: 'Prompt otimizado para fazer code review com IA',
      content: `Analise o código abaixo e forneça:
1. Problemas de segurança
2. Melhorias de performance
3. Sugestões de refatoração
4. Boas práticas não seguidas

Código:
\`\`\`
{COLE O CÓDIGO AQUI}
\`\`\``,
      tags: JSON.stringify(['code-review', 'ia', 'qualidade']),
      category: 'Desenvolvimento',
      stack: 'Geral',
      favorite: true,
    },
    {
      type: 'snippet',
      title: 'React Hook - useLocalStorage',
      description: 'Hook customizado para persistir estado no localStorage',
      content: `import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}`,
      tags: JSON.stringify(['react', 'hook', 'localStorage', 'typescript']),
      category: 'Frontend',
      stack: 'React',
      favorite: true,
    },
    {
      type: 'template',
      title: 'README.md para Projeto Open Source',
      description: 'Template completo de README para projetos open source',
      content: `# Nome do Projeto

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 Descrição

Breve descrição do projeto.

## 🚀 Funcionalidades

- ✅ Funcionalidade 1
- ✅ Funcionalidade 2
- 🚧 Funcionalidade 3 (em desenvolvimento)

## 📦 Instalação

\`\`\`bash
npm install nome-do-pacote
\`\`\`

## 🔧 Uso

\`\`\`javascript
// Exemplo de uso
\`\`\`

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch (\`git checkout -b feature/nova-feature\`)
3. Commit suas mudanças (\`git commit -m 'Add: nova feature'\`)
4. Push para a branch (\`git push origin feature/nova-feature\`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.`,
      tags: JSON.stringify(['readme', 'documentação', 'open-source', 'github']),
      category: 'Documentação',
      stack: 'Geral',
      favorite: false,
    },
    {
      type: 'tool',
      title: 'Excalidraw',
      description: 'Ferramenta de diagramas e wireframes estilo whiteboard',
      content: `🔗 Link: https://excalidraw.com/

📝 Notas:
- Ótimo para diagramas rápidos
- Estilo hand-drawn
- Colaboração em tempo real
- Exporta PNG, SVG
- Funciona offline

💡 Dica: Use a biblioteca de componentes para UI mockups`,
      tags: JSON.stringify(['diagrama', 'wireframe', 'design', 'colaboração']),
      category: 'Design',
      stack: 'Geral',
      favorite: true,
    },
    {
      type: 'checklist',
      title: 'Deploy de Aplicação Next.js',
      description: 'Checklist completo para deploy de apps Next.js em produção',
      content: `## Pré-Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Build local sem erros (\`npm run build\`)
- [ ] Testes passando
- [ ] Lint sem warnings
- [ ] Imagens otimizadas

## Configuração

- [ ] next.config.js revisado
- [ ] Headers de segurança configurados
- [ ] robots.txt e sitemap.xml
- [ ] Meta tags e Open Graph
- [ ] Favicon e manifest.json

## Performance

- [ ] Lighthouse score > 90
- [ ] Bundle size analisado
- [ ] Lazy loading implementado
- [ ] Caching configurado

## Pós-Deploy

- [ ] Verificar todas as rotas
- [ ] Testar formulários
- [ ] Checar logs de erro
- [ ] Monitoramento configurado
- [ ] Backup do banco de dados`,
      tags: JSON.stringify(['deploy', 'checklist', 'nextjs', 'produção']),
      category: 'DevOps',
      stack: 'Next.js',
      favorite: false,
    },
  ]

  for (const item of items) {
    await prisma.item.create({
      data: item,
    })
  }

  console.log(`✅ ${items.length} itens de exemplo criados`)
  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
