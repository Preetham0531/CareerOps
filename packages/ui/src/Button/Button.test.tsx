import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button, IconButton } from './Button';

describe('Button', () => {
  it('renders children and forwards click', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Send DM</Button>);
    const btn = screen.getByRole('button', { name: /send dm/i });
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables click when loading', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Sending
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('disables click when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Apply
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders leading and trailing icons', () => {
    render(
      <Button leadingIcon={<span data-testid="lead">→</span>} trailingIcon={<span data-testid="trail">←</span>}>
        Apply
      </Button>,
    );
    expect(screen.getByTestId('lead')).toBeInTheDocument();
    expect(screen.getByTestId('trail')).toBeInTheDocument();
  });
});

describe('IconButton', () => {
  it('requires aria-label and renders icon', () => {
    render(
      <IconButton aria-label="Save job">
        <span data-testid="bookmark">★</span>
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: /save job/i });
    expect(btn).toBeInTheDocument();
    expect(screen.getByTestId('bookmark')).toBeInTheDocument();
  });
});
