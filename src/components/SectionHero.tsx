import React from "react";

interface SectionHeroProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHero({
  title,
  description,
  className = "",
}: SectionHeroProps) {
  return (
    <section
      className={`bg-linear-to-b from-primary/10 to-background section-padding ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
