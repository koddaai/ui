import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface LandingFooterProps {
  logo?: React.ReactNode;
  logoText?: string;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  copyright?: string;
  className?: string;
}

export const LandingFooter = React.forwardRef<HTMLElement, LandingFooterProps>(
  (
    {
      logo,
      logoText = 'kodda',
      description,
      sections = [],
      socialLinks = [],
      copyright,
      className,
    },
    ref
  ) => {
    const currentYear = new Date().getFullYear();
    const defaultCopyright = `${currentYear} kodda. Todos os direitos reservados.`;

    return (
      <footer
        ref={ref}
        className={cn('border-t border-[#EBE7E0] bg-[#F5F0EB]', className)}
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {logo}
                {logoText && (
                  <span className="text-xl font-semibold tracking-tight text-[#1C1917]">
                    {logoText}
                  </span>
                )}
              </div>
              {description && (
                <p className="max-w-xs text-[#57534E]">{description}</p>
              )}
              {socialLinks.length > 0 && (
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="text-[#57534E] transition-colors hover:text-[#1C1917]"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Link Sections */}
            {sections.length > 0 && (
              <div className="mt-12 grid grid-cols-2 gap-8 lg:col-span-2 lg:mt-0">
                {sections.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1C1917]">
                      {section.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="text-[#57534E] transition-colors hover:text-[#1C1917]"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Copyright */}
          <div className="mt-12 border-t border-[#EBE7E0] pt-8">
            <p className="text-center text-sm text-[#57534E]">
              {copyright || defaultCopyright}
            </p>
          </div>
        </div>
      </footer>
    );
  }
);

LandingFooter.displayName = 'LandingFooter';
