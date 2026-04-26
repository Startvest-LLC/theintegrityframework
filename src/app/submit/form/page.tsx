import type { Metadata } from 'next';
import Link from 'next/link';
import { SubmissionForm } from '@/components/SubmissionForm';

export const metadata: Metadata = {
  title: 'Submit a product (form)',
  description:
    'Hosted submission form for the Integrity Framework Directory. Fills out the listing JSON and creates a tracking issue on the directory\'s public repo.',
  alternates: { canonical: '/submit/form' },
};

export default function SubmitFormPage() {
  return (
    <article className="container-wide py-16 md:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Submit · form
        </p>
        <h1>Submit your product for review</h1>
        <p className="mt-4 text-lg text-surface-600">
          Submission becomes a public GitHub issue on the directory&apos;s repo. The reviewer
          responds within 14 calendar days with an approval, change request, or rejection. See{' '}
          <Link href="/submit">/submit</Link> for the manual paths (email, GitHub PR) and the full
          requirements before submitting.
        </p>
      </header>

      <section className="mt-10 max-w-3xl">
        <SubmissionForm />
      </section>
    </article>
  );
}
