'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

import { cn } from '../utils/cn';

/**
 * Component-level error boundary. Renders a dignified card; never shows
 * raw stack to user. Caller should wire reportError to Sentry.
 *
 * Per docs/frontend/13-empty-error-loading.md tier-2 error pattern.
 */

interface ErrorBoundaryProps {
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  reset = (): void => this.setState({ error: null });

  override render(): ReactNode {
    if (this.state.error) {
      return (
        this.props.fallback?.(this.state.error, this.reset) ?? (
          <DefaultFallback onReload={this.reset} />
        )
      );
    }
    return this.props.children;
  }
}

function DefaultFallback({ onReload }: { onReload: () => void }) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-start gap-3 rounded-md border border-border-subtle bg-bg-surface p-6',
      )}
    >
      <p className="font-display text-display-s font-semibold text-fg-primary">
        Something went wrong rendering this.
      </p>
      <p className="text-body-m text-fg-secondary">
        This is on us. The team has been notified.
      </p>
      <button
        type="button"
        onClick={onReload}
        className="text-body-s font-medium text-brand underline-offset-4 hover:underline"
      >
        Try again
      </button>
    </div>
  );
}
