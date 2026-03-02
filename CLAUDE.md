# CLAUDE.md

Guidance for Claude Code and other coding agents working in this repo.

## Repo Layout

- `frontend/` -> Next.js app (UI)
- `backend/` -> NestJS app (API)

## Commands

- Frontend dev: `cd frontend && npm run dev`
- Frontend lint: `cd frontend && npm run lint`
- Frontend build: `cd frontend && npm run build`
- Backend dev: `cd backend && npm run start:dev`
- Backend lint: `cd backend && npm run lint`
- Backend tests: `cd backend && npm run test`

## Current Product State

Transactions page has an in-app modal create flow:

- File: `/Users/ndukwearmstrong/personal/cfin/frontend/src/app/dashboard/transactions/page.tsx`
- Includes `+ New Transaction` action and modal form.
- New transactions are added to local React state and rendered immediately.
- Page metrics and filtering use this live state.

This is not yet API-backed.

## Backend Transactions API

- Controller: `/Users/ndukwearmstrong/personal/cfin/backend/src/transactions/transactions.controller.ts`
- DTO: `/Users/ndukwearmstrong/personal/cfin/backend/src/transactions/dto/create-transaction.dto.ts`

`POST /transactions` expects:

- `type: 'income' | 'expense'`
- `amount: number`
- `description: string`
- `category: string`
- `date: string`

## Implementation Guidance

- Keep changes consistent with existing TypeScript and Tailwind style.
- Prefer minimal, incremental changes over broad rewrites.
- If touching transactions, explicitly state whether change is:
  - UI-only local state
  - API-backed (and how payload mapping is handled)
- Validate with lint/tests in the affected app before finalizing.

