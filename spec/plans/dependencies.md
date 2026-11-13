# Dependencies

> Existing-system context derived locally; Atlas was not consulted. Source: local-generation (Atlas unavailable — user approved). Analyzed at commit b774b82, 2026-11-13T08:28:49Z.

## Internal Dependencies

```mermaid
flowchart LR
    FE["src/frontend"] -->|"HTTP /api"| BE["src/backend"]
```

### src/frontend depends on src/backend
- **Type**: Runtime
- **Reason**: all data (auth, billing) is fetched from the API

## External Dependencies
### react, react-dom
- **Version**: ^19.2.8
- **Purpose**: UI
- **License**: MIT
### react-router-dom
- **Version**: ^7.18.2
- **Purpose**: routing
- **License**: MIT
### vite, @vitejs/plugin-react
- **Version**: ^8.2.2, ^6.1.0
- **Purpose**: build
- **License**: MIT
### vitest, jsdom, @testing-library/react, @testing-library/jest-dom
- **Version**: ^5.0.1, ^27.0.1, ^16.3.3, ^7.0.1
- **Purpose**: tests
- **License**: MIT
### fastapi, uvicorn, python-multipart
- **Version**: unpinned
- **Purpose**: API server
- **License**: MIT / BSD-3-Clause / Apache-2.0
