// Reference implementation data. Drop rule (from the SEO spec): "If a parser
// doesn't exist, that language doesn't get a page." Only entries below are
// shipped; Python / Go / Rust / Hugo / Astro etc. are deliberately absent until
// real reference implementations ship.

export type ImplementationKind = 'cli' | 'library' | 'integration';
export type ImplementationStatus = 'live' | 'pre-launch';
export type PackageRegistry = 'npm-public' | 'github-packages-prelaunch' | 'n/a';

export interface Implementation {
  slug: string;
  title: string;
  kind: ImplementationKind;
  oneLine: string;
  packageName?: string;
  packageRegistry: PackageRegistry;
  repoUrl?: string;
  status: ImplementationStatus;
  statusNote?: string;
  install: string;
  usage: { heading: string; lang: string; code: string; note?: string }[];
  body: string[];
  coversTopics: string[];
}

export const IMPLEMENTATIONS: Implementation[] = [
  {
    slug: 'integrity-cli',
    title: 'integrity-cli — Layer 2 reference runner',
    kind: 'cli',
    oneLine:
      'The reference runner for the v1 Layer 2 architectural constraints. Pure ESM, zero deps, deterministic, no LLM, no network. Apache-2.0.',
    packageName: '@startvest/integrity-cli',
    packageRegistry: 'npm-public',
    repoUrl: 'https://github.com/Startvest-LLC/startvest-integrity-cli',
    status: 'live',
    install: 'npm install -g @startvest/integrity-cli',
    usage: [
      {
        heading: 'One-shot run via npx',
        lang: 'bash',
        code: 'npx @startvest/integrity-cli check ./your-repo',
        note: 'No install needed. Exits 0 on pass; 1 on CRITICAL findings; 2 on HIGH (with --strict).',
      },
      {
        heading: 'Run base manifest only',
        lang: 'bash',
        code: 'integrity check ./your-repo --base-only --format=json',
        note: 'CI-consumable JSON output. Skip per-product manifests; run only the v1.0 base rule set.',
      },
      {
        heading: 'Browse the directory',
        lang: 'bash',
        code: 'integrity directory list\nintegrity directory show your-listing-slug',
        note: 'Reads https://theintegrityframework.org/api/listings.json. Read-only.',
      },
    ],
    body: [
      'integrity-cli is the canonical reference implementation of Layer 2. The base manifest at manifests/base-v1.json contains the rules that any framework-conformant codebase has to pass; per-product manifests extend with codebase-specific rules.',
      "Deterministic by design. No LLM, no network calls during a check. Same inputs always produce the same findings. This is the property that makes the runner usable as a CI gate — non-determinism in a CI gate would itself be a Layer 2 failure.",
      "The runner backs the directory's Silver-tier verification path: a green run on a public repo is one of the two acceptable Silver credentials, alongside a versioned methodology page.",
    ],
    coversTopics: [
      'evidence-chain-integrity',
      'ai-output-review-gates',
      'customer-attestation-isolation',
      'failure-transparency',
      'reproducibility',
    ],
  },
  {
    slug: 'github-actions',
    title: 'GitHub Actions integration',
    kind: 'integration',
    oneLine:
      "Run integrity-cli on every push or PR. The job fails the build when a CRITICAL rule fails — closing the loop between Layer 2 and CI.",
    packageRegistry: 'n/a',
    status: 'live',
    install:
      "# .github/workflows/integrity.yml — drop-in workflow.\n# integrity-cli is on public npm; no auth needed.",
    usage: [
      {
        heading: 'Minimal workflow',
        lang: 'yaml',
        code: `name: integrity
on:
  push:
    branches: [master, main]
  pull_request:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npx @startvest/integrity-cli check . --format=json --strict`,
        note: 'Default exit codes: 0 pass, 1 CRITICAL fail, 2 HIGH fail (--strict), 3 usage error.',
      },
      {
        heading: 'Per-product manifest',
        lang: 'yaml',
        code: `      - run: |
          npx @startvest/integrity-cli check . \\
            --format=json \\
            --strict \\
            --manifest .integrity/manifest.json`,
        note: "If your repo carries a custom manifest, point at it explicitly. Per-product rules layer on top of the base manifest.",
      },
    ],
    body: [
      'GitHub Actions is the canonical CI host for the framework reference workflow. Most case-study products (ClarityLift, FieldLedger, adacompliancedocs) already run integrity-cli on every push; the workflows are visible in those public repos.',
      "The workflow is intentionally trivial. The interesting work is in the base manifest and the per-product rules — the CI host is just the trigger and the gate. Equivalent workflows for GitLab CI, CircleCI, and Buildkite are mechanical translations.",
      'Failed scans show as a red check on the PR. The standard pattern is to require the integrity check on the protected branch — that turns Layer 2 from a guideline into a structural commitment.',
    ],
    coversTopics: [
      'failure-transparency',
      'reproducibility',
      'evidence-chain-integrity',
    ],
  },
  {
    slug: 'typescript-node-brief-core',
    title: 'brief-core — TypeScript / Node reference parser',
    kind: 'library',
    oneLine:
      'Reference parser, resolver, and renderer for the brief.md spec. Pure TypeScript. Zero infrastructure dependencies.',
    packageName: '@theintegrityframework/brief-core',
    packageRegistry: 'github-packages-prelaunch',
    repoUrl: 'https://github.com/theintegrityframework/brief-core',
    status: 'pre-launch',
    statusNote:
      'Repo is private; package is published to GitHub Packages under restricted access until the brief.md spec goes public on AppSumo launch day. After launch the package moves to public npm.',
    install:
      'echo "@theintegrityframework:registry=https://npm.pkg.github.com" >> .npmrc\nnpm install @theintegrityframework/brief-core',
    usage: [
      {
        heading: 'Parse, resolve, render',
        lang: 'typescript',
        code: `import {
  parseBrief,
  resolveBrief,
  renderBrief,
  assertNoLeakage,
  validateVoice,
} from '@theintegrityframework/brief-core';

const operator = parseBrief(operatorMd);
const brand = parseBrief(brandMd);
const resolved = resolveBrief(operator, brand);

// Render the public-scope subset for an AI consumer
const publicView = renderBrief(resolved, 'public');
assertNoLeakage(publicView, 'public');  // throws if anything leaked

// Validate a draft against voice rules
const report = validateVoice(draftText, resolved, 'pitch');`,
        note: 'Five exports cover the full spec lifecycle: parse, resolve, render, leakage-check, voice-validate.',
      },
    ],
    body: [
      'brief-core is the v0.1 reference implementation of the brief.md spec. Pure TypeScript means no native dependencies and a small surface; zero infra dependencies means it runs in any Node 20+ environment, including serverless and Workers.',
      "Implementations in other languages should aim for byte-identical output on the same input. brief-core's test suite is the conformance suite — a Python or Go parser passes when it matches the brief-core output on the same fixtures.",
      "The package status is pre-launch: it's published to GitHub Packages under restricted access until the brief.md spec goes public, at which point it mirrors to public npm. Code, tests, and documentation are real and complete; the gating is on the spec publication date.",
    ],
    coversTopics: [
      'public-methodology-documentation',
      'reproducibility',
      'independent-verification-hooks',
    ],
  },
  {
    slug: 'brief-cli',
    title: 'brief-cli — author and validate brief.md',
    kind: 'cli',
    oneLine:
      'Reference command-line tool for the brief.md spec. Author from a URL, validate against the v0.1 spec, resolve operator + brand inheritance.',
    packageName: '@theintegrityframework/brief-cli',
    packageRegistry: 'github-packages-prelaunch',
    repoUrl: 'https://github.com/theintegrityframework/brief-cli',
    status: 'pre-launch',
    statusNote:
      'Pre-launch alongside brief-core. Mirrors to public npm + Homebrew tap + standalone release binaries on AppSumo launch day.',
    install:
      'echo "@theintegrityframework:registry=https://npm.pkg.github.com" >> ~/.npmrc\nnpm install -g @theintegrityframework/brief-cli',
    usage: [
      {
        heading: 'Generate a draft from a URL',
        lang: 'bash',
        code: 'brief init https://yourcompany.com\n# writes ./brand-brief.md',
        note: 'Quality target: 60–70% of fields useful, the rest left as <TODO> placeholders. Removes the blank-page tax.',
      },
      {
        heading: 'Validate a brief.md',
        lang: 'bash',
        code: 'brief validate ./brand-brief.md\nbrief validate ./brand-brief.md --quiet  # for pre-commit hooks',
        note: 'Exit codes: 0 valid, 1 invalid, 2 usage error, 3 runtime error.',
      },
      {
        heading: 'Pre-commit hook',
        lang: 'yaml',
        code: `# .pre-commit-config.yaml
- repo: local
  hooks:
    - id: brief-validate
      name: validate brief.md
      language: system
      entry: brief validate
      files: ^brand-brief\\.md$`,
        note: "The CLI's exit codes are designed for hooks. Quiet mode prints only errors.",
      },
    ],
    body: [
      'brief-cli is the authoring and validation surface for brief.md. It wraps brief-core with terminal ergonomics — a `brief init` command that scrapes a URL into a draft, a `brief validate` command that backs pre-commit hooks, and a `brief resolve` command that inheritance-merges operator and brand briefs.',
      'The CLI is a thin layer over the library. Nothing it does is unavailable to a Node program importing brief-core directly; the value is in the ergonomics for non-Node authors and in the standardized exit codes that make the tool drop-in for CI pipelines.',
      'Like brief-core, the CLI is pre-launch — the package code is real and complete, gated on the brief.md spec publication date. Post-launch, install paths multiply: public npm, Homebrew tap, and standalone release binaries.',
    ],
    coversTopics: ['public-methodology-documentation', 'reproducibility'],
  },
  {
    slug: 'integrity-md',
    title: 'INTEGRITY.md — the authoring surface',
    kind: 'integration',
    oneLine:
      "The per-product self-mapping document. Sits in the repo root, names every Layer 1 veto and Layer 2 constraint with implementation status, file paths, and CI rule names.",
    packageRegistry: 'n/a',
    status: 'live',
    install:
      "# INTEGRITY.md is a markdown convention, not a package. The reference\n# template lives in the framework repo's INTEGRITY.md.",
    usage: [
      {
        heading: 'Minimum viable shape',
        lang: 'markdown',
        code: `# INTEGRITY.md

This product operates under [The Integrity Framework v1.0](https://theintegrityframework.org/framework/v1).

## Layer 1 vetoes

### Artifact vs outcome
**Status:** PASS — pricing is per-engagement, not per-artifact. See \`docs/pricing.md\`.

### Independence
**Status:** PASS — we do not certify our own customers. See \`docs/positioning.md\`.

[... continue for all six vetoes]

## Layer 2 constraints

### Evidence chain integrity
**Status:** PASS — \`schema.sql\` line 42 enforces non-null FK from claims to evidence. CI rule: \`SV-EVIDENCE-CHAIN-FK\`.

[... continue for all seven constraints]`,
        note: "Status is one of PASS, PARTIAL, NOT-YET, or N/A. PARTIAL and NOT-YET name the close date.",
      },
    ],
    body: [
      "INTEGRITY.md is how a product publishes its self-mapping against the framework. Every Layer 1 veto and Layer 2 constraint is named, with a status, a file path or CI rule pointing at the implementation, and (for partials) a close date.",
      "It's the lowest-overhead implementation surface. Bronze-tier listings on the directory require a public INTEGRITY.md self-mapping the six Layer 1 vetoes; Silver requires Bronze plus either an integrity-cli green run or a versioned methodology page.",
      "Roughly half a day of honest reflection and writing for a thoughtful founder. The artifact survives the team — it's a structural commitment readable by procurement reviewers, future engineers, and the framework's own re-scan workflow.",
    ],
    coversTopics: [
      'public-methodology-documentation',
      'public-kill-criteria',
      'techcrunch-test',
    ],
  },
];

export function getAllImplementationSlugs(): string[] {
  return IMPLEMENTATIONS.map((i) => i.slug);
}

export function getImplementationBySlug(slug: string): Implementation | undefined {
  return IMPLEMENTATIONS.find((i) => i.slug === slug);
}
