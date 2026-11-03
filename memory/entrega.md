# Entrega · GJJ-001 · Gonzales Jiu-Jitsu (02/11/2026)

## O que foi feito
Port literal de `site-prototipo/` (5 páginas) para React 19 + Vite + react-router + prerender, base do fight-sports, sem Tailwind.
- CSS 01–09 byte a byte em `src/styles/prototype/` (só os dois nomes de fonte trocados); acréscimos invisíveis em `additions.css`.
- DOM, ids, classes e SVG iguais; cada bloco de `_src/js` virou o efeito do componente da seção, com os mesmos números (mapa no PRD 10.2).
- Copy em `src/content/*.ts`, dados em `src/data/*.ts` (`grep -ri CONFIRMAR src/` = 0).
- Modal e ticket com envio real pelo kit `nd` (lead; o ticket também agenda quando o calendário do GHL tem a aula), honeypot e 1 envio a cada 30 s.
- Tracking: PageView por rota, ViewContent, `cta_click`, `click_to_call`, `scroll_depth`, Lead/Schedule com CAPI (`api/capi.ts`).
- SEO: head por rota (PRD 10.3), canonical, OG/Twitter com `public/og.jpg` (1200×630), JSON-LD (SportsActivityLocation + pessoas + FAQPage no `/` + BreadcrumbList nas internas), sitemap, robots com bots de IA, `llms.txt`, favicons.
- `vercel.json`: rotas, cache, CSP (Google Maps no frame-src), HSTS e demais headers.

## Prova de pronto
- `parity.mjs`: **PARITY OK**, 73 estados (5 páginas × 1440 e 390), maior diferença 0,44% (contact/390/visit). Relatório e PNGs lado a lado em `parity/` (`report.json`, `parity.txt`).
- `textdiff.mjs`: **COPY OK** nas 5 páginas, 1440 e 390 (`parity/textdiff.txt`).
- Overflow horizontal: zero em 15 viewports (320 a 3440), Chromium e WebKit, build e protótipo.
- 11 trocas de rota seguidas: volta ao topo, 6 pin-spacers na home (os do protótipo), nenhum órfão, zero erro de console.
- Modal: "Sent, talk soon". Ticket: stub preenchido, carimbo "Booked", "Sent. We'll call you to confirm." No /contact todo "book" rola até o ticket. Menu mobile fecha ao navegar.

## Lighthouse mobile (build local, prévia)
| Rota | Perf | A11y | BP | SEO* |
|---|---|---|---|---|
| / | 97 | 96 | 100 | 69 |
| /about | 95 | 95 | 100 | 69 |
| /programs | 99 | 100 | 100 | 69 |
| /schedule | 98 | 100 | 100 | 69 |
| /contact | 99 | 100 | 100 | 69 |
\*SEO 69 = `noindex` da prévia (sem domínio). Com `VITE_SITE_URL` o build vira `index`.
A11y 95–96: contraste dos números dos passos e das palavras apagadas do brasão (pergunta 1 em `design-decisions.md`).

## Ainda depende do cliente / da Novo Dash (briefing.md)
- 🔴 IDs do GHL (`locationId`, `leadWebhookUuid`), Pixel, GA4, Ads (+labels), Clarity → `src/nd/client.ts` e o bloco `nd:tracking` do `index.html`. Até lá os formulários mostram o sucesso e nada sai da página.
- 🔴 Domínio final e projeto Vercel → `VITE_SITE_URL` na Vercel e rebuild. `META_CAPI_ACCESS_TOKEN` só na Vercel.
- 🟡 Idade dos Toddlers (4–5 x 3–5), horário da recepção (e `openingHours` do schema, omitido até lá), área atendida, e-mail pessoal publicado, fotos originais do Google.
- Pós-deploy: Search Console + Bing Webmaster com o sitemap, Facebook Sharing Debugger no link, conferir o GBP.

## Decisões e perguntas
Todas em `memory/design-decisions.md` (stack, fontes, `.js`, srcset, vídeo e mapa, hidratação, CSS inline, e as 2 perguntas).

## Como rodar
`npm run build && npm run preview` (4173) · `npm run proto` (4100) · `npm run parity` · `npm run textdiff`.
Git: a pasta ainda não é repositório; nada foi commitado.
