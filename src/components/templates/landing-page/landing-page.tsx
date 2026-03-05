import * as React from 'react';
import { cn } from '@/lib/utils';
import { LandingNavbar, type NavLink } from '../../composites/landing-navbar';
import { LandingHero } from '../../composites/landing-hero';
import { LandingFeatures, type Feature } from '../../composites/landing-features';
import { LandingMetrics, type Metric } from '../../composites/landing-metrics';
import { LandingCta } from '../../composites/landing-cta';
import { LandingFooter, type FooterSection, type SocialLink } from '../../composites/landing-footer';

export interface LandingPageProps {
  // Navbar
  logo?: React.ReactNode;
  logoText?: string;
  navLinks?: NavLink[];
  navCtaLabel?: string;
  navCtaHref?: string;

  // Hero
  heroBadge?: string;
  heroHeadline: string;
  heroSubheadline?: string;
  heroPrimaryCta?: { label: string; href: string };
  heroSecondaryCta?: { label: string; href: string };
  heroImage?: React.ReactNode;

  // Features
  featuresBadge?: string;
  featuresHeadline?: string;
  featuresSubheadline?: string;
  features?: Feature[];
  featuresColumns?: 2 | 3 | 4;

  // Metrics
  metricsHeadline?: string;
  metricsSubheadline?: string;
  metrics?: Metric[];
  metricsVariant?: 'light' | 'dark';

  // CTA
  ctaHeadline?: string;
  ctaSubheadline?: string;
  ctaPrimaryCta?: { label: string; href: string };
  ctaSecondaryCta?: { label: string; href: string };
  ctaVariant?: 'light' | 'dark' | 'gold';

  // Footer
  footerDescription?: string;
  footerSections?: FooterSection[];
  footerSocialLinks?: SocialLink[];
  footerCopyright?: string;

  className?: string;
  children?: React.ReactNode;
}

export const LandingPage = React.forwardRef<HTMLDivElement, LandingPageProps>(
  (
    {
      logo,
      logoText,
      navLinks,
      navCtaLabel,
      navCtaHref,
      heroBadge,
      heroHeadline,
      heroSubheadline,
      heroPrimaryCta,
      heroSecondaryCta,
      heroImage,
      featuresBadge,
      featuresHeadline,
      featuresSubheadline,
      features,
      featuresColumns,
      metricsHeadline,
      metricsSubheadline,
      metrics,
      metricsVariant,
      ctaHeadline,
      ctaSubheadline,
      ctaPrimaryCta,
      ctaSecondaryCta,
      ctaVariant,
      footerDescription,
      footerSections,
      footerSocialLinks,
      footerCopyright,
      className,
      children,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('min-h-screen', className)}>
        <LandingNavbar
          logo={logo}
          logoText={logoText}
          links={navLinks}
          ctaLabel={navCtaLabel}
          ctaHref={navCtaHref}
        />

        <main>
          <LandingHero
            badge={heroBadge}
            headline={heroHeadline}
            subheadline={heroSubheadline}
            primaryCta={heroPrimaryCta}
            secondaryCta={heroSecondaryCta}
            image={heroImage}
          />

          {features && features.length > 0 && (
            <LandingFeatures
              badge={featuresBadge}
              headline={featuresHeadline}
              subheadline={featuresSubheadline}
              features={features}
              columns={featuresColumns}
            />
          )}

          {metrics && metrics.length > 0 && (
            <LandingMetrics
              headline={metricsHeadline}
              subheadline={metricsSubheadline}
              metrics={metrics}
              variant={metricsVariant}
            />
          )}

          {children}

          {ctaHeadline && (
            <LandingCta
              headline={ctaHeadline}
              subheadline={ctaSubheadline}
              primaryCta={ctaPrimaryCta}
              secondaryCta={ctaSecondaryCta}
              variant={ctaVariant}
            />
          )}
        </main>

        <LandingFooter
          logo={logo}
          logoText={logoText}
          description={footerDescription}
          sections={footerSections}
          socialLinks={footerSocialLinks}
          copyright={footerCopyright}
        />
      </div>
    );
  }
);

LandingPage.displayName = 'LandingPage';
