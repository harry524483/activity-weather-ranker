# ActivityWeatherRanker

A monorepo project to rank activities (like surfing, skiing, sightseeing) for a given location over 7 days, based on weather forecasts. Built with Nx for modularity, Apollo GraphQL for API and client, and a shared TypeScript codebase for models.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Commands](#commands)
- [Architecture Overview](#architecture-overview)
- [Why Nx, Apollo Server/Client? Pros & Cons](#why-nx-apollo-serverclient-pros--cons)
- [Trade-offs](#trade-offs)
- [How AI Was Used](#how-ai-was-used)
- [Useful Nx Commands](#useful-nx-commands)

---

## Project Structure

### API

```
apps/
  api/
    src/
      common/
        graphql/              # Codegen generated resolver types
        types/
        utils/
      features/
        activity-ranking/
          rules/              # Rules to score different activities
          services/
          exceptions/
          graphql/
            resolvers/

```

### Frontend

```
  frontend/
    src/
      app/
      assets/
      common/
        graphql/              # Codegen generated query types and hooks
      features/
        activity-ranking/
          components/
          hooks/
          pages/
          types/
          utils/
```

### Shared library

```
libs/
  shared/
    src/
      constants/
      models/                 # GraphQL schema & codegen generated types
      types/
```

---

## Commands

### API

- **Run dev server:**
  ```sh
  npx nx serve api
  ```
- **Build:**
  ```sh
  npx nx build api
  ```
- **Codegen (GraphQL types):**
  ```sh
  npx nx run api:codegen
  ```

### Frontend

- **Run dev server:**
  ```sh
  npx nx serve frontend
  # or
  npx nx dev frontend
  ```
- **Build:**
  ```sh
  npx nx build frontend
  ```
- **Codegen (GraphQL types):**
  ```sh
  npx nx run frontend:codegen
  ```

### Shared

- **Codegen (GraphQL types):**
  ```sh
  npx nx run shared:codegen
  ```

### Nx Graph

- **Visualize project graph:**
  ```sh
  npx nx graph
  ```

---

## Architecture Overview

- **API**: Apollo Server (Node.js, Express) exposes a GraphQL endpoint. Activity ranking is based on weather data and custom rules for each activity. Uses services for weather and geocoding.
- **Frontend**: React app (Vite, Tailwind) uses Apollo Client to query the API and display ranked activities for a location over 7 days.
- **Shared**: TypeScript models, GraphQL schema reused by both API and frontend for consistency.
- **Nx**: Monorepo management, code sharing, and task orchestration.

---

## Why Nx, Apollo Server/Client? Pros & Cons

### Nx

**Pros:**

- Modular monorepo: easy code sharing (e.g., models, scoring logic)
- Enable targeted deployments by deploying only affected apps or services.
- Enable independent deployments to scale apps or services individually based on traffic demands.
- Consistent tooling for build, test, lint, codegen
- Visualizes dependencies and project graph

**Cons:**

- Some learning curve for Nx commands and features but AI makes it easy

### Apollo Server/Client

**Pros:**

- Strong GraphQL support, type safety and wide range of node.js server integrations.
- Codegen graphql schemas, resolvers, types and hooks
- Apollo client normalizes the server data and manages caching
- Provides built-in error handling and loading states
- Offers real-time subscriptions out of the box
- When used with NestJS, it offers wide range of advanced features and patterns

**Cons:**

- Requires extra setup for advanced features (auth, tracing, etc.) when used without NestJS
- Apollo Client is GraphQL-specific, while alternatives like TanStack Query support multiple API types

---

## Trade-offs

### API

- Logging - Pino/Bunyan
- Tracing & Metrics - OpenTelemetry
- Dockerfile
- Deployment - Github actions
- Integration testing - supertest + vitest

### Frontend

- Dockerfile
- Deployment - Github actions
- End to end testing - playwright

## How AI Was Used

- Used AI (Agent mode) on small & focused tasks instead doing many tasks at same time, commit changes, and iterate quickly.
- Brainstormed implementation plans (e.g., scoring rules, testing strategy for rules) with AI.
- Used AI to read online docs and suggest best practices for Nx, Apollo, and testing.
- Created cursor rules for repetitive tasks e.g. commit message, unit test structure etc.
- Used chat mode in terminal to generate commands e.g. command to run specific unit tests, nx generator commands etc.

---

## Useful Nx Commands

- See all available targets for a project:
  ```sh
  npx nx show project <project>
  ```
- List installed plugins:
  ```sh
  npx nx list
  ```
- Run lint, test, or typecheck:
  ```sh
  npx nx lint <project>
  npx nx test <project>
  npx nx typecheck <project>
  ```
