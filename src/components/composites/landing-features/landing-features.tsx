import * as React from 'react';
import { cn } from '@/lib/utils';

export interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface LandingFeaturesProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export const LandingFeatures = React.forwardRef<HTMLElement, LandingFeaturesProps>(
  ({ badge, headline, subheadline, features, columns = 3, className }, ref) => {
    const gridCols = {
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-2 lg:grid-cols-3',
      4: 'md:grid-cols-2 lg:grid-cols-4',
    };

    return (
      <section
        ref={ref}
        className={cn('bg-[#EBE7E0] py-16 sm:py-24', className)}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          {(badge || headline || subheadline) && (
            <div className="mx-auto max-w-2xl text-center">
              {badge && (
                <span className="inline-flex items-center rounded-full bg-[#C4A265]/20 px-4 py-1.5 text-sm font-medium text-[#1C1917]">
                  {badge}
                </span>
              )}
              {headline && (
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1C1917] sm:text-4xl">
                  {headline}
                </h2>
              )}
              {subheadline && (
                <p className="mt-4 text-lg text-[#57534E]">{subheadline}</p>
              )}
            </div>
          )}

          {/* Features Grid */}
          <div
            className={cn(
              'mt-12 grid gap-8',
              gridCols[columns]
            )}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative rounded-xl border border-[#F5F0EB] bg-[#F5F0EB] p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {feature.icon && (
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#C4A265]/10 text-[#C4A265]">
                    {feature.icon}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-[#1C1917]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[#57534E]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

LandingFeatures.displayName = 'LandingFeatures';
