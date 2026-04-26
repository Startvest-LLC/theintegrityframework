# integrity-framework

The CLI for the [Integrity Framework](https://theintegrityframework.org/).

Two surfaces:

1. Run the Integrity Framework v1.0 assertion suite against any repo. Deterministic runner, no LLM, no network.
2. Browse and submit listings to the [Integrity Framework Directory](https://theintegrityframework.org/).

Pure ESM JavaScript, zero dependencies. Requires Node 20+.

## Install

Clone the directory repo and link the binary. Three lines:

```bash
git clone https://github.com/Startvest-LLC/theintegrityframework.git
cd theintegrityframework/cli
chmod +x bin/integrity.mjs
```

Then either run by full path (`./bin/integrity.mjs directory list`) or symlink it onto your PATH:

```bash
# Unix
ln -s "$(pwd)/bin/integrity.mjs" /usr/local/bin/integrity

# Windows (PowerShell, run as admin once)
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\bin\integrity.mjs" -Target "$(Resolve-Path bin\integrity.mjs)"
```

Update with `git pull`. Each release lives at a tagged commit (`cli-v1.2.0`, etc.) you can `git checkout` into for a pinned version.

Why no `npm install -g`: npm's first-publish bootstrap (org creation, 2FA-write, token type confusion) was more friction than the CLI is worth. The directory repo is public; cloning it IS the install. Future versions ship via tag — no package-registry dependency.

## Usage

```bash
integrity check <repo>           # run base + per-product manifest
integrity verify <repo>          # confirm repo manifest covers base rule ids
integrity rules                  # print the v1.0 base manifest as JSON
integrity directory list         # browse listings on theintegrityframework.org
integrity directory show <slug>  # full detail for one listing
integrity directory validate <file>  # check a listing JSON against the schema
integrity directory submit <file>    # validate then surface the submission paths
integrity --version
```

## Directory subcommand

Reads `https://theintegrityframework.org/api/listings.json` for `list` and `show`. Writes nothing — `submit` validates the file locally and prints the two submission paths (GitHub PR or email to `integrity@startvest.ai`).

The validation schema mirrors the directory's zod schema in `../src/lib/listings.ts`. When the schema changes, both sides are updated in the same commit. That's why this CLI lives in the directory's repo.

## License

Apache-2.0.
