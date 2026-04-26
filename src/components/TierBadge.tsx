import { clsx } from 'clsx';

export type Tier = 'bronze' | 'silver';

const styles: Record<Tier, string> = {
  bronze: 'bg-bronze-50 text-bronze-700 ring-bronze-200',
  silver: 'bg-silver-50 text-silver-700 ring-silver-200',
};

const labels: Record<Tier, string> = {
  bronze: 'Bronze',
  silver: 'Silver',
};

export function TierBadge({ tier, className }: { tier: Tier; className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset',
        styles[tier],
        className,
      )}
      aria-label={`${labels[tier]} tier`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {labels[tier]}
    </span>
  );
}
