import { redirect } from 'next/navigation';

// Permanent permalink for the framework v1 spec. Citations should use this URL
// rather than the canonical home. If the canonical home ever moves (e.g. off
// claritylift.ai), flip the destination here in one line and every external
// citation keeps working.
//
// This permalink is the long-arc URL stability commitment. The redirect target
// is allowed to change; the URL is not.

const CANONICAL_V1_URL = 'https://claritylift.ai/framework/v1';

export default function FrameworkV1Permalink() {
  redirect(CANONICAL_V1_URL);
}
