import { forwardRef, useState } from 'react';

import { Input, type InputProps } from './Input';

/**
 * Money input — Indian conventions.
 *
 * Per docs/frontend/03-typography.md numerics + 11-components-composite.md MoneyRange:
 *   - Auto-render LPA shorthand on display (₹18.5L) when ≥ 100,000
 *   - Indian comma grouping (₹18,50,000) on absolute display
 *   - Parses LPA shorthand on input ("18L" → 1800000, "1.5cr" → 15000000)
 */

export interface MoneyInputProps extends Omit<InputProps, 'value' | 'onChange' | 'trailingChip' | 'type'> {
  /** Value in absolute rupees (the canonical form on the wire). */
  value?: number;
  onChange?: (value: number | undefined) => void;
  unit?: 'lpa' | 'absolute';
}

const LAKH = 100_000;
const CRORE = 10_000_000;

/** Format absolute rupees per the India numbering system: 12,34,567. */
function formatAbsolute(value: number): string {
  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(value).toString();
  if (abs.length <= 3) return sign + abs;
  const last3 = abs.slice(-3);
  const rest = abs.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `${sign}${grouped},${last3}`;
}

/** Format LPA shorthand: 1,850,000 → "18.5L"; 15,000,000 → "1.5Cr". */
function formatLpa(value: number): string {
  if (Math.abs(value) >= CRORE) {
    const cr = value / CRORE;
    return `${cr.toFixed(cr % 1 === 0 ? 0 : 2)}Cr`;
  }
  if (Math.abs(value) >= LAKH) {
    const l = value / LAKH;
    return `${l.toFixed(l % 1 === 0 ? 0 : 1)}L`;
  }
  return formatAbsolute(value);
}

/** Parse "18L" / "1.5cr" / "1800000" / "18,50,000". Returns undefined if unparseable. */
export function parseMoney(input: string): number | undefined {
  const trimmed = input.trim().replace(/\s+/g, '').replace(/,/g, '').replace(/^₹/, '');
  if (!trimmed) return undefined;

  const lpaMatch = /^(-?\d*\.?\d+)l$/i.exec(trimmed);
  if (lpaMatch) return Math.round(parseFloat(lpaMatch[1]!) * LAKH);

  const crMatch = /^(-?\d*\.?\d+)cr$/i.exec(trimmed);
  if (crMatch) return Math.round(parseFloat(crMatch[1]!) * CRORE);

  const numeric = parseFloat(trimmed);
  return Number.isFinite(numeric) ? Math.round(numeric) : undefined;
}

export const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ value, onChange, unit = 'lpa', placeholder = '18L', ...props }, ref) => {
    const [draft, setDraft] = useState<string>(() => {
      if (value === undefined) return '';
      return unit === 'lpa' ? formatLpa(value) : formatAbsolute(value);
    });
    const [focused, setFocused] = useState(false);

    return (
      <Input
        ref={ref}
        inputMode="decimal"
        leadingIcon={<span className="font-medium">₹</span>}
        trailingChip={unit === 'lpa' ? 'LPA' : undefined}
        placeholder={placeholder}
        value={draft}
        onFocus={() => setFocused(true)}
        onChange={(e) => {
          const raw = e.target.value;
          setDraft(raw);
          const parsed = parseMoney(raw);
          onChange?.(parsed);
        }}
        onBlur={() => {
          setFocused(false);
          if (value !== undefined) {
            setDraft(unit === 'lpa' ? formatLpa(value) : formatAbsolute(value));
          }
        }}
        // Show formatted on blur, raw input while focused
        {...props}
      />
    );
  },
);
MoneyInput.displayName = 'MoneyInput';
