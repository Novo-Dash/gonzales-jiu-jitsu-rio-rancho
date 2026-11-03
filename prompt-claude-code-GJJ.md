# Prompt de abertura · Claude Code · Gonzales Jiu-Jitsu (GJJ-001)

Cole este texto no Claude Code junto com o `prd-GJJ-001.md`.

---

## 1. Onde e como

1. Crie a pasta do projeto (se já existir, use-a — ela já contém `site-prototipo\` e `lp-prototipo\`):
   ```
   mkdir "D:\DOCUMENTOS\NovoDash\gonzales-jiu-jitsu-rio-rancho-nm"
   cd "D:\DOCUMENTOS\NovoDash\gonzales-jiu-jitsu-rio-rancho-nm"
   claude --dangerously-skip-permissions
   ```
   O projeto é criado **na raiz dessa pasta** (como no `fight-sports-cyborg-miami-fl`). `site-prototipo\` e
   `lp-prototipo\` ficam onde estão e **não são editados**.
2. **Leia o `prd-GJJ-001.md` inteiro antes de qualquer código.** Depois abra as 5 páginas de
   `site-prototipo\` no navegador e role cada uma do começo ao fim, em 1440 e em 390. É esse site que você vai entregar.
3. Leia `site-prototipo\_src\` (o mesmo protótipo fatiado em CSS, JS e HTML por seção) e
   `site-prototipo\_tools\` (os dois scripts que decidem se está pronto).

## 2. O que o Adryan pediu, nas palavras dele, e onde o PRD cobre

**O pedido deste projeto**
- "faz o prd quero exatamente igual, pede até pra criar a pasta no documentos/novo dash" → **0.12 inteira** (port literal medido por script), **Seção 4** e item 1 acima (pasta).
- "preciso de um site" / "o nosso não tem muitos professores, tem mais o ABOUT, aí adapte" → **Seções 6 e 10** (5 rotas; About com brasão, fundadores e o room; sem página de instrutores).
- "e quero responsivo tudo" → **0.12-A** (paridade em 1440 **e** 390) e **Seção 21**.

**Nível e história (feedback que gerou o protótipo — não regredir)**
- "quero efeitos estilo motion, conduzindo uma história" → **Seção 8** (três atos, a porta de adobe) e **0.12-D** (motion bloco a bloco).
- "a seção não trava… parecendo template" → **0.4** (proibido reinterpretar) e **Seção 14**.
- "não posso deixar outro efeito de travar a tela" (first class) → **10.2** linha First class: sem pin.
- "após o efeito novamente não aparece conteúdo nenhum… vai acarretar em muitas saídas da página por achar que acabou ou bugou" → **Seção 7** (tela nunca vazia) e **Seção 21** (rolar devagar em 1440 e 390).
- "tira esse gap entre seções, ficam essas linhas e fica feio" → **0.12-A** (os gates trocam o fundo no fim; a paridade pega a linha).
- "efeito review não pode ter cortes" → **10.2** Reviews intro (elipses calculadas no JS, nenhuma foto cortada).
- "seção programs tá pulando, bugou o efeito" → **10.2** Wall (distância medida uma vez por refresh) e **Seção 21** (rolar devagar).

**Identidade**
- "P&B, só o botão deixa vermelho" → **0.7** e **Seção 8**.
- Cada componente novo por cliente, com analogia ao texto (porta, passaporte, tarja, régua, ingresso) → **8.9**.

**Regras fixas dele (valem para qualquer página)**
- "toda a informação de cada seção deve caber dentro de 100vh no desktop; títulos em no máximo 2 linhas" → **Seção 7**.
- Títulos sem palavra sozinha na última linha → **Seção 7**.
- "não tem dado, não insere" → **0.5**, **0.11** e **Seção 20**.
- Reviews sempre carrossel personalizado; schedule no padrão quadro de parede → **10.2** (Reviews, Board).
- Páginas com scroll suave → **Seção 4** (Lenis 1.1.18) e **Seção 14**.

Se algum pedido acima não estiver coberto pelo PRD, **o pedido vale** e você registra a lacuna em
`memory/design-decisions.md`.

## 3. Antes de entregar

Confira item por item da lista acima contra o build. O que faltar no PRD, **corrija no PRD**
(`prd-GJJ-001.md`) e anote em `design-decisions.md`.

## 4. Como trabalhar

- Fases F0 → F6 da Seção 22, declarando "Iniciando FASE X" / "FASE X concluída" com o resultado do teste.
- **F0 primeiro:** pasta, leitura, `memory/` (briefing, design-decisions, claude-code-rules).
- **Modo autônomo de port:** não há design pass nem `/v2`. Construa tudo até o fim sem parar. Só pare
  se faltar algo que bloqueie de verdade (ex.: IDs do GHL); nesse caso deixe o envio desligado com
  fallback silencioso, anote em `briefing.md` e siga.
- Ao terminar cada página: `node site-prototipo/_tools/parity.mjs --page <página>`. Diferença acima de
  1,5% = abrir o PNG lado a lado em `parity/`, achar a causa, corrigir **o build** (nunca o protótipo).
- Dado inexistente = `[… — CONFIRMAR]` no `briefing.md`, nunca no texto publicado.
- No fim: skill **finalizador-de-pagina** sem mudar nada visível, e `memory/entrega.md`.

## 5. Definição de pronto

`parity.mjs` diz **PARITY OK** e `textdiff.mjs` diz **COPY OK** nas cinco páginas, em 1440 e 390.
Os dois formulários enviam lead pelo kit `nd` e o tracking dispara, sem nenhum `CONFIRMAR` no código.
O `memory/entrega.md` mostra os prints, os relatórios e o que ainda depende do cliente.
