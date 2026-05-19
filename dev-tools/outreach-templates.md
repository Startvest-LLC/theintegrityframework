# Outreach templates — directory submissions

Cold-email / contact-form templates for inviting non-Startvest products into
the directory. Targets come from `prospect-listings.mjs` output.

**Send from:** `integrity@startvest.ai` (already wired as the directory contact)
**Medium:** product website contact form or founder email if discoverable on
the site. No LinkedIn outreach — see prior decision.
**Volume cap:** ~5–7 per week. The credibility signal is the directory's
restraint, not its blast radius.

Honest framing rules across all tiers:

- Lead with the specific thing you read on their site. Anything generic reads
  as blast and goes straight to spam.
- Disclose state honestly: how many listings live, that all current ones are
  Startvest's own under COI disclosure, framework is CC BY 4.0, that the
  recipient would be among the first non-operator listings.
- Soft ask. Don't push for "yes today" — point to the half-day walkthrough
  and let the founder self-qualify.
- No urgency manufactured. No "we're filling spots fast."
- Sign-off includes the directory URL and your name. Short signature.

The named-prospect worked examples and per-prospect hook lines live in a
local-only file (`outreach-templates.local.md`, gitignored). Keep this file
to the reusable scaffolding.

---

## Tier A — already publish a trust artifact

These founders have either an INTEGRITY.md, a /trust page, /methodology, or
/security page on their product site. The pitch is "you're 80% there." Aim:
under 130 words.

### Template

```
Subject: Saw your <ARTIFACT> — quick directory question

<NAME>,

<HOOK — one specific sentence proving I read their thing. Reference the file
or page by name, and one detail from it that struck me.>

I run theintegrityframework.org — a public directory of products evaluated
against the Integrity Framework, a standard for sub-enterprise AI tools where
SOC 2 doesn't apply. Two tiers, Bronze and Silver, both based on public
artifacts buyers can verify themselves. Listing is free, no paid tier exists.

Looking at <THEIR PAGE>, you're already past the Bronze gate or close to it.
Half a day of restructuring against the six Layer 1 vetoes would qualify
you for a listing: https://theintegrityframework.org/how-to-write-an-integrity-md

Honest state: <N> listings live, all Startvest's own with COI disclosure (we
operate the directory and list our own products under the same rubric). The
first non-Startvest listings go live alongside the public launch — your
product would be among them.

If it's a fit, the form is at https://theintegrityframework.org/submit/form.
If not, no follow-up.

<SIGN-OFF>
Tom Pinder
Startvest LLC
https://theintegrityframework.org
```

### How to write the hook line

Quote the specific artifact and one detail from it. Bad hook: "Saw you care
about trust." Good hook: "Your /security page's threat-model table reads
like the Verifiability veto in product form." Specificity proves the email
isn't blast.

---

## Tier B — solid segment fit, no trust artifact yet

These products are clearly in segment but haven't shipped a trust page or
INTEGRITY.md. The pitch is "you'd be a fit; here's how it works." Aim: under
130 words.

### Template

```
Subject: <PRODUCT> — quick question on AI trust signals

<NAME>,

<HOOK — one specific sentence proving I read their thing.>

I run theintegrityframework.org — a public directory of products evaluated
against a free, forkable trust framework for sub-enterprise AI tools. Two
tiers, Bronze and Silver, both based on public artifacts buyers can verify
themselves. No paid tier.

The Bronze tier just needs a public INTEGRITY.md mapping six pre-build vetoes
on your repo or site. Half-day walkthrough with a copy-paste template:
https://theintegrityframework.org/how-to-write-an-integrity-md

Honest state: <N> listings live, all Startvest's own with COI disclosure.
First non-Startvest listings go live alongside the public launch.

No follow-up if not a fit.

Tom Pinder
Startvest LLC
https://theintegrityframework.org
```

### How to write the hook line

Pick the one framework veto the product implicitly satisfies (or implicitly
fails). Tie the hook to that veto by name. Example shape: "An AI tool that
touches a customer's codebase is the canonical case for the framework's AI
accountability veto." Keep it under 20 words.

---

## Tier C — cold, compliance-shaped products

These are AI products in regulated/compliance-adjacent segments without any
trust artifact yet. Soft ask. Lower expected conversion. Aim: under 110
words.

### Template

```
Subject: A trust framework for products like <PRODUCT>

<NAME>,

<HOOK — one sentence on what they do.>

If you're thinking about how buyers vet AI tools in regulated segments, the
Integrity Framework was written for that gap. It's a free, forkable standard
with a public directory at theintegrityframework.org. Sub-enterprise AI,
where SOC 2 doesn't fit. Listing is free, no paid tier.

Worth a 5-minute read if buyer trust is a recurring objection in your sales:
https://theintegrityframework.org/what-is-the-integrity-framework

Half-day walkthrough if you want the full path to a Bronze listing:
https://theintegrityframework.org/how-to-write-an-integrity-md

No follow-up if not a fit.

Tom Pinder · Startvest LLC · https://theintegrityframework.org
```

### How to write the hook line

A single descriptive sentence — what the product does and which segment it
serves. No editorial. The point is to prove the email isn't a bulk send;
the framework pitch carries the rest. Tier C conversion is low; treat it
as seed planting, not active outreach.

---

## What to track

After each batch, track in a local-only spreadsheet (not committed):

| Date | Recipient | Tier | Sent via | Response | Outcome |
|---|---|---|---|---|---|

The conversion rate matters less than which *kind* of hook is converting.
After the first 15 sends, look for patterns: did Tier A convert better than
Tier C as expected, or did the cold compliance-shaped Tier C cluster respond
better because they have a more acute buyer-trust pain point? Adjust the
mix.

The first non-Startvest listing is the credibility moment. Don't push for
volume; push for one approval that lets the public launch run with a real
mixed-portfolio directory.
