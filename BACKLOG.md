# Backlog — features å bygge

Hver feature er en user story med akseptansekriterier i prosa. Merk: kriteriene
lar med vilje noen ting stå åpne (markert «Du bestemmer»). En del av jobben er å
ta produktbeslutningen, skrive den ned, og verifisere at agenten gjorde det du
mente — ikke det den gjettet. Bygg hver feature med `feature-slice`-skillet.

---

## A — Liste og filtrer utlegg  *(oppvarming)*
Som bruker vil jeg se utleggene mine og filtrere dem, så jeg finner det jeg leter etter.

Akseptansekriterier:
- En liste viser registrerte utlegg (`GET /api/expenses` finnes allerede).
- Jeg kan filtrere på kategori og på datointervall.
- Tom liste viser en tydelig tom-tilstand.

Du bestemmer (og skriver ned): standard sortering? Er datogrensene inklusive?
Filtrerer vi i frontend eller i API-et?

---

## B — Godkjenningsflyt  *(kjerne)*
Som leder vil jeg godkjenne eller avvise innsendte utlegg.

Akseptansekriterier:
- Et utlegg har en status: `submitted`, `approved`, `rejected`.
- En leder kan godkjenne eller avvise et innsendt utlegg.
- Statusen vises i lista.

Du bestemmer (og skriver ned — dette er hele poenget):
- Kan man godkjenne sitt eget utlegg?
- Kreves en begrunnelse ved avvisning? Ved godkjenning?
- Hvilke statusoverganger er lov? Kan et avvist utlegg sendes inn på nytt?
- Hva skjer hvis noen prøver å godkjenne et allerede behandlet utlegg?

---

## C — Budsjettvarsel  *(verifiseringsfelle)*
Som bruker vil jeg varsles hvis jeg er i ferd med å overskride budsjettet mitt.

Akseptansekriterier:
- Ved innsending varsles brukeren hvis forbruket overstiger en grense (f.eks. 10 000 NOK).

Du bestemmer (og MÅ verifisere at agenten gjorde akkurat dette):
- «Forbruk» = inneværende kalendermåned, eller rullerende 30 dager?
- Skal varselet blokkere innsending, eller bare advare og tillate?
- Totalt forbruk, eller per kategori?

Merk: en naiv prompt får dette til å «virke», men kan velge en annen tolkning enn
din. Sjekk implementasjonen mot beslutningen din.

---

## D — Forespørselslogging med correlation ID  *(tverrgående — egnet for subagent)*
Som utvikler vil jeg ha sporbar logging på alle endepunkter.

Akseptansekriterier:
- Hver forespørsel får en correlation ID.
- Hvert endepunkt logger metode, sti, status og correlation ID i et konsistent format.
- Formatet er likt på tvers av alle endepunkter (også nye).

Du bestemmer: ID fra inn-header hvis den finnes, ellers generert? Returneres den i responsen?
Tips: dette er en god kandidat for å delegere konsistens-sjekken til `code-reviewer`.

---

## E — CSV-eksport  *(edge-cases og lokalisering)*
Som leder vil jeg eksportere (filtrerte) utlegg til CSV for regnskap.

Akseptansekriterier:
- Et endepunkt returnerer utleggene som CSV.
- Fila åpner riktig i Excel med norsk lokalisering.

Du bestemmer (og test edge-casene):
- Skilletegn: komma eller semikolon (nb-locale)? Desimaltegn?
- Hvordan håndteres beskrivelser med komma, anførselstegn eller linjeskift?
- Tegnkoding / BOM så æøå vises riktig i Excel?

---

## Strekk / meta — forbedre verktøyet selv
- Utvid `feature-slice`-skillet med et steg du savnet, eller
- skriv en ny subagent (f.eks. `test-author` eller `security-reviewer`), eller
- legg til ditt eget akseptansekriterium på en feature (skriv testen først),
  og instruer agenten til å oppfylle det.
Dette øver på å *definere* verdi, ikke bare oppfylle den.
