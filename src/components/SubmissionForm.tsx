'use client';

import { useState } from 'react';

type Tier = 'bronze' | 'silver';
type License = 'open-source' | 'closed-source' | 'mixed';
type SilverKind = 'methodology-page' | 'integrity-cli';

type FormState = {
  // Submitter
  contactEmail: string;
  contactName: string;
  notes: string;
  // Listing identity
  slug: string;
  name: string;
  description: string;
  // URLs
  homepageUrl: string;
  integrityMdUrl: string;
  // Tier
  tier: Tier;
  silverKind: SilverKind;
  silverMethodologyUrl: string;
  silverCliOutputUrl: string;
  silverCliCommitSha: string;
  // Classification
  license: License;
  category: string;
  // Operator
  operatorName: string;
  operatorUrl: string;
  // Honeypot — must stay empty
  website: string;
};

const initial: FormState = {
  contactEmail: '',
  contactName: '',
  notes: '',
  slug: '',
  name: '',
  description: '',
  homepageUrl: '',
  integrityMdUrl: '',
  tier: 'bronze',
  silverKind: 'methodology-page',
  silverMethodologyUrl: '',
  silverCliOutputUrl: '',
  silverCliCommitSha: '',
  license: 'closed-source',
  category: '',
  operatorName: '',
  operatorUrl: '',
  website: '',
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function SubmissionForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<
    | { kind: 'idle' }
    | { kind: 'success'; issueNumber: number; issueUrl: string }
    | { kind: 'error'; message: string; detail?: unknown }
  >({ kind: 'idle' });

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult({ kind: 'idle' });

    const today_ = today();
    const listing: Record<string, unknown> = {
      slug: form.slug.trim(),
      name: form.name.trim(),
      description: form.description.trim(),
      homepageUrl: form.homepageUrl.trim(),
      integrityMdUrl: form.integrityMdUrl.trim(),
      tier: form.tier,
      license: form.license,
      operator: {
        name: form.operatorName.trim(),
        ...(form.operatorUrl.trim() ? { url: form.operatorUrl.trim() } : {}),
      },
      firstListedDate: today_,
      lastRescannedDate: today_,
      state: 'active',
      ...(form.category.trim() ? { category: form.category.trim() } : {}),
    };
    if (form.tier === 'silver') {
      if (form.silverKind === 'methodology-page') {
        listing.silverCredential = {
          kind: 'methodology-page',
          url: form.silverMethodologyUrl.trim(),
        };
      } else {
        listing.silverCredential = {
          kind: 'integrity-cli',
          outputUrl: form.silverCliOutputUrl.trim(),
          ...(form.silverCliCommitSha.trim() ? { commitSha: form.silverCliCommitSha.trim() } : {}),
        };
      }
    }

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listing,
          contactEmail: form.contactEmail.trim(),
          ...(form.contactName.trim() ? { contactName: form.contactName.trim() } : {}),
          ...(form.notes.trim() ? { notes: form.notes.trim() } : {}),
          // Honeypot
          ...(form.website ? { website: form.website } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ kind: 'error', message: data?.error ?? 'Submission failed', detail: data?.issues });
        return;
      }
      setResult({ kind: 'success', issueNumber: data.issueNumber, issueUrl: data.issueUrl });
    } catch (err) {
      setResult({
        kind: 'error',
        message:
          err instanceof Error ? err.message : 'Network error. Try again, or use the email fallback.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (result.kind === 'success') {
    return (
      <div className="rounded-lg border border-brand-200 bg-brand-50 p-6">
        <h2 className="text-xl font-semibold text-brand-900">Submission received</h2>
        <p className="mt-3 text-surface-700">
          Tracked as issue{' '}
          <a href={result.issueUrl} className="font-mono">
            #{result.issueNumber}
          </a>
          . First response within 14 calendar days. You&apos;ll get a reply on that issue with
          either an approval, a request for changes, or a rejection with reasons.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {result.kind === 'error' && (
        <div role="alert" className="rounded-lg border border-bronze-300 bg-bronze-50 p-4 text-sm text-bronze-900">
          <strong>Submission failed.</strong> {result.message}
          {result.detail != null && (
            <pre className="mt-2 overflow-x-auto text-xs">
              {typeof result.detail === 'string' ? result.detail : JSON.stringify(result.detail, null, 2)}
            </pre>
          )}
          <p className="mt-2">
            The email path at <a href="mailto:integrity@startvest.ai">integrity@startvest.ai</a> is always available as a fallback.
          </p>
        </div>
      )}

      <Section title="About you">
        <Field label="Email" required>
          <input
            type="email"
            required
            value={form.contactEmail}
            onChange={(e) => update('contactEmail', e.target.value)}
            placeholder="you@example.com"
            className={inputCls}
          />
        </Field>
        <Field label="Name (optional)">
          <input
            type="text"
            value={form.contactName}
            onChange={(e) => update('contactName', e.target.value)}
            className={inputCls}
          />
        </Field>
      </Section>

      <Section title="The product">
        <Field label="Product name" required>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Acme Decisions"
            className={inputCls}
          />
        </Field>
        <Field label="Slug" required hint="kebab-case, used as /listings/<slug>">
          <input
            type="text"
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
            placeholder="acme-decisions"
            className={inputCls}
          />
        </Field>
        <Field label="One-line description" required hint="10–160 characters">
          <textarea
            required
            minLength={10}
            maxLength={160}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={2}
            className={inputCls}
          />
        </Field>
        <Field label="Homepage URL" required>
          <input
            type="url"
            required
            value={form.homepageUrl}
            onChange={(e) => update('homepageUrl', e.target.value)}
            placeholder="https://acme-decisions.com"
            className={inputCls}
          />
        </Field>
        <Field
          label="INTEGRITY.md URL"
          required
          hint="Public URL where your integrity statement is hosted"
        >
          <input
            type="url"
            required
            value={form.integrityMdUrl}
            onChange={(e) => update('integrityMdUrl', e.target.value)}
            placeholder="https://acme-decisions.com/integrity"
            className={inputCls}
          />
        </Field>
        <Field
          label="Category (optional)"
          hint="Free text. Examples: AI for compliance & trust, AI for HR & people ops"
        >
          <input
            type="text"
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="License">
          <select
            value={form.license}
            onChange={(e) => update('license', e.target.value as License)}
            className={inputCls}
          >
            <option value="open-source">open-source</option>
            <option value="closed-source">closed-source</option>
            <option value="mixed">mixed</option>
          </select>
        </Field>
      </Section>

      <Section title="The operator">
        <Field label="Operator name" required hint="Org or solo founder name">
          <input
            type="text"
            required
            value={form.operatorName}
            onChange={(e) => update('operatorName', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Operator URL (optional)">
          <input
            type="url"
            value={form.operatorUrl}
            onChange={(e) => update('operatorUrl', e.target.value)}
            className={inputCls}
          />
        </Field>
      </Section>

      <Section title="Tier">
        <Field label="Tier">
          <div className="flex gap-4">
            {(['bronze', 'silver'] as const).map((t) => (
              <label key={t} className="flex items-center gap-2 text-surface-800">
                <input
                  type="radio"
                  name="tier"
                  value={t}
                  checked={form.tier === t}
                  onChange={() => update('tier', t)}
                />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </label>
            ))}
          </div>
        </Field>
        {form.tier === 'silver' && (
          <>
            <Field label="Silver credential type">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-surface-800">
                  <input
                    type="radio"
                    name="silverKind"
                    value="methodology-page"
                    checked={form.silverKind === 'methodology-page'}
                    onChange={() => update('silverKind', 'methodology-page')}
                  />
                  Public methodology page with Version + Changelog headings
                </label>
                <label className="flex items-center gap-2 text-surface-800">
                  <input
                    type="radio"
                    name="silverKind"
                    value="integrity-cli"
                    checked={form.silverKind === 'integrity-cli'}
                    onChange={() => update('silverKind', 'integrity-cli')}
                  />
                  Public <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">integrity-cli</code> output
                </label>
              </div>
            </Field>
            {form.silverKind === 'methodology-page' ? (
              <Field label="Methodology page URL" required>
                <input
                  type="url"
                  required
                  value={form.silverMethodologyUrl}
                  onChange={(e) => update('silverMethodologyUrl', e.target.value)}
                  placeholder="https://acme-decisions.com/methodology"
                  className={inputCls}
                />
              </Field>
            ) : (
              <>
                <Field label="integrity-cli output URL" required>
                  <input
                    type="url"
                    required
                    value={form.silverCliOutputUrl}
                    onChange={(e) => update('silverCliOutputUrl', e.target.value)}
                    placeholder="https://acme-decisions.com/integrity-cli-output.json"
                    className={inputCls}
                  />
                </Field>
                <Field label="Commit SHA (optional)" hint="Hex, 7–40 characters">
                  <input
                    type="text"
                    pattern="[0-9a-f]{7,40}"
                    value={form.silverCliCommitSha}
                    onChange={(e) => update('silverCliCommitSha', e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </>
            )}
          </>
        )}
      </Section>

      <Section title="Anything else">
        <Field
          label="Notes for the reviewer (optional)"
          hint="Anything you want considered during review. Up to 2000 characters."
        >
          <textarea
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            maxLength={2000}
            rows={4}
            className={inputCls}
          />
        </Field>
      </Section>

      {/* Honeypot. Real users don't see this; bots fill every input. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => update('website', e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-surface-200 pt-6">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-medium text-white no-underline hover:bg-brand-800 disabled:bg-surface-400"
        >
          {submitting ? 'Submitting…' : 'Submit listing'}
        </button>
        <p className="text-sm text-surface-500">
          Submission becomes a public GitHub issue on the directory&apos;s repo. Review SLA: 14 calendar days.
        </p>
      </div>
    </form>
  );
}

const inputCls =
  'mt-1 w-full rounded-md border border-surface-300 bg-white px-3 py-2 text-base text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-semibold uppercase tracking-widest text-brand-600">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-surface-800">
        {label}
        {required && <span className="ml-1 text-bronze-600">*</span>}
      </span>
      {hint && <span className="mt-0.5 block text-xs text-surface-500">{hint}</span>}
      {children}
    </label>
  );
}
