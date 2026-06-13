# Afiliado MLII

Base inicial de um site de afiliados do Mercado Livre com Next.js 14, TypeScript e Tailwind.

## O que já está pronto

- Home com visual de vitrine
- Página de produtos com filtros
- Página de produto com reviews e relacionados
- Blog com lista e post individual
- Dashboard administrativo com dados simulados
- Rotas de API mockadas para importação e atualização
- Sitemap e robots automáticos
- Scripts TypeScript para importação e atualização simulada

## Como rodar

1. Instale as dependências.
2. Copie `.env.local.example` para `.env.local`.
3. Execute `npm run dev`.

## Firebase

Esta parte foi deixada para o final, como você pediu. Quando você tiver a conta e o projeto criados, a próxima etapa é:

- preencher as variáveis `NEXT_PUBLIC_FIREBASE_*`
- ativar Firestore e Auth
- trocar os dados mockados pelos dados reais

## Mercado Livre

- `NEXT_PUBLIC_ML_API_ACCESS_TOKEN`
- `NEXT_PUBLIC_ML_AFFILIATE_ID`

Esses valores entram no `.env.local` quando você estiver pronto para conectar a API real.

## Scripts

- `npx tsx scripts/import-ml-products.ts`
- `npx tsx scripts/update-prices.ts`

## Próximo passo

Quando quiser, eu continuo com a etapa seguinte: conexão real com Firebase, sem quebrar o que já foi montado.
