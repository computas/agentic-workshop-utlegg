# CLAUDE.md — konvensjoner for dette prosjektet

Dette er et lite full-stack TypeScript-prosjekt (React + Express) for å
registrere og behandle utlegg. Les dette før du implementerer noe.

## Kjør
- `npm run dev` — API på :3001, web på :5173
- `npm test` — kjører alle tester
- Test-watch: `npm run test:watch`

## Arkitektur
- Valideringslogikk bor i **rene moduler** i `src/lib/` og importeres av både
  API-et og frontend. Ingen valideringslogikk direkte i route-handlere eller
  React-komponenter.
- API-et i `server.ts` er tynt: det kaller en valideringsmodul, lagrer, svarer.
- Lager er in-memory (en array). Ikke innfør database uten at oppgaven ber om det.

## API-konvensjoner (følg referansefeaturen nøye)
- Suksess som oppretter noe: `201` med det opprettede objektet (inkl. `id`).
- Valideringsfeil: `400` med `{ "errors": { "<felt>": "<melding på norsk>" } }`.
- Ugyldig input skal **aldri** gi `500`. Valider før du gjør noe.
- Feltnavn i API matcher domenet: `description`, `amountNOK`, `date`, `category`.

## Frontend-konvensjoner
- Suksessmelding: element med `role="status"`.
- Feil: element med `role="alert"`.
- Knapper deaktiveres mens en forespørsel pågår.
- Klientvalidering hindrer innsending av åpenbart ugyldige skjema.
- UI-tekst er på norsk.

## Tester
- Vitest. Testfiler ligger ved siden av koden som `*.test.ts` / `*.test.tsx`.
- En test skal verifisere **oppførsel mot akseptansekriteriet**, ikke bare at
  koden kjører. Unngå tautologiske tester.
- Hver ny feature skal ha tester for både happy path og de viktigste edge-casene.

## Referansefeature (mønsteret du etterligner)
«Registrer utlegg» er ferdig implementert:
- `src/lib/validateExpense.ts` + `.test.ts`
- `src/ExpenseForm.tsx` + `.test.tsx`
- `POST/GET /api/expenses` i `server.ts`
Nye features skal se ut og oppføre seg som dette.

## Hvordan vi bygger en feature
Bruk skillen `feature-slice`. Etter
implementasjon: kjør subagentene `code-reviewer` og `acceptance-checker`.

## Definisjon av ferdig
- [ ] Akseptansekriteriene er skrevet ned og tvetydigheter avklart.
- [ ] Vertikal slice: validering (`src/lib`) + API + frontend + tester.
- [ ] `npm test` grønt; testene tester faktisk kriteriene.
- [ ] Konvensjonene over er fulgt (API-form, roller, norsk tekst).
- [ ] `code-reviewer` og `acceptance-checker` er kjørt og funn håndtert.
