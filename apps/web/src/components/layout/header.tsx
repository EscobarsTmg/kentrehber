import Link from 'next/link';
import { ArrowUpRight, Aperture, Search, SlidersHorizontal } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/75 bg-background/95 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[74px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-10">
        <Link href="/" aria-label="KentRehber ana sayfa"
          className="flex items-center gap-3 text-xl font-bold tracking-[-0.045em] sm:text-2xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/35 bg-accent/10 text-accent">
            <Aperture aria-hidden className="h-5 w-5" />
          </span>
          KentRehber<span className="-ml-2 text-accent">.</span>
        </Link>
        <nav aria-label="Ana menü" className="flex items-center gap-1 sm:gap-3">
          <Link href="/#portfoyler" className="hidden min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:text-accent md:inline-flex">
            Portföyler
          </Link>
          <Link href="/ara" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-foreground hover:text-accent">
            <Search aria-hidden className="h-4 w-4" />
            <span className="hidden sm:inline">Keşfet</span>
            <span className="sr-only sm:hidden">Katalogda ara</span>
          </Link>
          <Link href="/admin" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-3 text-xs font-semibold text-foreground transition hover:border-accent sm:px-5 sm:text-sm">
            <SlidersHorizontal aria-hidden className="h-4 w-4" />
            <span className="hidden sm:inline">İçerik yönetimi</span>
            <span className="sm:hidden">Panel</span>
            <ArrowUpRight aria-hidden className="hidden h-4 w-4 text-accent sm:inline" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
