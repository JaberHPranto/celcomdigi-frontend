import Link from "next/link";

export function AnnouncementBanner() {
  return (
    <section id="network-status" className="bg-[#fbede9] py-3 text-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-center text-primary md:flex-row md:items-center md:justify-center md:gap-4">
        <p className="font-semibold uppercase tracking-wide text-white bg-[#ef4e2c] px-2 py-1 rounded-md text-sm">
          Notice
        </p>
        <p className="text-foreground/90">
          Network maintenance has been successfully completed. Thank you for
          your patience.
        </p>
        <Link
          href="https://help.celcomdigi.com/en/support/home"
          className="inline-flex items-center justify-center rounded-full border border-primary/50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary hover:text-white"
        >
          Get support
        </Link>
      </div>
    </section>
  );
}
