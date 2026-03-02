# AGENTS.md

This repository has two apps:

- `frontend/`: Next.js 16 + React 19 + Tailwind CSS 4 + Framer Motion
- `backend/`: NestJS 11 API (in-memory data for now)

## Quick Start

- Frontend dev: `cd frontend && npm run dev`
- Frontend lint: `cd frontend && npm run lint`
- Backend dev: `cd backend && npm run start:dev`
- Backend tests: `cd backend && npm run test`

## Current Architecture

- Frontend transactions page: `/Users/ndukwearmstrong/personal/cfin/frontend/src/app/dashboard/transactions/page.tsx`
- Backend transactions controller: `/Users/ndukwearmstrong/personal/cfin/backend/src/transactions/transactions.controller.ts`
- Backend create DTO: `/Users/ndukwearmstrong/personal/cfin/backend/src/transactions/dto/create-transaction.dto.ts`

Backend endpoints:

- `GET /transactions`
- `GET /transactions/:id`
- `POST /transactions`
- `DELETE /transactions/:id`

## What Has Been Implemented So Far

On March 2, 2026, the Transactions UI was upgraded with a create flow on the frontend:

- Added `+ New Transaction` button on the Transactions page header.
- Added a modal form to create a new transaction.
- New transaction is inserted into UI state immediately (top of list).
- Dashboard metrics on the same page now recompute from live local state.
- Search/filter behavior still works with newly created transactions.

Important: this create flow is currently UI-local and not yet connected to backend API.

## Transactions Data Notes

Current frontend transaction shape includes fields like:

- `merchant`, `category`, `date`, `amount`, `status`, `method`, `icon`

Backend `CreateTransactionDto` currently expects:

- `type`, `amount`, `description`, `category`, `date`

Before wiring frontend modal to backend, align payload/field mapping.

## Working Rules For Contributors

- Keep edits scoped and minimal.
- Preserve existing visual style and motion on dashboard pages.
- Prefer strongly typed React state and event handlers.
- Run lint/tests for affected app before finishing.
- Do not modify generated/build outputs (`dist`, `node_modules`) manually.

