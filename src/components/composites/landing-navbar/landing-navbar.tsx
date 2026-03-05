import * as React from 'react';
import { cn } from '@/lib/utils';

export interface NavLink {
  label: string;
  href: string;
}

export interface LandingNavbarProps {
  logo?: React.ReactNode;
  logoText?: string;
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export const LandingNavbar = React.forwardRef<HTMLElement, LandingNavbarProps>(
  ({ logo, logoText = 'kodda', links = [], ctaLabel, ctaHref, className }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
      <nav
        ref={ref}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 border-b border-[#EBE7E0] bg-[#F5F0EB]/95 backdrop-blur-sm',
          className
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-2">
                {logo}
                {logoText && (
                  <span className="text-xl font-semibold tracking-tight text-[#1C1917]">
                    {logoText}
                  </span>
                )}
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#57534E] transition-colors hover:text-[#1C1917]"
                >
                  {link.label}
                </a>
              ))}
              {ctaLabel && ctaHref && (
                <a
                  href={ctaHref}
                  className="rounded-md bg-[#C4A265] px-4 py-2 text-sm font-medium text-[#1C1917] transition-colors hover:bg-[#C4A265]/90"
                >
                  {ctaLabel}
                </a>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-[#57534E] hover:bg-[#EBE7E0] hover:text-[#1C1917] md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-[#EBE7E0] bg-[#F5F0EB] md:hidden">
            <div className="space-y-1 px-4 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-[#57534E] hover:bg-[#EBE7E0] hover:text-[#1C1917]"
                >
                  {link.label}
                </a>
              ))}
              {ctaLabel && ctaHref && (
                <a
                  href={ctaHref}
                  className="mt-2 block rounded-md bg-[#C4A265] px-3 py-2 text-center text-base font-medium text-[#1C1917]"
                >
                  {ctaLabel}
                </a>
              )}
            </div>
          </div>
        )}
      </nav>
    );
  }
);

LandingNavbar.displayName = 'LandingNavbar';
