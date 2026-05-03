import { redirect } from 'next/navigation';

// Latest published version of the brief.md spec. Update when a new
// version ships; the version-specific URL stays canonical (immutable
// per version segment) for tools that pin their parser to a version.
export default function BriefMdSpecIndex() {
  redirect('/specs/brief-md/v0.1.0');
}
