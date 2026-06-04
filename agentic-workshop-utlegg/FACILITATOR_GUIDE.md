# Fasilitatorguide — 2 timer, 5–10 deltakere (prosess-utgave)

Mål: øve på den agentiske **prosessen** — dekomponere features, instruere
presist, bruke skills og subagents, og verifisere at leveransen faktisk har
ønsket verdi og er konsistent med kodebasen.

Hvorfor denne utgaven: en enkelt liten oppgave med pre-skrevne tester blir
one-shottet på minutter. Her er oppgavene større, tvetydige på produktnivå, og
verdien ligger i hvordan man driver agenten — ikke i råkapasitet.

## Før workshopen (gjør dagen før!)
- Tørrkjør i en fersk Codespace: `claude` (innlogging), `npm run dev`,
  `npm test` (referansefeaturen skal være grønn).
- Verifiser at Claude Code ser skillet og subagentene: i en `claude`-sesjon,
  prøv `/agents` (skal liste `code-reviewer` og `acceptance-checker`) og be den
  bruke `feature-slice`-skillet på en backlog-feature. Juster beskrivelsene i
  frontmatter hvis routing er treg.
- Bestem hvordan deltakerne autentiserer Claude Code (egen konto vs. felles
  `ANTHROPIC_API_KEY`).

## Kjøreplan

**0:00–0:10 — Velkommen + oppsett**
Mål på 2 min. Alle åpner Codespace, kjører `claude`, `npm run dev`, `npm test`
(grønt). Pek på `CLAUDE.md`, `BACKLOG.md`, skillet og subagentene.

**0:10–0:30 — Ramme + kontrast-demo (det viktigste du gjør)**
Tegn pipelinen: spec → plan → implementer → tester → verifiser → review → commit.
Vis så kontrasten live på Feature B (godkjenningsflyt):
1. **Naiv** prompt: «legg til godkjenning av utlegg». La agenten levere. Pek på
   hva som glapp: den fant opp produktreglene selv (kan godkjenne egne?), brøt
   API-konvensjonen, eller skrev grunne tester. Det «virker», men er ikke det du
   ba om.
2. **Med prosess**: be agenten bruke `feature-slice`, ta produktbeslutningene
   eksplisitt, og kjør `code-reviewer` + `acceptance-checker` etterpå. Vis at
   subagentene fanger konvensjonsbrudd og svake tester.
Landingen: ved reell scope er prosess og verktøy forskjellen, ikke flaks i prompt.

**0:30–0:35 — Fordel arbeidet**
Hver velger en feature fra backloggen. A/B er gode startpunkt; C er
verifiseringsfella; D er fin for subagent-bruk; E for edge-cases. Pek på `OPPGAVE.md`.

**0:35–1:40 — Hands-on (65 min)**
Deltakerne driver featuren gjennom pipelinen. Du sirkulerer. Se etter:
- Folk som hopper rett til kode → minn på spec/plan-stegene og produktbeslutningene.
- Folk som lar agenten gjette tvetydige regler → få dem til å bestemme og skrive ned.
- Folk som stopper på grønne tester → be dem kjøre `acceptance-checker`.
- Folk som skriver kode selv → de skal instruere, ikke taste.
Ca. 1:05: kort temperaturmåling; løft én god produktbeslutning og ett godt prompt.

**1:40–1:50 — Show-and-tell**
2–3 deltakere viser: hvilken tvetydighet de måtte avgjøre, og hva
`code-reviewer`/`acceptance-checker` fanget. Fokus på prosess og verifisering.

**1:50–2:00 — Debrief**
- Hvor tok du en produktbeslutning agenten ellers ville gjettet på?
- Hvor lurte «ser ferdig ut» deg — og hva avslørte det?
- Én ting du tar med til ekte arbeid (CLAUDE.md, et skill, en review-subagent).

## Skru vanskelighetsgrad
- **Mindre tid / blandet nivå:** alle gjør Feature A eller B, full pipeline.
- **Sterke deltakere:** Feature C/D/E, og strekk-oppgaven (forbedre skillet eller
  skrive en ny subagent) — da bygger de verktøy, ikke bare bruker dem.

## Tips
- Be alle committe per feature, så det er lett å rulle tilbake en agent-runde.
- Et grønt testpanel + synlig kriterieliste foran i rommet holder fokus på «ferdig».
- Ikke redd folk med ferdig kode — la dem løse det via instruksjon og verktøy.
