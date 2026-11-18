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

## Banco de testes do Estúdio

Aplique `supabase/migrations/20261118124000_studio_accounts.sql` somente no projeto de desenvolvimento durante a validação. A migração cria perfis e cartões vinculados à conta autenticada. Acesso anônimo não recebe permissão nas tabelas, e as políticas restringem leitura e escrita a registros do próprio usuário.

Depois de ligar o aplicativo ao Supabase Auth, valide o isolamento com duas contas comuns. Crie um perfil e um cartão na conta A e confirme que a conta B não os lê, atualiza ou remove. Ao criar um cartão com a sessão B, tente atribuí-lo à conta A e confirme que a política recusa. Repita com a sessão anônima. Use a chave publicável e sessões de usuário nessas verificações.

Configure `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` em `.env.local` para ativar o login individual. No painel de testes, crie as contas de validação em **Authentication → Users**. Depois reinicie o site, entre em `/login` com e-mail e senha e salve o perfil. O perfil passa a ser salvo no Supabase. A produção usa uma chave de armazenamento por conta no navegador. Os cartões do modo local ficam na chave anterior até que a importação seja implementada.

O quadro e a contagem semanal consultam `studio_entries` quando o login do Supabase está ativo. Para copiar cartões do armazenamento do navegador vinculado à mesma conta, use **Importar cartões** em **Produção e agenda**. A importação mantém os IDs e ignora registros que já existem no banco. O quadro local anterior à criação de contas fica preservado separadamente.

Aplique também `supabase/migrations/20261118133000_studio_analytics.sql` para habilitar **Estúdio → Acompanhamento**. Essa tela permite registrar as métricas dos primeiros dois ou sete dias de um vídeo e salvar uma revisão por semana. Os valores vêm do preenchimento manual.
