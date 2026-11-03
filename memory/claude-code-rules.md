# Regra 0.12 em 10 linhas (reler a cada fase)
1. O protótipo (`site-prototipo/`) manda em tudo que é visível; depois o PRD; depois os hábitos da casa.
2. CSS 01…09 copiado byte a byte para `src/styles/prototype/`; nada de Tailwind, reset, normalize.
3. DOM igual: mesmas tags, classes, ids, aninhamento e SVG. O que o protótipo gera por innerHTML vira JSX que gera o mesmo HTML.
4. JS bloco a bloco: mesmos seletores (com escopo), números, eases, start/end, scrub, durações e matchMedia(LIVE).
5. Todo texto em `src/content/*.ts` e `src/data/*.ts`; nada de copy solta no TSX.
6. GSAP sempre em gsap.context(scope) + revert no unmount; ScrollTrigger morto ao trocar de rota.
7. Só mudanças invisíveis: a11y, SEO, perf, tracking, envio real, headers. O resto vira pergunta em design-decisions.md.
8. Dado que não existe = [CONFIRMAR] no briefing.md, nunca no texto publicado.
9. Pronto = parity.mjs PARITY OK (≤1,5%) + textdiff.mjs COPY OK em 1440 e 390.
10. Exceções aprovadas: orçamento de pin da home, fonte <12px em eyebrows/chips, gates aria-hidden.
