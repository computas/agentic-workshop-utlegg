# Agentisk workshop – Utlegg (prosess-utgave)

Et lite full-stack TypeScript-prosjekt (React + Express) for å øve på den
agentiske **prosessen**: dekomponere features, instruere presist, bruke skills
og subagents, og verifisere at leveransen har ønsket verdi og er konsistent med
kodebasen.

Prosjektet har én ferdig **referansefeature** («Registrer utlegg»). Deltakerne
bygger nye features fra `BACKLOG.md` ved å drive agenten gjennom en definert
pipeline — ikke ved å taste kode selv.

## Kom i gang

### Alternativ A – GitHub Codespaces (anbefalt)
1. Push dette repoet til GitHub.
2. **Code → Codespaces → Create codespace** (installerer alt, inkl. Claude Code).
3. Kjør `claude` i terminalen og logg inn.

### Alternativ B – Lokalt (Node.js 18+)
```bash
npm install
npm install -g @anthropic-ai/claude-code
claude
```

## Kjøre
```bash
npm run dev        # API (:3001) + web (:5173)
npm test           # alle tester — referansefeaturen skal være grønn
npm run test:watch
```

## Agentisk oppsett
- `CLAUDE.md` — prosjektets konvensjoner (alltid i kontekst).
- `.claude/skills/feature-slice/` — den repeterbare feature-prosessen.
- `.claude/agents/code-reviewer.md` — konvensjons-/sikkerhets-gjennomgang.
- `.claude/agents/acceptance-checker.md` — sjekker at testene faktisk dekker kriteriene.
- `BACKLOG.md` — features med akseptansekriterier og bevisste tvetydigheter.

## For workshopen
- `FACILITATOR_GUIDE.md` — kjøreplan og kontrast-demo.
- `OPPGAVE.md` — instruks til deltakerne.

## Referansefeature (mønsteret)
- `src/lib/validateExpense.ts` (+ `.test.ts`)
- `src/ExpenseForm.tsx` (+ `.test.tsx`)
- `POST/GET /api/expenses` i `server.ts`
