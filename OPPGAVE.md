# Oppgave: bygg features gjennom en agentisk prosess

Du jobber i et lite full-stack-prosjekt med én ferdig referansefeature
(«Registrer utlegg»). Jobben din er å bygge nye features fra `BACKLOG.md` — men
poenget er **ikke** å få noe til å virke raskest mulig. Poenget er å øve på
prosessen, verktøyene og verifiseringen som skiller «virker i en demo» fra
«produksjonsklart og konsistent med resten av kodebasen».

Du skal **drive agenten**, ikke taste koden selv.

## Hva du har til rådighet
- `CLAUDE.md` — konvensjonene featuren din må følge.
- `feature-slice`-skillet (`.claude/skills/feature-slice/`) — den repeterbare prosessen.
- Subagentene `code-reviewer` og `acceptance-checker` (`.claude/agents/`).
- `BACKLOG.md` — features med akseptansekriterier (og bevisste tvetydigheter).

## Slik gjør du
1. Velg en feature fra backloggen (start med A eller B; C/D/E er rikere).
2. Be Claude bruke `feature-slice`-skillet. Følg prosessen:
   spec → plan → implementer → tester → verifiser → review → commit.
3. **Ta produktbeslutningene** der historien er tvetydig. Skriv dem ned, og
   instruér agenten eksplisitt. Ikke la agenten gjette stille.
4. Etter implementasjon: kjør `code-reviewer` og `acceptance-checker`.
   Les funnene. Håndter dem.
5. Verifiser at featuren gjør det DU mente — ikke bare at testene er grønne.

## Det du faktisk trener på
- **Dekomponering**: gjøre en vag historie om til konkrete kriterier.
- **Instruksjon**: gi agenten kontekst, scope og konvensjoner.
- **Verktøybruk**: la skill + subagents bære prosessen, ikke ett langt prompt.
- **Verifisering**: oppdage når agenten tolket noe annerledes, brøt en
  konvensjon, eller skrev tester som passerer uten å teste kriteriet.

## Anti-mønstre å unngå
- «Bygg godkjenningsflyt» uten å ha bestemt reglene først.
- Godta diff og grønne tester uten å lese dem.
- La agenten velge stille på tvetydige produktregler.
- Hoppe over review-subagentene fordi «det ser jo ferdig ut».

## Definisjon av ferdig (per feature)
- [ ] Kriteriene er skrevet ned og tvetydigheter avklart av deg.
- [ ] Vertikal slice: validering + API + frontend + tester, etter konvensjonene.
- [ ] `npm test` grønt, og testene tester faktisk kriteriene.
- [ ] `code-reviewer` og `acceptance-checker` kjørt, funn håndtert.
- [ ] Du kan forklare hvilken produktbeslutning du tok og hvordan du verifiserte den.
