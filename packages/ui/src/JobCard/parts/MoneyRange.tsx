import { cn } from '../../utils/cn';
import type { SalaryRange } from '../types';

const LAKH = 100_000;
const CRORE = 10_000_000;

function lpa(value: number): string {
  if (Math.abs(value) >= CRORE) {
    const cr = value / CRORE;
    return `${cr.toFixed(cr % 1 === 0 ? 0 : 1)}Cr`;
  }
  const l = value / LAKH;
  return `${l.toFixed(l % 1 === 0 ? 0 : 1)}L`;
}

export interface MoneyRangeProps {
  salary?: SalaryRange;
  className?: string;
}

export function MoneyRange({ salary, className }: MoneyRangeProps) {
  if (!salary) {
    return (
      <span className={cn('text-body-s text-fg-muted', className)}>
        Salary undisclosed
      </span>
    );
  }

  const confidenceFilled = salary.confidence >= 0.7;
  const sym = salary.currency === 'USD' ? '$' : salary.currency === 'EUR' ? '€' : '₹';

  return (
    <span className={cn('inline-flex items-center gap-1.5 text-fg-primary', className)}>
      <span className="font-semibold tabular">
        {sym}
        {lpa(salary.min)}–{lpa(salary.max)}
      </span>
      <span
        aria-label={`Salary confidence ${confidenceFilled ? 'high' : 'low'}`}
        className={cn(
          'inline-block h-1.5 w-1.5 rounded-pill border border-current',
          confidenceFilled ? 'bg-current' : 'bg-transparent',
        )}
      />
    </span>
  );
}
