# Briefing · Gonzales Jiu-Jitsu (GJJ-001)

## Cliente (PRD 10.0)
- Gonzales Jiu-Jitsu · 1630 Rio Rancho Blvd SE, Ste D · Rio Rancho, NM 87124 · Hwy 528, north of Intel
- 505-414-8083 (`tel:+15054148083`) · abie3737@gmail.com · instagram.com/gonzalesjiujitsu · site atual gonzalesjj.com
- Abie Gonzales: black belt, head instructor, 2x IBJJF No-Gi World Champion, 20 anos U.S. Army, 3 tours no Iraque, Bronze Star, wrestling e MMA
- Laura Gonzales: co-owner, coach, ex-soldado, instrutora de Army Combatives (citação KRQE)
- Coach Brandon · 3 filhos treinam · coaches IBJJF certified
- We Defy Foundation (bolsas para veteranos) · One Pass (plano do City Government)
- Free trial class · monthly sign-up specials · 17 aulas/semana, domingo fechado
- Aberta em 2024 por Abie e Laura (veteranos do Exército)

## Pendências [CONFIRMAR] (PRD 20) — nunca no código publicado
| Item | Status | Responsável |
|---|---|---|
| IDs GHL (`locationId`, `leadWebhookUuid`), Pixel, GA4, Ads (+labels), Clarity — `src/nd/client.ts` vazio: modal e ticket mostram o sucesso, mas nada é enviado (o kit não posta sem URL) | 🔴 | Arthur / app Novo Dash |
| Domínio final e projeto Vercel (substitui gonzalesjj.com?) — `VITE_SITE_URL`; até lá o build é prévia noindex | 🔴 | Arthur |
| Idade dos Toddlers: 4–5 (site/briefing) x 3–5 (resposta no Google) — manter 4–5 | 🟡 | cliente |
| Horário da recepção do footer (Mon–Fri 4:30–8:30 PM / Sat 9–11 AM) x aulas às 11 AM ter/qui — e o `openingHours` do schema | 🟡 | cliente |
| Fotos originais do Google Business (atuais 243px) | 🟡 | Arthur |
| Área atendida "Rio Rancho · Albuquerque · Corrales" | 🟡 | cliente |
| E-mail: o briefing de 03/11 dá team@gonzalesjiujitsu.org (já no site). O domínio gonzalesjiujitsu.org ainda é página "em construção" do Squarespace: confirmar que a caixa recebe | 🟡 | Arthur |
| Nome completo / função do Coach Brandon (o FAQ cita "Brandon Romero", Tito Valdez e Adriana Rascon) | 🟢 | cliente |
| Coordenadas do schema: 35.2323483, -106.6575717 (resultado do Google Maps para o endereço) — conferir no GBP | 🟢 resolvido | Claude Code |

## Levantado em 03/11 (site atual gonzalesjj.com + briefing do ClickUp)
- Time no site atual: Abie, Laura, Brandon Romero (bio longa), Tito Valdez e Adriana Rascon (faixa preta, sem bio). [CONFIRMAR: bio curta e foto com rosto de Tito e Adriana; as fotos de Tito e Brandon no site atual são recortes do quimono]
- Páginas do site atual: Home, Special Offers, Schedule, Students (Kicksite). O briefing pede "pelo menos isso". O site novo cobre ofertas dentro da home/contact e tem o link de alunos no footer; [CONFIRMAR com o Adryan se quer uma página /special-offers própria]
- Horário de funcionamento publicado: Mon/Tue 4:30–8 PM, Wed 4:30–8:30, Thu 5–8:30, Fri 5–8, Sat 9–11, Sun fechado (schema). O footer resume como "Mon – Fri 4:30 – 8:30 PM".
- Fotos: 45 do site atual baixadas em `brand/site-atual/` (fora do git). As 8 do Drive de AI Content (3 HEIC do quimono, 5 da academia) pedem login; baixar à mão para `brand/drive-ai-content/` se forem usar.
- "Elite Sports" aparece no footer do site atual sem link claro: [CONFIRMAR o que é]
