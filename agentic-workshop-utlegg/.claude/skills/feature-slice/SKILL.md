---
name: feature-slice
description: Den repeterbare prosessen for å bygge en ny feature i dette utleggs-prosjektet som en komplett vertikal slice. Bruk dette ALLTID når oppgaven er å legge til, utvide eller endre en feature fra BACKLOG.md — også når brukeren bare beskriver ønsket oppførsel uten å nevne "feature" eller "skill".
---

# Feature-slice: slik bygger vi en feature her

Følg disse stegene i rekkefølge. Stopp og spør brukeren ved tvetydighet —
ikke gjett på produktregler.

## 1. Avklar kriteriene (før kode)
- Les feature-historien i `BACKLOG.md` og `CLAUDE.md`.
- Skriv ned akseptansekriteriene eksplisitt som en kort liste.
- Marker hver **tvetydighet** historien lar stå åpen, og spør brukeren om
  beslutningen (f.eks. kalendermåned vs. rullerende 30 dager, inklusive/
  eksklusive datogrenser, om en advarsel blokkerer eller bare varsler).
  Ikke velg stille på vegne av brukeren.

## 2. Foreslå en plan
- Hvilke filer endres/opprettes (validering i `src/lib`, API i `server.ts`,
  frontend, tester).
- Vis planen og vent på OK før du skriver kode.

## 3. Implementer som vertikal slice
- Valideringslogikk i en ren modul i `src/lib/`.
- API-endepunkt som følger API-konvensjonene i `CLAUDE.md` (201/400-form).
- Frontend som følger frontend-konvensjonene (`role="status"`/`"alert"`,
  disabled under sending, norsk tekst).
- Etterlign referansefeaturen «Registrer utlegg».

## 4. Skriv tester som speiler kriteriene
- Én test per akseptansekriterium, pluss de viktigste edge-casene.
- Testene skal kunne stryke om kriteriet brytes — ikke skriv tester som alltid
  passerer.

## 5. Verifiser
- Kjør `npm test` til grønt. Kjør `npm run dev` og prøv featuren manuelt.
- Bekreft mot kriterielisten fra steg 1, punkt for punkt.

## 6. Få det gjennomgått
- Be `code-reviewer`-subagenten se på diffen (konvensjoner, konsistens, sikkerhet).
- Be `acceptance-checker`-subagenten vurdere om testene faktisk dekker kriteriene.
- Håndter funn før du anser deg ferdig.

## 7. Commit
- Liten, beskrivende commit per feature, så det er lett å rulle tilbake.
