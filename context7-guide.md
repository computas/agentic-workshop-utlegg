# Context7 MCP Server

## Hva er Context7?

Context7 er for tiden den mest brukte MCP-serveren (Model Context Protocol). Den er rangert som **#1 på MCP.Directory** og ble plassert i **ThoughtWorks Technology Radar** sin *Trial*-ring i november 2025.

Mekanikken er todelt:

1. Resolver et biblioteknavn til en Context7-ID.
2. Henter versjonsspesifikk dokumentasjon og kodeeksempler for akkurat det biblioteket og den versjonen.

Å hoppe over *resolve*-steget er den vanligste feilen i agent-traces. Context7 anbefaler også at verktøyet ikke kalles mer enn tre ganger per spørsmål.

Context7 dekker store deler av frontend-økosystemet, blant annet:

* Next.js
* React
* Tailwind CSS
* shadcn/ui
* React Query
* Andre populære frontend-biblioteker

Dette er spesielt nyttig på områder hvor LLM-treningsdata blir utdaterte raskt.

---

## Oppsett i Claude Code

Det finnes to hovedmåter å installere Context7 på.

### Alternativ 1: Automatisk installasjon

Den enkleste metoden er å bruke Context7 sin egen installer:

```bash
npx ctx7 setup --claude
```

Denne løsningen:

* Autentiserer via OAuth
* Genererer API-nøkkel
* Installerer enten:

  * CLI + Skills-varianten
  * MCP-varianten

### Alternativ 2: Manuell installasjon

Legg til MCP-endepunktet direkte:

```text
https://mcp.context7.com/mcp
```

API-nøkkelen sendes via:

```text
CONTEXT7_API_KEY
```

Alternativt kan Context7 kjøres lokalt via stdio:

```bash
npx @upstash/context7-mcp
```

---

## API-nøkler og rate limits

API-nøkkel er valgfritt.

Gratisnivået fungerer uten nøkkel, men en API-nøkkel gir høyere rate limits.

> Merk: Gratisnivået ble redusert med omtrent 83–92 % i januar 2026. For jevnlig bruk vil det derfor sannsynligvis være nødvendig med API-nøkkel.

---

## Sikkerhetsvurderinger

Context7 og lignende MCP-servere
