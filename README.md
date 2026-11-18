# GTA Creator OS

Primeira versão em Next.js, TypeScript, Tailwind CSS e Node.js. O site inclui uma página pública, um guia gratuito de captura e a apresentação de um guia premium em preparação. O estúdio tem login de proprietário, perfil do canal e painel com métricas demonstrativas.

## Rodar no Mac

Use Node.js 22. Na raiz do projeto:

```sh
npm install
cp .env.example .env.local
npm run dev
```

Gere dois valores distintos com `openssl rand -hex 32`. Use um como `STUDIO_ACCESS_KEY` (a chave digitada no login) e outro como `STUDIO_SESSION_SECRET`. Configure-os em `.env.local` e reinicie o servidor após qualquer alteração. Abra `http://localhost:3000`. O estúdio fica indisponível enquanto as duas variáveis estiverem ausentes ou inválidas.

## Publicar

Coloque apenas esta pasta em um repositório GitHub. Importe o repositório em https://vercel.com/new com preset Next.js. Configure as variáveis de ambiente da área privada antes de publicar e mantenha os valores fora do Git. Verifique a build com `npm run build` e teste o acesso anônimo a `/studio`, chave inválida, login, atualização do perfil e logout. Gere e versione o package-lock.json após a primeira instalação com rede disponível.

## Escopo da primeira versão

O perfil fica no navegador em cookie HTTP-only. A sessão assinada expira em oito horas. A autenticação é para um proprietário com chave aleatória. A próxima etapa comercial precisa de autenticação por cliente, PostgreSQL para compras e permissões, e confirmação de pagamento pelo servidor. A página pública já apresenta o produto como em preparação.

## Produção editorial

Depois de entrar no estúdio, abra **Produção e agenda**. Cadastre o título, formato e roteiro ou checklist. Mova o conteúdo pelas etapas do quadro usando o seletor do cartão e inclua uma data para aparecer na agenda. O armazenamento atual é por navegador. Use um perfil pessoal e evite cadastrar informações sensíveis no quadro.

O fluxo de qualidade executa instalação pelo lockfile, testes de validação e ordenação da agenda, build de produção e auditoria de dependências.

## Sugestões de pautas com IA

Configure `OPENAI_API_KEY` em `.env.local` ou no ambiente do servidor. Reinicie o desenvolvimento local ou faça um novo deploy. No estúdio, abra **Produção e agenda**, selecione formato e minutos disponíveis e descreva as gravações que você já tem. A descrição é enviada ao provedor para gerar três pautas. Use **Salvar no quadro** para colocar uma pauta na etapa Ideia. Revise o texto antes de publicar.

A chave fica no servidor e as sugestões exigem uma sessão do estúdio. Configure um orçamento para o projeto da API e monitore o consumo. O intervalo de 20 segundos funciona por instância em execução. O modelo padrão pode ser substituído por outro compatível com Responses, raciocínio mínimo e saída estruturada em `OPENAI_IDEAS_MODEL`.
