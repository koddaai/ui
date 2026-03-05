import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LandingCtaProps {
  headline: string;
  subheadline?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  variant?: 'light' | 'dark' | 'gold';
  className?: string;
}

export const LandingCta = React.forwardRef<HTMLElement, LandingCtaProps>(
  ({ headline, subheadline, primaryCta, secondaryCta, variant = 'gold', className }, ref) => {
    const variants = {
      light: {
        bg: 'bg-[#F5F0EB]',
        headline: 'text-[#1C1917]',
        subheadline: 'text-[#57534E]',
        primaryBtn: 'bg-[#1C1917] text-[#F5F0EB] hover:bg-[#1C1917]/90',
        secondaryBtn: 'border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917]/5',
      },
      dark: {
        bg: 'bg-[#1C1917]',
        headline: 'text-[#F5F0EB]',
        subheadline: 'text-[#F5F0EB]/70',
        primaryBtn: 'bg-[#C4A265] text-[#1C1917] hover:bg-[#C4A265]/90',
        secondaryBtn: 'border-[#F5F0EB] text-[#F5F0EB] hover:bg-[#F5F0EB]/10',
      },
      gold: {
        bg: 'bg-[#C4A265]',
        headline: 'text-[#1C1917]',
        subheadline: 'text-[#1C1917]/70',
        primaryBtn: 'bg-[#1C1917] text-[#F5F0EB] hover:bg-[#1C1917]/90',
        secondaryBtn: 'border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917]/10',
      },
    };

    const styles = variants[variant];

    return (
      <section
        ref={ref}
        className={cn('py-16 sm:py-24', styles.bg, className)}
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className={cn(
              'text-3xl font-bold tracking-tight sm:text-4xl',
              styles.headline
            )}
          >
            {headline}
          </h2>

          {subheadline && (
            <p className={cn('mt-4 text-lg', styles.subheadline)}>
              {subheadline}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className={cn(
                    'inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium shadow-sm transition-colors',
                    styles.primaryBtn
                  )}
                >
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className={cn(
                    'inline-flex items-center justify-center rounded-md border bg-transparent px-6 py-3 text-base font-medium transition-colors',
                    styles.secondaryBtn
                  )}
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }
);

LandingCta.displayName = 'LandingCta';
