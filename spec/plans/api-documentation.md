# API Documentation

> Existing-system context derived locally; Atlas was not consulted. Source: local-generation (Atlas unavailable — user approved). Analyzed at commit b774b82, 2026-11-13T08:28:49Z.

## REST APIs
### Login
- **Method**: POST
- **Path**: /api/auth/login
- **Request**: `{ email, password }`
- **Response**: `{ access_token, user }`; 401 "Invalid credentials"
### Register
- **Method**: POST
- **Path**: /api/auth/register
- **Request**: `{ name, email, password }`
- **Response**: `{ access_token, user }`; 400 "Account already exists"
### Activate Standard plan
- **Method**: POST
- **Path**: /api/billing/activate
- **Request**: `{ email }`
- **Response**: billing payload (Standard); 401 "Not authenticated"
### Current user
- **Method**: GET
- **Path**: /api/users/me?email=
- **Response**: user without password; 401
### Billing
- **Method**: GET
- **Path**: /api/billing?email=
- **Response**: `{ has_plan: false }` or billing payload; 401

**No endpoint exists for upgrading or changing plans, and no Premium plan data exists.**

## Internal APIs
### useAuth()
- **Methods**: `login(email, password)`, `register(name, email, password)`, `activatePlan()`, `logout()`
- **Parameters**: credentials as listed
- **Return Types**: context value `{ user, token, login, register, activatePlan, logout }`

## Data Models
### Billing payload
- **Fields**: `plan_name`, `price`, `renew_at`, `usages[]` (`id`, `label`, `type`, `value`, `help`), `included_usage` (`title`, `items[]` with `id`, `label`, `used_percent`; `help`)
- **Relationships**: keyed by user email
- **Validation**: none (server-generated)
### User
- **Fields**: `id`, `name`, `email`, `plan`, `price`, `renew_at` (password never returned)
- **Relationships**: one billing payload per user once activated
- **Validation**: email canonicalised (trimmed, lower-cased, max 254 chars, pattern-checked)
