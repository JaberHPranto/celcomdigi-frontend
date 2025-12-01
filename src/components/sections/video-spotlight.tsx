export function VideoSpotlight() {
  return (
    <section
      id="video"
      className="border-b border-border/80 bg-background py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
            Watch & learn
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            CelcomDigi One | All-in-one plan
          </h2>
          <p className="text-sm text-muted-foreground">
            Discover how CelcomDigi One brings fibre, mobile and devices into
            one seamless experience.
          </p>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-3xl border border-border/60 bg-black shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/5TdYeKvYRHY"
            title="CelcomDigi One | All-in-one plan"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
