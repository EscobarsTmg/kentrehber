import Link from 'next/link';
import { Aperture, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-surface">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-7 md:grid-cols-[1fr_auto] lg:px-10">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-bold tracking-tight text-foreground">
            <Aperture aria-hidden className="h-5 w-5 text-accent" />
            <span className="text-xl">KentRehber<span className="text-accent">.</span></span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            Moda, sanat ve yaratıcı üretim dünyasından profesyonel portföylerin dijital galerisi.
          </p>
        </div>
        <nav aria-label="Alt menü" className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground sm:gap-7">
          <Link href="/#portfoyler" className="hover:text-accent">Portföyler</Link>
          <Link href="/ara" className="hover:text-accent">Keşfet</Link>
          <Link href="/ilkeler" className="hover:text-accent">Yayın ilkeleri</Link>
          <Link href="/admin" className="inline-flex items-center gap-1 hover:text-accent">
            Yönetim <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:px-7 lg:px-10">
          <span>© KentRehber</span><span>Görsel katalog · Türkiye</span>
        </div>
      </div>
    </footer>
  );
}
