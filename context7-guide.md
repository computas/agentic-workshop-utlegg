# Dokumentasjons-MCP-er (Context7) for frontend i Claude Code

Denne kategorien er reell og nyttig, og den er ortogonal til nettleser-/verifiseringsløkken (`--chrome`). Context7 løser «skriver Claude mot riktig API og versjon», mens browser-løkken løser «funker resultatet faktisk». De to sammen er en sterk kombinasjon: Context7 inn, verifisering ut.

## Om Context7 spesifikt

Det er den mest brukte MCP-serveren akkurat nå — rangert som #1 på MCP.Directory og plassert i ThoughtWorks' Technology Radar «Trial»-ring (november 2025).

Mekanikken er todelt:

1. **Resolve** — du resolver først et bibliotek-navn til en Context7-ID.
2. **Query** — så henter du versjonsspesifikk dokumentasjon og kodeeksempler for akkurat det biblioteket og den versjonen.

Å hoppe over resolve-steget er den vanligste feilen i agent-traces. Serveren ber selv om at verktøyet ikke kalles mer enn 3 ganger per spørsmål.

Den dekker det meste av frontend-stacken (Next.js, React, Tailwind, shadcn/ui, React Query osv.) — nettopp der treningsdata blir utdatert raskest.

## Oppsett i Claude Code

To veier:

**Enkel (installer):**

```bash
npx ctx7 setup --claude
```

Autentiserer via OAuth, genererer en API-nøkkel og installerer enten CLI+Skills-varianten eller MCP-varianten.

**Manuell (remote-endepunkt):**

- URL: `https://mcp.context7.com/mcp`
- API-nøkkel sendes via `CONTEXT7_API_KEY`-header
- Alternativt stdio lokalt: `npx @upstash/context7-mcp`

API-nøkkel er valgfritt — gratisnivået fungerer uten, men nøkkel gir høyere rate limits. Merk at gratisnivået ble kuttet med 83–92 % i januar 2026, så for jevnlig bruk vil du sannsynligvis trenge en nøkkel.

## Sikkerhet (viktig i enterprise-kontekst)

Disse serverne injiserer ekstern tekst rett inn i Claudes kontekst — det er en tillitsflate.

- En context-poisoning-sårbarhet kalt **ContextCrush** ble oppdaget og patchet i februar 2026.
- Den sentraliserte registermodellen anbefales avbøtet med **utgående nettverksfiltrering** (Stackloks ToolHive-guide).

For en personlig frontend-maskin er dette lavrisiko. Men ved en bredere utrulling i Computas er det et punkt for sikkerhetsgjennomgang — samme prompt-injection-resonnement som gjelder for CTI-MCP-en gjelder her.

## Praktisk anbefaling

Ta den inn, men hold den **behovsstyrt** (trigg med «use context7» i prompten) heller enn alltid-på. Den koster et nettverkskall og kontekst hver gang, så for stabile, velkjente biblioteker er den unødvendig.

Verdien kommer på de raskt bevegende greiene — React 19, Tailwind v4, nyeste Next.js — der modellen ellers fyller inn fra hukommelsen og bommer på versjonen.
