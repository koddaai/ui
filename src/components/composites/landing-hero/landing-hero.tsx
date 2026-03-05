import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LandingHeroProps {
  badge?: string;
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
  image?: React.ReactNode;
  className?: string;
}

export const LandingHero = React.forwardRef<HTMLElement, LandingHeroProps>(
  ({ badge, headline, subheadline, primaryCta, secondaryCta, image, className }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative overflow-hidden bg-[#F5F0EB] pt-24 pb-16 sm:pt-32 sm:pb-24',
          className
        )}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 h-[800px] w-[800px] rounded-full bg-[#C4A265]/5" />
          <div className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-[#C4A265]/5" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            {/* Content */}
            <div className="lg:col-span-6 lg:flex lg:flex-col lg:justify-center">
              {badge && (
                <div className="mb-6">
                  <span className="inline-flex items-center rounded-full border border-[#C4A265]/30 bg-[#C4A265]/10 px-4 py-1.5 text-sm font-medium text-[#1C1917]">
                    {badge}
                  </span>
                </div>
              )}

              <h1 className="text-4xl font-bold tracking-tight text-[#1C1917] sm:text-5xl lg:text-6xl">
                {headline}
              </h1>

              {subheadline && (
                <p className="mt-6 text-lg leading-relaxed text-[#57534E] sm:text-xl">
                  {subheadline}
                </p>
              )}

              {(primaryCta || secondaryCta) && (
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-4">
                  {primaryCta && (
                    <a
                      href={primaryCta.href}
                      className="inline-flex items-center justify-center rounded-md bg-[#1C1917] px-6 py-3 text-base font-medium text-[#F5F0EB] shadow-sm transition-colors hover:bg-[#1C1917]/90"
                    >
                      {primaryCta.label}
                    </a>
                  )}
                  {secondaryCta && (
                    <a
                      href={secondaryCta.href}
                      className="inline-flex items-center justify-center rounded-md border border-[#1C1917] bg-transparent px-6 py-3 text-base font-medium text-[#1C1917] transition-colors hover:bg-[#1C1917]/5"
                    >
                      {secondaryCta.label}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Image */}
            {image && (
              <div className="mt-12 lg:col-span-6 lg:mt-0">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[#C4A265]/20 to-transparent" />
                  <div className="relative overflow-hidden rounded-xl border border-[#EBE7E0] bg-white shadow-lg">
                    {image}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

LandingHero.displayName = 'LandingHero';
