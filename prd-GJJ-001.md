# PRD GJJ-001 · Gonzales Jiu-Jitsu · Site completo (port literal do protótipo aprovado)

**Padrão:** BLACK-BELT-UX v5.1 · **Modo:** CLIENT · **Execução:** autônoma (port, sem design pass)
**Cliente:** Gonzales Jiu-Jitsu · 1630 Rio Rancho Blvd SE, Ste D · Rio Rancho, NM 87124 · 505-414-8083
**Pasta do projeto:** `D:\DOCUMENTOS\NovoDash\gonzales-jiu-jitsu-rio-rancho-nm\`
**Fonte da verdade visual:** `D:\DOCUMENTOS\NovoDash\gonzales-jiu-jitsu-rio-rancho-nm\site-prototipo\`
**Protótipo publicado (referência ao vivo):** https://claude.ai/artifact/EJqq3XBJtEGoCssV6jgcxf
**Data:** 02/11/2026 · **Autor:** Adryan (Novo Dash)

> **Em uma frase:** o design já foi aprovado tela por tela. Este PRD não pede um site *parecido*;
> pede **o mesmo site**, em código de produção, com formulário, tracking e SEO de verdade. A prova
> de pronto é automática: `parity.mjs` e `textdiff.mjs` passando em todas as páginas.

---

## 0. PROTOCOLO PARA O CLAUDE CODE

**0.1 Autocontido.** Este PRD é o contrato. Em conflito, vale nesta ordem: **(1) o protótipo
(`site-prototipo/`) para tudo que é visível**, (2) este PRD, (3) os hábitos da casa.

**0.1.1 Execução:** `claude --dangerously-skip-permissions`, a partir da pasta do projeto.

**0.1.2 Fases declaradas.** Toda fase começa com "Iniciando FASE X" e termina com "FASE X concluída"
+ o que foi feito + o resultado do teste da fase.

**0.2 Stack (decisão para este projeto).** React 19 + Vite + react-router-dom + prerender estático,
**a mesma base do `fight-sports-cyborg-miami-fl`** (copiar `package.json` de lá como ponto de partida:
mesmas versões de react, vite, react-router-dom, gsap, `lenis` **1.1.18 fixo**, typescript).
Motivo: reaproveitar sem reescrever o **kit Novo Dash** (`src/nd/*`), o `api/capi.ts`, o
`scripts/prerender.mjs`, o `entry-server.tsx` e o `vercel.json` desse projeto, que já estão em
produção. É um desvio consciente da regra "institucional = Next.js": registrar em `design-decisions.md`.
**Sem Tailwind** neste projeto (o preflight do Tailwind muda margens, line-height e `img` e quebra a
paridade). Sem biblioteca de UI, sem CSS-in-JS, sem CSS Modules. `clsx` permitido.

**0.3 Fases.** F0 Pasta + leitura · F1 Fundação · F2 Layout compartilhado · F3 Home · F4 Páginas
internas · F5 Formulários + tracking + SEO + segurança · F6 Paridade + finalizador. Detalhe na Seção 22.

**0.4 Proibições absolutas.**
- **Reinterpretar o design.** Nada de "melhorar": espaçamento, fonte, cor, ordem, texto, ícone,
  easing, duração, ponto de início de animação — tudo como está no protótipo.
- Tailwind, reset de CSS de terceiros, `normalize.css`, `shadow-md` ou qualquer estilo de biblioteca.
- Texto (copy) escrito direto no TSX: todo texto vem de `src/content/*.ts` (Seção 10).
- Hex fora dos arquivos de CSS: SVG inline usa `currentColor` ou classe; a cor fica no CSS.
- GSAP sem `gsap.context(scope)` + `ctx.revert()` no unmount. ScrollTrigger sem `kill` ao trocar de rota.
- Emoji. Schedule como imagem. Imagem sem `width` e `height`.
- Fonte via `<link>` do Google Fonts (ver 0.12-B: fontes self-hosted).
- Segredo no repositório (0.10).

**0.5 Pendências.** Dado que não existe vira `[… — CONFIRMAR]` em `memory/briefing.md` e na Seção 20,
**nunca** texto publicado. O protótipo já não tem nenhum dado inventado; não acrescente.

**0.6 Regra de ouro.** Se for escrever algo pela segunda vez, pare: Nav, Footer, MobileBar, Modal,
PageHero, Board e Faq são componentes únicos usados em várias páginas, como no protótipo.

**0.7 Posicionamento.** Academia de família, P&B, vermelho **só** em botões (`.cta`, `.pill--cta`,
`.bar__cta`, `.crest__mark`, `.clock__nowm`, `.stub__stamp`). Copy em inglês americano. Três
palavras do brasão: Competition · Family · Community.

**0.8 / 0.9.2 Regra de imagem.** Já cumprida pelo protótipo: toda seção tem imagem ou ilustração.
Não troque nenhuma imagem. Lista completa na Seção 15.

**0.9 Referências.** A única referência visual é `site-prototipo/`. As pastas `fight-sports-cyborg-miami-fl`
(kit `nd`, prerender, capi, vercel.json) são referência **de infraestrutura**, não de visual.
`lp-prototipo/` é uma versão antiga da home: **não usar**.

**0.10 Segredos.** IDs do pixel, GA4, Ads, Clarity e do GHL vão em `src/nd/client.ts` (são públicos
no browser, como no fight-sports). Token de CAPI só em variável de ambiente da Vercel. `.env*` no `.gitignore`.

**0.11 Correções de conteúdo herdado.** Nenhuma: a copy do protótipo foi checada contra site, briefing,
KRQE e reviews do Google. Os pontos em aberto estão na Seção 20 e **não** devem ser "resolvidos" no código.

### 0.12 PORT LITERAL (a regra que manda neste PRD)

**A. Paridade visual medida.** Rodar `site-prototipo/_tools/parity.mjs` (instruções no topo do arquivo)
contra o build. Ele fotografa protótipo e build nos **mesmos 70+ estados** (5 páginas × 1440 e 390,
incluindo o meio de cada pin) com a data congelada em segunda 02/11/2026 13:30 de Rio Rancho, e compara
pixel a pixel. **Todo estado ≤ 1,5% de diferença.** Acima disso não está pronto. Os PNGs lado a lado
ficam em `parity/` para você olhar o que divergiu.

**B. CSS byte a byte.** `site-prototipo/_src/css/01…09-*.css` são o CSS inteiro do protótipo, já
fatiado na ordem certa (verificado: a concatenação é idêntica ao `<style>` das páginas). Copie os
nove arquivos para `src/styles/prototype/` **sem editar** e importe na mesma ordem em `src/styles/index.css`.
Únicas alterações permitidas, cada uma registrada em `design-decisions.md`:
1. Fontes self-hosted: `@fontsource-variable/manrope` e `@fontsource-variable/fraunces` (arquivo com
   os eixos `opsz` e `SOFT`, itálico). Trocar **apenas** os nomes de família em `--f-s` e `--f-i`
   (01-tokens-type.css) para os nomes desses pacotes. Os fallbacks ficam.
2. Estados iniciais escondidos sob `.js` (bug proibido nº 1): um script inline no `<head>` põe
   `document.documentElement.classList.add('js')` antes do paint, e as regras que escondem conteúdo
   no CSS-base passam a valer só com `.js` na frente (`.rv`, `.d .ln>span`, `.pass`, `.tape`,
   `.stamp`/`.stamps__line` da hero, `.kc__art .up`/`.bubble`/`.stripe`/`.spark`/`.ring`,
   `.orbit__seat img`, `.orbit__ring`). Com JS ligado o resultado é idêntico; sem JS nada fica invisível.
3. URLs de imagem no CSS continuam relativas a `/img/`.

**C. DOM igual.** Mesmos elementos, mesmas classes, mesmos `id`, mesma aninhagem, mesmos SVG (copiar o
markup). Os trechos que o protótipo gera com `innerHTML` (board do schedule, FAQ, cards de review e
dots, ticks da régua, mini-semanas, dias do ticket, horários do Visit, linha do relógio, duplicação
das tiras de filme) viram JSX que **produz exatamente o mesmo HTML**.

**D. JS bloco a bloco.** Cada bloco de `_src/js/*.js` vira um hook dentro do componente da seção,
com os **mesmos seletores (agora com escopo), números, eases, `start`/`end`, `scrub`, durações e
`matchMedia(LIVE)`**. O mapa bloco → componente está na Seção 10. Nada de reescrever com Framer Motion,
`motion`, CSS animations novas ou outro scroll.

**E. Copy idêntica.** `site-prototipo/_tools/textdiff.mjs` compara o texto visível de cada página
(1440 e 390). Tem que dar **COPY OK**.

**F. Mudanças permitidas = só as invisíveis:** a11y (atributos ARIA, `inert`, skip link), SEO
(head, JSON-LD, sitemap), performance (preload, `fetchpriority`, `srcset` que mantém o mesmo tamanho
renderizado), tracking, envio real dos formulários, headers de segurança. Qualquer outra diferença
que você ache necessária: **não faça**; registre em `memory/design-decisions.md` como pergunta.

**G. Exceções conscientes aos "bugs proibidos" (aprovadas pelo cliente, NÃO corrigir):**
- nº 5 (orçamento de pin): a home tem hero 1,7 tela + 3 gates de 0,85 + zoom 1,7 + wall ≈1,4. Aprovado assim.
- nº 9 (fonte < 12px): eyebrows, labels e chips em caixa alta com tracking usam 9,5–11,5px. Aprovado assim.
- Os gates têm `aria-hidden` com a palavra do ato: é decorativo, a palavra se repete no eyebrow de cada seção.

---

## 1. CONTEXTO E PROBLEMA REAL

A Gonzales Jiu-Jitsu (aberta em 2024 por Abie e Laura Gonzales, dois veteranos do Exército dos EUA)
tem um site antigo em gonzalesjj.com e uma landing page nova aprovada que virou a home de um site
completo. O problema não é design (já resolvido): é colocar em produção **sem perder nada** do que foi
aprovado, ligado ao CRM e ao tracking da Novo Dash.

- **P1** Portar 5 páginas com ~40 mecanismos de scroll sem regressão visual.
- **P2** O protótipo não envia nada: modal e ticket precisam virar lead + agendamento no GHL via kit `nd`.
- **P3** Sem tracking: Pixel/CAPI, GA4, Ads e Clarity como no fight-sports.
- **P4** Sem SEO técnico: títulos, schema, sitemap, OG.
- **P5** Fotos do Google em baixa resolução (243px) — já usadas só em tamanho pequeno; manter.

**Oportunidade:** é o primeiro site da casa entregue como port medido por script; o par
`parity.mjs` + `textdiff.mjs` vira padrão para os próximos.

## 2. PERSONAS

- **Primária — mãe/pai de Rio Rancho, criança de 4 a 13 anos.** Objeção: "meu filho vai se machucar /
  vai apanhar". Gatilho: segurança, disciplina, família (Kids · Calm/Position/Escape/Confidence, reviews da Sonja e do Kenneth).
- **Secundária — adulto iniciante.** Objeção: "nunca treinei, vou passar vergonha". Gatilho: Fundamentals,
  primeira aula grátis, review do Marcus ("Walked in not knowing what anything was").
- **Secundária — veterano / first responder.** Objeção: custo. Gatilho: We Defy, One Pass, o head
  instructor é veterano.

## 3. /memory (criar na F0)

- `memory/briefing.md` — dados do cliente (Seção 10.0), pendências (Seção 20).
- `memory/design-decisions.md` — desvios e perguntas (stack Vite, fontes self-hosted, `.js` gating, e
  qualquer dúvida de paridade).
- `memory/claude-code-rules.md` — a regra 0.12 resumida em 10 linhas, para reler a cada fase.
- No fim: `memory/entrega.md` (Seção 21).

## 4. ARQUITETURA

```
gonzales-jiu-jitsu-rio-rancho-nm\          ← raiz do projeto (já existe; criar se não existir)
├─ site-prototipo\                          ← FONTE DA VERDADE · somente leitura
│  ├─ index.html about.html programs.html schedule.html contact.html   (páginas montadas, abrem no navegador)
│  ├─ img\                                  ← todas as imagens e o vídeo
│  ├─ _src\  css\01…09  js\*.js  html\*.html  head.html   ← o mesmo protótipo, fatiado para o port
│  └─ _tools\ parity.mjs  textdiff.mjs
├─ lp-prototipo\                            ← antigo, ignorar (não importar, não copiar)
├─ prd-GJJ-001.md · prompt-claude-code-GJJ.md
├─ memory\
├─ api\capi.ts                              ← copiado do fight-sports
├─ public\img\                              ← = site-prototipo\img (mesmos nomes) · robots.txt · sitemap.xml · og.jpg
├─ scripts\prerender.mjs                    ← copiado do fight-sports, rotas do Gonzales
├─ index.html                               ← head base + bloco nd:tracking (como no fight-sports)
├─ vercel.json · vite.config.ts · tsconfig*.json · package.json · .gitignore
└─ src\
   ├─ main.tsx · entry-server.tsx · App.tsx           (rotas: / /about /programs /schedule /contact + 404)
   ├─ styles\index.css · prototype\01…09-*.css        (cópia byte a byte, ver 0.12-B)
   ├─ content\ shared.ts home.ts about.ts programs.ts schedule.ts contact.ts   (todo o texto)
   ├─ data\ schedule.ts (SLOTS, TIMES, DAYS) · reviews.ts · faq.ts · site.ts (endereço, telefone, e-mail, IG, mapas)
   ├─ motion\ core.ts (Lenis, ScrollTrigger, LIVE, motion, fine) · useReveals.ts · useMagnetic.ts · useTilt.ts · refresh.ts · time.ts (toMin, nowDenver, FULL, progOf, kOf, shortName, slotsOf)
   ├─ components\
   │  ├─ layout\ Nav.tsx MobileMenu.tsx Footer.tsx MobileBar.tsx BookingModal.tsx IconSprite.tsx Page.tsx
   │  ├─ shared\ PageHero.tsx Board.tsx Faq.tsx Cta.tsx
   │  ├─ home\ Hero.tsx Gate.tsx Zoom.tsx Wall.tsx Kids.tsx Champion.tsx Served.tsx ReviewsIntro.tsx Reviews.tsx Steps.tsx
   │  ├─ about\ Crest.tsx Founders.tsx Room.tsx
   │  ├─ programs\ Ages.tsx MiniWeek.tsx
   │  ├─ schedule\ Today.tsx
   │  └─ contact\ Ticket.tsx Visit.tsx
   ├─ pages\ Home.tsx About.tsx Programs.tsx Schedule.tsx Contact.tsx NotFound.tsx
   └─ nd\                                    ← kit Novo Dash copiado do fight-sports; só client.ts muda
```

**Ciclo de vida do motion (importante para a paridade):**
- `motion/core.ts` cria **uma** instância do Lenis (lerp 0.085, só `pointer: fine` e sem reduced-motion,
  ligado ao `ScrollTrigger.update` e ao `gsap.ticker`, `lagSmoothing(0)`), exatamente como `core.js`.
- Cada seção registra seus ScrollTriggers no próprio `useLayoutEffect` dentro de `gsap.context`.
- `Page.tsx` envolve cada página; o `useLayoutEffect` dele roda **depois** dos filhos e executa o
  bloco de `refresh.js` (refreshPriority pela ordem no DOM → `ScrollTrigger.sort()` → `refresh()`),
  liga `useReveals` (IntersectionObserver de `.d`, `.rv`, `.scard`) e o `refresh` no `load`.
- Troca de rota: `ctx.revert()` em todas as seções, `ScrollTrigger.getAll().forEach(t => t.kill())`,
  `lenis.scrollTo(0, { immediate: true })`, e o nav sai do estado `is-hidden`.
- Reduced-motion e o modo não-LIVE (< 1024px ou < 620px de altura) fazem exatamente o que o protótipo faz.

## 5. UX MODE: CLIENT

Formulários reais (lead + agendamento pelo kit `nd`), tracking real, schedule publicado em texto.
Data-book: em qualquer página abre o `BookingModal`; **na /contact** rola até o ticket e marca o
programa (comportamento do protótipo, `pages.js` bloco CONTACT). No mobile o menu fecha antes.

## 6. JORNADA MENTAL (ordem das seções — vence divergências)

**/ (home)** — Hero (arco que abre + Competition/Family/Community) → Gate I *Family* → Zoom "One mat.
Every age." → Programs "Three mats. One family." (walk horizontal) → For parents "What they come home
with." → Gate II *Competition* → Head instructor (passaporte) "Two world titles. Twenty years of service."
→ Gate III *Community* (branco) → Served "Served? Train on us." → Reviews intro "Trusted by the families
of Rio Rancho." (órbitas) → Reviews "Why they train here." (carrossel 3D) → First class "Walk in. Four
steps." (cards + faixa branca) → Schedule "Six days. After school, after work." → FAQ "Before you step on
the mat." → Footer (CTA + card + faixa de vídeo).

**/about** — PageHero "Built by a family. Run like one." → Crest "Three words on the crest." → Founders
"Same name tape. Same mat." → Room "The room, on any given night." → Footer.

**/programs** — PageHero "Start where your age puts you." → Ages (régua sticky + Toddlers / Kids / Adults) → Footer.

**/schedule** — PageHero "The week, class by class." → Board "Tap a class to book it." → Today + "Good to know." → Footer.

**/contact** — PageHero curto "Come see the mat." → Ticket "Your pass to the mat." → Visit "Hwy 528, north
of Intel." → FAQ → Footer.

## 7. LAYOUT

Tudo já está no CSS (shell 1320px, gutters `--gl/--gr`, `.screen` com 100svh no desktop, ritmo dos
`clamp()`). Não recalcular. Regras do cliente que o protótipo cumpre e o build tem que manter:
cada seção cabe em 100vh no desktop; títulos em no máximo 2 linhas; nenhuma palavra sozinha na última
linha; tela nunca vazia durante o scroll (testar rolando devagar em 1440 e 390).

## 8. DIREÇÃO DE ARTE (registro do que foi aprovado — não é para redesenhar)

- **Tese:** uma academia de família no deserto do Novo México, em preto e branco, contada em três atos
  (as três palavras do brasão). A porta de adobe (arco) é o objeto-sistema: abre a hero, abre os gates,
  abre os heros das páginas internas.
- **Paleta:** `--ink #111110`, `--paper #fbfaf7`, `--paper-2 #f3f1ec`, `--white`, linhas `#e4e1da/#cfcbc2`,
  `--muted #6a6660`, **`--red #d7222c` só em botões e marcadores**. Fotos sempre `grayscale(1)`.
- **Tipografia:** Manrope 400–800 (texto e títulos) + Fraunces itálico com `opsz`/`SOFT` (palavra de ênfase
  nos títulos, números, citações).
- **Signature moments:** a porta que abre (hero + gates); o passaporte carimbado do Abie; a tarja
  "GONZALES" costurada; a régua de crescimento; o ingresso com canhoto carimbado.
- **8.9 Componentes próprios** (todos já desenhados no CSS; estados incluídos): `.cta` (pill vermelho com
  círculo de seta duplo, magnético, pulse), `.ghost`, `.pill` (nav, preenchimento circular no hover,
  `aria-current` preto), `.rnd`, `.qa` (FAQ, aba lateral no hover, aberto = preto), `.slot` (board),
  `.mweek__s`, `.tk__opts`/`.tk__days` (rádios), `.reach__copy`, `.wdoor`, `.kc`, `.step`, `.rcard`,
  `.fcard`, `.tape`, `.pass`, `.ticket`, `.clock`, `.menu`. Ícones: sprite `IconSprite.tsx` = `_src/html/icons.svg.html`.

## 9. TIPOGRAFIA

Escala e line-heights já definidos no CSS (`.t-1`, `.t-2`, `.label`, `.act`, `.sub`, `.micro`). Única
mudança: self-hosting (0.12-B). Conferir no build que Fraunces está com `opsz` e `SOFT` ativos (o itálico
das ênfases muda visivelmente sem eles; o `parity.mjs` acusa).

## 10. SEÇÃO POR SEÇÃO + src/data

### 10.0 Dados do cliente (para `briefing.md` e `data/site.ts`)
Gonzales Jiu-Jitsu · 1630 Rio Rancho Blvd SE, Ste D, Rio Rancho, NM 87124 · Hwy 528, north of Intel ·
505-414-8083 (`tel:+15054148083`) · abie3737@gmail.com · instagram.com/gonzalesjiujitsu · site atual
gonzalesjj.com · Abie Gonzales (black belt, head instructor, 2× IBJJF No-Gi World Champion, 20 anos de
U.S. Army, 3 tours no Iraque, Bronze Star, wrestling e MMA) · Laura Gonzales (co-owner, coach, ex-soldado,
instrutora de Army Combatives; citação da KRQE) · Coach Brandon · 3 filhos treinam · coaches IBJJF
certified · We Defy Foundation (bolsas para veteranos) · One Pass (plano do City Government) · Free trial
class · monthly sign-up specials · 17 aulas/semana, domingo fechado.

### 10.1 Como portar (para todas as seções)
- **Texto:** copiar o texto do HTML do protótipo para `src/content/<página>.ts` (estrutura livre, ex.
  `export const hero = { label, h1: [linha1, { em }], sub, cta, micro: [...] }`). Os `<em>` dos títulos
  são parte do conteúdo.
- **Dados:** `data/schedule.ts`, `data/reviews.ts`, `data/faq.ts` = `_src/js/data.js` (mesma ordem,
  mesmo texto, tipados). As reviews são reais e **verbatim** (inclusive "better then yesterday").
- **Markup:** do arquivo e do comentário indicados abaixo. **Motion:** do bloco indicado.

### 10.2 Mapa protótipo → componente

| Página · seção | Componente | Markup (`_src/html/`) | Motion (`_src/js/`) | CSS (`_src/css/`) |
|---|---|---|---|---|
| Todas · nav + menu mobile | `Nav`, `MobileMenu` | `nav.html` | `core.js` (nav hide, menu) | 04, 09 (SITE) |
| Todas · footer | `Footer` | `footer.html` | `core.js` bloco FOOTER | 05 (CLOSE + FOOTER) |
| Todas · barra mobile, modal, ícones | `MobileBar`, `BookingModal`, `IconSprite` | corpo de cada página, `modal.html`, `icons.svg.html` | `core.js` (modal) | 07, 08 |
| Todas · botões magnéticos, tilt, reveals | hooks | — | `core.js` (magnetic, tilt, IO) | 01, 02 |
| Home · Hero | `Hero` | `home.body.html` HERO | `home.js` HERO | 05 HERO |
| Home · Gates I/II/III | `Gate` (props from/to/ink/act/word/line, `gate--light` no III) | GATE → ACT … | `home.js` GATES | 05 GATES |
| Home · Zoom | `Zoom` | ACT I · ZOOM | `home.js` ZOOM | 05 ZOOM |
| Home · Programs (wall) | `Wall` | ACT I · THE WALL | `home.js` WALL (medição única por refresh) | 05 WALL |
| Home · For parents | `Kids` | ACT I · WHAT THEY COME HOME WITH | `home.js` bloco dos 4 desenhos | 05 (ACT I · WHAT THEY…) |
| Home · Head instructor | `Champion` | ACT II · THE CHAMPION (passaporte) | `home.js` CHAMPION | 05 ACT II |
| Home · Served | `Served` | ACT III · SERVED | `home.js` SERVED | 05 SERVED |
| Home · Reviews intro | `ReviewsIntro` | ACT III · REVIEWS INTRO | `home.js` REVIEWS INTRO (elipses calculadas no JS) | 05 REVIEWS INTRO |
| Home · Reviews | `Reviews` | ACT III · REVIEWS | `home.js` REVIEWS (curva 3D, autoplay 6s, drag) | 05 REVIEWS |
| Home · First class | `Steps` | ACT III · YOUR FIRST CLASS | `home.js` FIRST CLASS (faixa branca → cards pretos) | 05 FIRST CLASS |
| Home/Schedule · Board | `Board` | ACT III · SCHEDULE | `sched.js` | 06 |
| Home/Contact · FAQ | `Faq` | FAQ | `faq.js` | 05 FAQ |
| Internas · PageHero | `PageHero` (props: crumb, h1, lead, cta, micro, img, short) | topo de cada `*.body.html` | `pages.js` PAGE HERO | 09 PAGE HERO |
| About · Crest | `Crest` | `about.body.html` THE CREST | `pages.js` CREST | 09 |
| About · Founders | `Founders` | THE FOUNDERS | `pages.js` FOUNDERS (tarja + costura) | 09 |
| About · Room | `Room` | THE ROOM | `pages.js` ROOM (duplica a fileira; alts vazios na cópia) | 09 |
| Programs · Ages | `Ages` + `MiniWeek` | `programs.body.html` THE PROGRAMS | `pages.js` THE WEEK OF EACH PROGRAM + GROWTH CHART | 09 PROGRAMS |
| Schedule · Today | `Today` | `schedule.body.html` TODAY | `pages.js` SCHEDULE · TODAY (fuso America/Denver, a cada 30 s) | 09 SCHEDULE |
| Contact · Ticket | `Ticket` | `contact.body.html` THE PASS | `pages.js` CONTACT · THE PASS | 09 CONTACT |
| Contact · Visit | `Visit` | VISIT | `pages.js` CONTACT · VISIT | 09 VISIT |

### 10.3 Títulos e descrições por página (head)
| Rota | `<title>` | meta description |
|---|---|---|
| `/` | Gonzales Jiu-Jitsu \| Kids & Adult Jiu-Jitsu in Rio Rancho, NM \| Free Trial Class | Toddlers, kids and adult Brazilian Jiu-Jitsu in Rio Rancho, NM, run by two-time IBJJF No-Gi World Champion Abie Gonzales and his family. Your first class is free. Call 505-414-8083. |
| `/about` | About \| Gonzales Jiu-Jitsu, Rio Rancho NM | A family academy in Rio Rancho, NM: founded in 2024 by Abie and Laura Gonzales, two U.S. Army veterans. Competition, Family, Community. |
| `/programs` | Programs \| Toddlers, Kids & Adult Jiu-Jitsu \| Gonzales Jiu-Jitsu | Toddlers 4–5, Kids 6–13 and Adults from Fundamentals to Advanced. Gi and No-Gi, six days a week in Rio Rancho, NM. First class free. |
| `/schedule` | Class Schedule \| Gonzales Jiu-Jitsu, Rio Rancho NM | Weekly Brazilian Jiu-Jitsu schedule: Toddlers, Kids, Adult Fundamentals, All Levels, Advanced and Open Mat, Monday to Saturday. |
| `/contact` | Contact & Free Class \| Gonzales Jiu-Jitsu, Rio Rancho NM | 1630 Rio Rancho Blvd SE, Ste D, Rio Rancho, NM. Call 505-414-8083 or book your free class online. |

### 10.4 Links
`index.html` → `/`, `about.html` → `/about`, `programs.html` → `/programs`, `schedule.html` →
`/schedule`, `contact.html` → `/contact`. Âncoras (`#act1`, `#schedule`, `#start`…) iguais. Links
internos com `<Link>` do router; o resultado no DOM continua sendo `<a href>` com as mesmas classes.

## 11. FORMULÁRIO (visual do protótipo, envio do kit `nd`)

Os dois formulários **mantêm exatamente o visual e os campos do protótipo**; só ganham envio real.

- **Kit:** copiar `fight-sports-cyborg-miami-fl\src\nd\` inteiro. Trocar só `client.ts` pelos dados do
  Gonzales (academy, `ghl.locationId`, `ghl.leadWebhookUuid`, `tracking.*`, `source: "Website - Gonzales"`)
  — **todos [CONFIRMAR]** com o Arthur / app Novo Dash. Não usar o `BookingForm` visual do kit; usar
  `sendLead`, `sendBooking`, `fetchPrograms`, `getAttribution` (UTMs), `fbTrack`, `gaTrack`, `adsConversion`.
- **BookingModal** (programa, nome, telefone): ao enviar → validação (nome ≥ 2 letras, telefone EUA com
  10 dígitos), `sendLead(...)` com `preferredAudience` do programa e e-mail vazio, `fbTrack('Lead')`,
  `gaTrack('generate_lead', { form: 'modal' })`, conversão de lead do Ads. Texto de sucesso do protótipo:
  botão vira "Sent — talk soon".
- **Ticket** (programa, dia/horário, nome, telefone): mesma validação e mensagens do protótipo
  ("Pick a program and a day.", "Sent. We'll call you to confirm.", carimbo "Booked"). Envia `sendLead`;
  se `fetchPrograms()` devolver um programa do público escolhido com aula naquele dia/horário, calcula a
  próxima data em America/Denver e envia `sendBooking` + `fbTrack('Schedule')` + conversão de agendamento.
  Sem match → só lead (o webhook nunca bloqueia a pessoa).
- **Anti-spam:** honeypot invisível (fora do fluxo visual, `aria-hidden`, `tabindex=-1`) + 1 envio a cada
  30 s por aba. **E-mail não é pedido** no protótipo: não acrescentar campo; se o fluxo do GHL exigir,
  registrar em `design-decisions.md` como pergunta [CONFIRMAR].

## 12. ACESSIBILIDADE (WCAG AA, sem mudar o visual)

Skip link "Skip to content" escondido até o foco · landmarks (`header`, `main`, `nav`, `footer`) · um H1
por página (já é assim) · foco visível (o CSS já tem `:focus-visible` preto) · modal e menu com foco preso,
`Esc` fecha (já no core) e `inert` no resto · accordion do FAQ com `aria-expanded`/`aria-controls` e
resposta fechada `inert` · carrossel de reviews: `aria-roledescription="carousel"`, cards fora de vista
com `aria-hidden` + `inert`, autoplay parado com reduced-motion e ao focar · `alt` já escritos no
protótipo, manter · alvos ≥ 44px (exceto os chips listados em 0.12-G).

## 13. GLASSMORPHISM

Já no CSS: barra do nav (`backdrop-filter: blur(10px)`), card do footer (`blur(18px)`), pills de idade
dos cards de programa. Acrescentar só o fallback `@supports not (backdrop-filter: blur(1px))` com fundo
opaco equivalente (invisível onde há suporte).

## 14. ANIMAÇÕES

GSAP 3 + ScrollTrigger + Lenis 1.1.18, exatamente como o protótipo (ver 0.12-D e Seção 4). `LIVE =
'(min-width:1024px) and (min-height:620px)'`. Pins só no LIVE. Reduced-motion: Lenis desligado,
animações de entrada instantâneas, tudo visível. Sem SplitText, sem `motion`/Framer.

## 15. PERFORMANCE + IMAGENS

- `public/img/` = `site-prototipo/img/` (mesmos nomes): abie, adults, drill, kids, toddlers, roll, women,
  hero, laura (webp) · face-1…8 · g-01…g-14 (fotos do Google, 243px de largura — **não ampliar**) ·
  flag, fold (Unsplash: Tim Mossholder, Dottie Di Liddo) · cut-boots, cut-fire (Unsplash, recortados) ·
  logo-ink.png, logo-white.png · footer.mp4 (1280px, 480 KB) + footer-poster.webp.
- `srcset` com larguras geradas por `sharp` **somente** se o tamanho renderizado e o recorte forem os
  mesmos. Hero da home e heros internos com `fetchpriority="high"`; o resto `loading="lazy"`.
- Vídeo: `preload="metadata"`, play só quando o footer entra (já no core).
- Meta: Lighthouse mobile ≥ 90 em performance; se algo exigir mudar o visual, a paridade vence e você registra.

## 16. SEGURANÇA

`vercel.json` com os headers e a CSP do fight-sports, ajustando: `connect-src` para
`n8n.novodash.com`, `services.leadconnectorhq.com`, `clients.novodash.com`, Meta, Google Analytics/Ads,
Clarity; `frame-src https://www.google.com` (mapa do /contact); `media-src 'self'`. Rewrites das 5 rotas
para os HTML prerenderizados. `.env*` no `.gitignore`. Antes de entregar: `grep -ri "CONFIRMAR" src/`
tem que dar zero (pendência fica no `briefing.md`, nunca no código publicado).

## 17. MICROCOPY

Exatamente a do protótipo (botões "Book your free class", "Free class", "Book my free class", "Book a
toddler/kids/adult class", "Book this class", "See the board", "Read the reviews", "Get directions",
"Copy"/"Copied"; mensagens do ticket e do modal; placeholders "Your name", "Phone"). Nada de
"Submit"/"Learn more".

## 18. TRACKING (via kit `nd`, IDs em `client.ts`)

PageView (base, em cada troca de rota) · `fbTrack('ViewContent', { content_name: rota })` por página ·
`gaTrack('cta_click', { location })` em todo `[data-book]` · `gaTrack('click_to_call')` em todo
`tel:` · `scroll_depth` 25/50/75/100 por página · `Lead` e `Schedule` (Seção 11) · CAPI por
`api/capi.ts` com o mesmo `event_id` · Clarity. UTMs e `fbclid/gclid` pelo `attribution.ts` do kit.

## 19. SEO / SCHEMA

- JSON-LD `SportsActivityLocation` (+ `LocalBusiness`) no `/`: name, address, telephone, url, sameAs
  (Instagram), `geo` [CONFIRMAR], `openingHoursSpecification` [CONFIRMAR, ver Seção 20]. `BreadcrumbList`
  nas 4 internas (já têm o breadcrumb visível). `FAQPage` só no `/` (o FAQ do /contact é o mesmo).
- Canonical por rota, OG/Twitter (imagem `public/og.jpg` 1200×630 recortada de `hero.webp`, P&B, com
  `logo-white.png`), `sitemap.xml` com as 5 rotas, `robots.txt`. Domínio final [CONFIRMAR].

## 20. DADOS PENDENTES

| Item | Status | Responsável | Impacto |
|---|---|---|---|
| IDs GHL (`locationId`, `leadWebhookUuid`), Pixel, GA4, Ads (+labels), Clarity | 🔴 | Arthur / app Novo Dash | formulários e tracking não enviam sem eles |
| Domínio final e projeto Vercel (substitui gonzalesjj.com?) | 🔴 | Arthur | canonical, sitemap, OG, deploy |
| Idade dos Toddlers: site/briefing dizem 4–5, resposta da academia no Google diz 3–5 | 🟡 | cliente | manter 4–5 até confirmar |
| Horário da recepção: footer diz Mon–Fri 4:30–8:30 PM / Sat 9–11 AM, mas há aulas às 11 AM ter/qui | 🟡 | cliente | texto do footer e `openingHours` do schema |
| Fotos originais do Google Business (as atuais têm 243px) | 🟡 | Arthur | hoje só usadas pequenas; nada a mudar no port |
| "Rio Rancho · Albuquerque · Corrales" (área atendida no footer) | 🟡 | cliente | manter o texto; confirmar |
| Publicar o e-mail pessoal abie3737@gmail.com | 🟡 | cliente | manter até resposta |
| Nome completo / função do Coach Brandon | 🟢 opcional | cliente | hoje só "Coach Brandon" |
| Coordenadas para o schema | 🟢 | Claude Code (Google Maps do endereço) | schema |

## 21. CHECKLIST

**Pré:** pasta criada · protótipo aberto no navegador (as 5 páginas) · `_src` e `_tools` lidos ·
`memory/` criada · `package.json` base copiado do fight-sports.
**Durante (por fase):** build sem erro de TS · zero erro de console · `parity.mjs --page <página>`
rodado ao fim de cada página.
**Pós (definição de pronto):**
- [ ] `parity.mjs` → **PARITY OK** (todos os estados ≤ 1,5%), relatório salvo em `parity/report.json`.
- [ ] `textdiff.mjs` → **COPY OK** nas 5 páginas, 1440 e 390.
- [ ] Rolar devagar cada página em 1440 e 390: nenhuma tela vazia, nenhum salto (atenção ao walk horizontal da home).
- [ ] Trocar de rota 10 vezes seguidas (nav e menu mobile): sem ScrollTrigger órfão, sem pin quebrado, volta ao topo.
- [ ] Modal e ticket enviam lead (ver no n8n/GHL com os IDs reais) e mostram o estado de sucesso.
- [ ] Eventos no Meta Events Manager / GA4 DebugView.
- [ ] Lighthouse mobile das 5 rotas anotado.
- [ ] `grep -ri "CONFIRMAR" src/` = 0 · sem código morto · `lp-prototipo` não referenciado em lugar nenhum.
- [ ] Rodar a skill **finalizador-de-pagina** (ETAPA 3) **sem** mudar nada visível.
- [ ] `memory/entrega.md`: o que foi feito, saída dos dois scripts, prints de cada página (1440 e 390),
  Lighthouse, pendências da Seção 20 ainda abertas, e cada linha de `design-decisions.md`.

## 22. TIMELINE

| Dia | Fase | Entrega |
|---|---|---|
| D1 | F0 + F1 | pasta, leitura do protótipo, `memory/`, projeto Vite, CSS 01–09 importado, fontes, `data/`, `content/` vazio estruturado, motion core |
| D2 | F2 + F3 (parte 1) | Nav, MobileMenu, Footer, MobileBar, Modal, Page; home até o Programs (hero, gates, zoom, wall) com paridade |
| D3 | F3 (parte 2) | home inteira com `parity.mjs --page home` OK |
| D4 | F4 | about, programs, schedule, contact com paridade |
| D5 | F5 | kit `nd`, formulários, tracking, SEO, schema, vercel.json, prerender |
| D6 | F6 | paridade completa, textdiff, finalizador, `entrega.md` |

## 23. CORREÇÕES FEITAS NA EXECUÇÃO (02/11/2026)

- **Mapa do /contact**: o `src` do protótipo (`maps?q=…&output=embed`) hoje responde 301 + `X-Frame-Options` e o quadro sai em branco. Usar `https://www.google.com/maps/embed?origin=mfe&pb=…` (o destino do redirect). Vale para toda LP da casa.
- **Prévia sem domínio**: até `VITE_SITE_URL` existir, o build é prévia `noindex` (robots.txt `Disallow`), com canonical na URL da Vercel. Com o domínio, um rebuild vira tudo para `index`.
- **Hidratação**: com prerender + `createRoot` o React recria o DOM, a foto do hero vira um novo candidato a LCP e os reveals da primeira tela recomeçam. O port usa `hydrateRoot`, e tudo que lê o relógio entra depois da montagem (`useNow`).
- **Fonte**: o arquivo `full-italic` da Fraunces tem 147 KB; com o peso fixado em 400 (o único usado) ele cai para 69 KB, com `opsz` e `SOFT` intactos.
- **`@import` depois de `@font-face` é descartado** em silêncio (o CSS do protótipo sumiu do bundle num teste): todo `@font-face` próprio vai no fim de `src/styles/index.css`.
