# Controle de Jogos

Aplicação web para gerenciar sua lista de jogos para terminar, com autenticação via Google.

## Funcionalidades

- Autenticação com Google (NextAuth)
- Adição de jogos com nome, dificuldade e prioridade
- Marcação de jogos como terminados
- Ordenação automática por prioridade e status

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

2. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` com as chaves do Google OAuth:
     ```
     GOOGLE_CLIENT_ID=...
     GOOGLE_CLIENT_SECRET=...
     NEXTAUTH_URL=http://localhost:3000
     ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000) e faça login com sua conta Google.

## Estrutura

- `app/` - Páginas e componentes principais
- `types/Game.ts` - Tipagem do objeto de jogo
- `app/GameList.tsx` - Componente da lista de jogos
- `app/api/auth/[...nextauth]/route.ts` - Configuração do NextAuth

## Sobre

Desenvolvido por Matheus.  
Projeto Next.js + TypeScript.
