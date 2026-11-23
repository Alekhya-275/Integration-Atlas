# Integration Atlas — AI Product Ops Take-home

A single-page research workbench for the 100-app integration research assignment. It replaces the original single-app OAuth guide interface with an assignment-aligned overview, app matrix, research workflow, and verification ledger.


## Current state (honest)
- The assignment's complete 100-app list is included as a starter dataset.
- Category counts and the research queue are computed from that list.
- App rows intentionally show **Not researched / Unknown / Pending** until evidence is collected.
- Source links are starting hints from the assignment, not evidence that the linked pages were reviewed.
- No accuracy score or research findings are invented.
- The review checkbox is an in-session UI marker only; it is not an accuracy audit and is not persisted.
- Export CSV downloads the current table data, including pending values.


## Run locally

Requirements: Node.js 20+ and npm.


### From the project root

```bash
npm install --prefix client
npm run dev
```

Open the Vite URL printed in the terminal. The root npm scripts simply forward commands into `client/`.

### Or from `client/`

```bash
cd client
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

The generated static site is in `client/dist/`.


## Included sections
- **Overview:** scope, progress counters, category distribution, research hypotheses (explicitly labeled as hypotheses), queue.
- **Research matrix:** search/filter all 100 apps, view starter links, export CSV.
- **Agent workflow:** discover → extract → classify → cite → verify, plus human responsibilities.
- **Verification:** review marker for up to 20 visible starter entries; does not calculate accuracy.


## Suggested next implementation steps
1. Connect a web-search provider to an agent endpoint.
2. Research each app's authentication, self-serve/gated status, REST/GraphQL surface, MCP availability, buildability, blockers, and evidence URLs.
3. Persist structured research results and per-claim citations.
4. Implement a verification sample with expected values, agent values, hit/miss notes, and recalculated accuracy.
5. Populate the patterns section from the reviewed dataset only, and deploy the case-study page.


## Data source
The app list and categories are based on the take-home assignment brief provided by the user. URLs are preserved as source hints where present. The application does not claim these URLs have been reviewed.
