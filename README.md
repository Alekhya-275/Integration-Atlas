# Integration Atlas — Integration Research Workbench

Integration Atlas is a web-based workbench for exploring application integrations and organizing research about their developer capabilities. It provides a centralized view of applications, integration requirements, documentation references, research progress, and review status.


The current version is a **research starter workbench**: it includes a directory of 100 applications, but the application-level integration findings have not yet been researched. It does not claim that an automated research agent or verification audit has been completed.

## Features

### Overview dashboard
- Displays the application directory and its category breakdown.
- Shows research progress and status counters.
- Provides a quick view of the research queue.
- Distinguishes pending work from completed research.


### Application research matrix
- Browse the 100 applications in the directory.
- Search by application name or category.
- Filter by category and research status.
- Open an application record to view its research fields.
- Export the currently displayed matrix to CSV.
- Organizes fields for authentication, developer access, API/MCP capabilities, buildability, blockers, evidence, and review status.


### Research workflow view
Displays a proposed workflow for integration research:
1. Discover relevant documentation and sources.
2. Extract integration facts.
3. Classify authentication, access requirements, API, and MCP details.
4. Attach source links and evidence.
5. Review findings and flag uncertain information for follow-up.


### Review ledger
- Provides a review marker for application records.
- Review status is held in the current UI session.
- It is a lightweight tracking feature and does not independently verify facts or calculate research accuracy.


## Current Status and Limitations

- The application directory contains 100 apps across 10 categories.
- Research fields remain `Not researched`, `Unknown`, `Pending`, or similar until findings are added.
- The URLs included in the starter data are reference hints; they do not indicate that the pages have been visited or verified.
- Automated AI research and live web-search integration are not connected in this version.
- The workflow view describes a proposed process; it is not a running research agent.
- The review ledger is a session-level marker and does not compare findings with ground truth or calculate accuracy.
- CSV export includes the current starter data and any pending values.

These limitations are stated to keep the interface transparent and avoid presenting unverified information as fact.

## Technology Stack

| Component | Technology |
| --- | --- |
| UI | React |
| Build and development server | Vite |
| Language | JavaScript / JSX |
| Styling | CSS |
| Markdown dependencies | React Markdown, Remark GFM (available in package dependencies) |


## Project Structure

```text
integration-atlas/
├── package.json             # Root scripts forwarding to client
├── README.md
├── .gitignore
└── client/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    ├── public/
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        ├── index.css
        ├── data.js           # Starter application directory
        └── assets/
```


## Getting Started

### Prerequisites
- Node.js (20 or later recommended)
- npm
- VS Code or another code editor

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd integration-atlas
```

### 2. Install dependencies

From the project root:


```bash
npm install --prefix client
```

### 3. Run the development server

```bash
npm run dev
```

Open the local URL shown by Vite in the terminal (typically `http://localhost:5173`).

Alternatively, start from the client directory:


```bash
cd client
npm install
npm run dev
```

### 4. Build for production

From the root directory:


```bash
npm run build
```

The production build is generated in `client/dist/`. Preview it locally with:


```bash
npm run preview
```

## Application Categories

The directory is organized into the following categories:

1. CRM and Sales
2. Support and Helpdesk
3. Communications and Messaging
4. Marketing, Ads, Email and Social
5. Ecommerce
6. Data, SEO and Scraping
7. Developer, Infra and Data Platforms
8. Productivity and Project Management
9. Finance and Fintech
10. AI, Research and Media-native

## Research Workflow

The proposed research workflow is:

```text
Application
   ↓
Find developer documentation and API references
   ↓
Collect auth, access, API, MCP, and restriction details
   ↓
Attach evidence links to findings
   ↓
Assess integration feasibility and blockers
   ↓
Review selected findings
   ↓
Update findings and summarize recurring patterns
```

## Future Improvements

- Connect a research/search provider and automated research backend.
- Populate application findings using official developer documentation.
- Store evidence links alongside individual findings.
- Add source relevance and confidence indicators.
- Calculate category-level patterns from completed research.
- Add a formal verification workflow with reference findings, review outcomes, corrections, and accuracy metrics.
- Add automated testing and deployment.

## Data and Sources

The application directory includes application names, categories, and initial reference URLs. Integration details such as authentication, API coverage, access requirements, MCP support, and buildability should be researched and evidence-reviewed before being treated as confirmed.


## Author

**Integration Atlas — mapping the path from app APIs to agent-ready tools.**
