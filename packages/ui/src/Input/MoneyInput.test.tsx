import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MoneyInput, parseMoney } from './MoneyInput';

describe('parseMoney', () => {
  it('parses LPA shorthand', () => {
    expect(parseMoney('18L')).toBe(1_800_000);
    expect(parseMoney('1.5L')).toBe(150_000);
    expect(parseMoney('22l')).toBe(2_200_000);
  });

  it('parses Crore shorthand', () => {
    expect(parseMoney('1.5Cr')).toBe(15_000_000);
    expect(parseMoney('2cr')).toBe(20_000_000);
  });

  it('parses Indian comma-grouped numbers', () => {
    expect(parseMoney('18,50,000')).toBe(1_850_000);
    expect(parseMoney('₹ 18,50,000')).toBe(1_850_000);
  });

  it('parses plain numbers', () => {
    expect(parseMoney('1800000')).toBe(1_800_000);
  });

  it('returns undefined for garbage', () => {
    expect(parseMoney('')).toBeUndefined();
    expect(parseMoney('hello')).toBeUndefined();
  });
});

describe('MoneyInput', () => {
  it('emits parsed value on change', async () => {
    const onChange = vi.fn();
    render(<MoneyInput onChange={onChange} label="Target LPA" />);
    const input = screen.getByLabelText(/target lpa/i);
    await userEvent.type(input, '22L');
    expect(onChange).toHaveBeenLastCalledWith(2_200_000);
  });
});
