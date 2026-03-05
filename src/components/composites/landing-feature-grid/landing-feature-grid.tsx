import * as React from 'react';
import { cn } from '@/lib/utils';

export interface Feature {
  /** Ícone do feature */
  icon?: React.ReactNode;
  /** Título do feature */
  title: string;
  /** Descrição do feature */
  description: string;
}

export interface LandingFeatureGridProps {
  /** Label acima do título */
  eyebrow?: string;
  /** Título da seção */
  title?: string;
  /** Descrição da seção */
  description?: string;
  /** Lista de features */
  features: Feature[];
  /** Número de colunas */
  columns?: 2 | 3 | 4;
  /** Variante de fundo */
  variant?: 'default' | 'muted';
  /** Classes customizadas */
  className?: string;
}

export function LandingFeatureGrid({
  eyebrow,
  title,
  description,
  features,
  columns = 3,
  variant = 'default',
  className,
}: LandingFeatureGridProps) {
  return (
    <section
      className={cn(
        'w-full py-20 md:py-28',
        variant === 'muted' && 'bg-[var(--background-alt)]',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        {(eyebrow || title || description) && (
          <div className="mb-16 max-w-2xl">
            {eyebrow && (
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-[var(--muted)]">{description}</p>
            )}
          </div>
        )}

        {/* Grid */}
        <div
          className={cn(
            'grid gap-8 md:gap-12',
            {
              'md:grid-cols-2': columns === 2,
              'md:grid-cols-2 lg:grid-cols-3': columns === 3,
              'md:grid-cols-2 lg:grid-cols-4': columns === 4,
            }
          )}
        >
          {features.map((feature, index) => (
            <div key={index} className="group">
              {feature.icon && (
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--background-alt)] text-[var(--foreground)] transition-colors group-hover:bg-[var(--foreground)] group-hover:text-white">
                  {feature.icon}
                </div>
              )}
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-[var(--muted)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
