# Nightwatch keyword seed list — theintegrityframework.org

Initial keyword set for the Nightwatch URL once it's created. ~25 keywords spanning four intents: brand, framework concept, segment-fit ("alternative to SOC 2"), and competitor/adjacent compliance frameworks.

Loading these via Nightwatch's batch-create lets the IdeaLift `distribution-nightwatch-sync` cron pick them up automatically. Tag everything with `integrityframework` so the Property field stays clean across the brands.

## Brand and direct-intent (5)

These should rank quickly once the site is indexed. Low volume, high relevance.

```
the integrity framework
integrity framework directory
startvest integrity framework
theintegrityframework.org
integrity framework bronze tier
```

## Framework concept (5)

The category-defining queries. Higher competition; signal whether the framework is breaking through.

```
trust signal for ai tools
sub-enterprise compliance framework
lightweight compliance framework
forkable compliance framework
ai trust framework cc by
```

## Segment-fit / "SOC 2 doesn't fit" (5)

The buyer-side queries — people looking for trust signals when SOC 2 is the wrong shape. This is the highest-leverage cluster for IntFram positioning.

```
soc 2 alternative for small ai tools
when soc 2 doesn't apply
soc 2 too expensive for indie
ai vendor trust without soc 2
buying ai tools without soc 2
```

## Competitive / adjacent (5)

Compliance frameworks the IntFram positioning differentiates against. Low rank potential at first; useful to see whether IntFram surfaces as a referenced alternative in AI Overview answers about these.

```
nist sp 800-53 alternative
coso framework alternative
soc 2 lite
self-attestation compliance framework
ai code of conduct framework
```

## Methodology / artifact-pattern (5)

Aimed at founders looking for "what does an INTEGRITY.md actually contain" type queries. Drives traffic into /methodology and /framework.

```
integrity.md template
how to write integrity.md
public methodology page example
versioned methodology compliance
veto-based product trust framework
```

## Loading

When ready, paste the 25 lines into Nightwatch's batch keyword create UI for the new theintegrityframework.org URL. Tag set: `integrityframework`. Country/language: us / en.

## Activation gate

Per `apps/web/src/lib/brands.ts` (IdeaLift repo), once the Nightwatch URL is created and at least 10 keywords return a snapshot:

1. Replace `nightwatchUrlId: 0` with the actual URL ID
2. Flip `isActive: false` → `true`
3. Manual trigger: `gh workflow run distribution-nightwatch-sync-cron.yml`
4. Manual trigger: `gh workflow run distribution-aeo-check-cron.yml`

The next Sunday's AEO Gap Report and weekly summary will start including IntFram automatically.
