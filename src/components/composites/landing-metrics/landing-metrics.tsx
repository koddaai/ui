import * as React from 'react';
import { cn } from '@/lib/utils';

export interface Metric {
  value: string;
  label: string;
  description?: string;
}

export interface LandingMetricsProps {
  headline?: string;
  subheadline?: string;
  metrics: Metric[];
  variant?: 'light' | 'dark';
  className?: string;
}

export const LandingMetrics = React.forwardRef<HTMLElement, LandingMetricsProps>(
  ({ headline, subheadline, metrics, variant = 'dark', className }, ref) => {
    const isDark = variant === 'dark';

    return (
      <section
        ref={ref}
        className={cn(
          'py-16 sm:py-24',
          isDark ? 'bg-[#1C1917]' : 'bg-[#F5F0EB]',
          className
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          {(headline || subheadline) && (
            <div className="mx-auto max-w-2xl text-center">
              {headline && (
                <h2
                  className={cn(
                    'text-3xl font-bold tracking-tight sm:text-4xl',
                    isDark ? 'text-[#F5F0EB]' : 'text-[#1C1917]'
                  )}
                >
                  {headline}
                </h2>
              )}
              {subheadline && (
                <p
                  className={cn(
                    'mt-4 text-lg',
                    isDark ? 'text-[#F5F0EB]/70' : 'text-[#57534E]'
                  )}
                >
                  {subheadline}
                </p>
              )}
            </div>
          )}

          {/* Metrics Grid */}
          <div
            className={cn(
              'mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4',
              (headline || subheadline) ? '' : 'mt-0'
            )}
          >
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={cn(
                  'text-center',
                  isDark ? 'border-[#F5F0EB]/10' : 'border-[#EBE7E0]',
                  index > 0 ? 'lg:border-l lg:pl-8' : ''
                )}
              >
                <div
                  className={cn(
                    'text-4xl font-bold tracking-tight sm:text-5xl',
                    isDark ? 'text-[#C4A265]' : 'text-[#1C1917]'
                  )}
                >
                  {metric.value}
                </div>
                <div
                  className={cn(
                    'mt-2 text-lg font-medium',
                    isDark ? 'text-[#F5F0EB]' : 'text-[#1C1917]'
                  )}
                >
                  {metric.label}
                </div>
                {metric.description && (
                  <p
                    className={cn(
                      'mt-1 text-sm',
                      isDark ? 'text-[#F5F0EB]/60' : 'text-[#57534E]'
                    )}
                  >
                    {metric.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

LandingMetrics.displayName = 'LandingMetrics';
