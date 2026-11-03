# site-prototipo · Gonzales Jiu-Jitsu (fonte da verdade do PRD GJJ-001)

- `index.html`, `about.html`, `programs.html`, `schedule.html`, `contact.html` — as 5 páginas aprovadas, prontas para abrir no navegador (imagens em `img/`).
- `_src/` — o mesmo protótipo fatiado para o port:
  - `css/01…09-*.css` — o CSS inteiro, na ordem. A concatenação é idêntica ao `<style>` das páginas.
  - `js/` — `data.js` (SLOTS, REVIEWS, FAQ) · `core.js` (Lenis, modal, menu, reveals, magnético, tilt, footer) · `home.js` (seções da home) · `pages.js` (páginas internas) · `sched.js` (board) · `faq.js` · `refresh.js` (ordem dos ScrollTriggers). Home = data+core+home+sched+faq+refresh; internas = data+core+pages+sched+faq+refresh.
  - `html/` — o corpo de cada página (`*.body.html`, com `{{NAV}}`, `{{FOOTER}}`, `{{MODAL}}`, `{{DEFS}}`), `nav.html`, `footer.html`, `modal.html`, `icons.svg.html`; `head.html` é o head comum.
- `_tools/parity.mjs` — compara protótipo × build pixel a pixel em 70+ estados (1440 e 390). `_tools/textdiff.mjs` — compara o texto visível.

Não editar nada aqui. Qualquer mudança de design volta para o Adryan.
