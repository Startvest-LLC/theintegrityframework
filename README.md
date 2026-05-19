# theintegrityframework.org

[![integrity.md](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/Startvest-LLC/theintegrityframework/master/.github/integrity-badge.json)](https://github.com/Startvest-LLC/theintegrityframework/actions/workflows/integrity.yml)

The Integrity Framework Directory — a public directory of products evaluated against the Startvest Integrity Framework.

The badge above is produced on every push to `master` by [`integrity-md-action`](https://github.com/Startvest-LLC/integrity-md-action) running against this repo's own [`INTEGRITY.md`](./INTEGRITY.md). Directory-operator-eats-its-own-dogfood, in CI form.

## Stack

- Next.js 16 (App Router) + MDX
- Tailwind CSS
- Static rendering of listings from `data/listings.json`
- Azure App Service (Docker, standalone output)

## Local development

```bash
npm install
npm run dev
```

Dev server runs on port 3010 to avoid colliding with adjacent products.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

## Repo layout

```
src/
  app/             Next.js App Router pages
  components/      Shared UI
  lib/             Site metadata, helpers
data/
  listings.json    Source of truth for the directory
content/           MDX content (framework, methodology)
```

## Status

v0.1 scaffold. See `E:/Development/Startvest/INTEGRITY-DIRECTORY-PLAN.md` for the locked design and outstanding work.
