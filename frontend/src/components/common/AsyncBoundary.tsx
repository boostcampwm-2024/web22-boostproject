import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

interface AsyncBoundaryProps {
  pendingFallback: React.ReactNode;
  rejectedFallback: (error: Error) => React.ReactNode;
  children: React.ReactNode;
}

export const AsyncBoundary = forwardRef<any, AsyncBoundaryProps>(
  ({ pendingFallback, rejectedFallback, children }, ref) => {
    // error 추후에 작업예정
    const [, setError] = useState<Error | null>(null);

    // Use `useImperativeHandle` to expose a `reset` method to parent component
    useImperativeHandle(ref, () => ({
      reset: () => setError(null)
    }));

    const handleError = (error: Error) => {
      setError(error);
    };

    return (
      <ErrorBoundary FallbackComponent={({ error }) => rejectedFallback(error)} onError={handleError}>
        <Suspense fallback={pendingFallback}>{children}</Suspense>
      </ErrorBoundary>
    );
  }
);

AsyncBoundary.displayName = 'AsyncBoundary';
