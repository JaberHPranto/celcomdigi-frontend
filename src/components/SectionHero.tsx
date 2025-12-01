import React from "react";

interface SectionHeroProps {
    title: string;
    description?: string;
    className?: string;
}

export function SectionHero({ title, description, className = "" }: SectionHeroProps) {
    return (
        <section className={`bg-blue-50 py-20 ${className}`}>
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
                {description && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>}
            </div>
        </section>
    );
}
