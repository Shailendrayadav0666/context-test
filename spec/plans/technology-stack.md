# Technology Stack

> Existing-system context derived locally; Atlas was not consulted. Source: local-generation (Atlas unavailable — user approved). Analyzed at commit b774b82, 2026-11-13T08:28:49Z.

## Programming Languages
- JavaScript (ES modules, JSX) - ES2022+ - frontend
- Python - 3.x - backend

## Frameworks
- React - ^19.2.8 - UI
- react-router-dom - ^7.18.2 - routing
- FastAPI - unpinned - REST API
- Pydantic - via FastAPI - request validation

## Infrastructure
- none (local dev servers; uvicorn)

## Build Tools
- Vite - ^8.2.2 - dev server and bundler
- oxlint - ^1.79.0 - linting

## Testing Tools
- Vitest - ^5.0.1 (jsdom ^27.0.1, @vitest/coverage-v8 ^5.0.1) - frontend unit tests
- @testing-library/react - ^16.3.3 - component tests
- @testing-library/jest-dom - ^7.0.1 - DOM matchers
- pytest - 9.1.1, pytest-cov - 7.1.0, httpx - 0.28.1 - backend tests
