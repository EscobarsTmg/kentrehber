import Link from 'next/link';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Compass, Search, Sparkles } from 'lucide-react';
import { ImageFrame } from '@kentrehber/ui/ImageFrame';
import { getPublicCatalog } from '@/lib/catalog';
import { getPublicCategories } from '@/lib/public-categories';

export default async function Home() {
  const [catalog, categories] = await Promise.all([getPublicCatalog(), getPublicCategories()]);
  const hasCards = catalog.cards.length > 0;

  return (
    <div className="editorial-page">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-7 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> KENTREHBER / PORTFÖY GALERİSİ</span>
          <span>Bağımsız yaratıcı portföyler · Türkiye</span>
        </div>

        <section className="relative py-9 lg:py-14" aria-labelledby="hero-title">
          <div className="grid items-stretch gap-6 lg:grid-cols-[1.04fr_.96fr] xl:gap-10">
            <div className="flex flex-col justify-between rounded-[22px] border border-border/70 bg-surface/70 px-6 py-9 sm:px-10 sm:py-11 lg:py-14">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
                  <Sparkles aria-hidden className="h-4 w-4" /> {catalog.eyebrow}
                </p>
                <h1 id="hero-title" className="mt-7 max-w-[700px] font-display text-[clamp(2.85rem,5.6vw,5.95rem)] leading-[1.02] tracking-[-0.06em] text-foreground">
                  {catalog.title}
                </h1>
                <p className="mt-6 max-w-xl text-[15px] leading-8 text-muted-foreground sm:text-base">
                  {catalog.description}
                </p>
                <form role="search" action="/ara" method="get" className="mt-9 flex items-stretch gap-2 rounded-xl border border-border bg-background/80 p-2 focus-within:border-accent">
                  <label htmlFor="home-search" className="sr-only">Katalogda ara</label>
                  <span className="flex items-center pl-3 text-muted-foreground"><Search aria-hidden className="h-5 w-5" /></span>
                  <input
                    id="home-search"
                    name="q"
                    maxLength={100}
                    className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    placeholder="Portföy, kategori veya proje ara"
                  />
                  <button type="submit" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-bold text-background transition hover:opacity-90">
                    Ara <ArrowRight aria-hidden className="h-4 w-4" />
                  </button>
                </form>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-xs text-muted-foreground">Keşfet:</span>
                  {categories.length ? categories.slice(0, 4).map((category) => (
                    <Link key={category.slug} href={'/ara?category=' + encodeURIComponent(category.name)}
                      className="rounded-full border border-border px-3 py-2 text-xs font-medium text-foreground/90 transition hover:border-accent">
                      {category.name}
                    </Link>
                  )) : (
                    <>
                      <Link href="/ara" className="rounded-full border border-border px-3 py-2 text-xs hover:border-accent">Koleksiyonlar</Link>
                      <a href="#portfoyler" className="rounded-full border border-border px-3 py-2 text-xs hover:border-accent">Öne çıkanlar</a>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-12 flex items-center gap-3 border-t border-border/70 pt-5 text-[11px] font-semibold uppercase tracking-[0.17em] text-muted-foreground">
                <span className="text-accent">01 / 03</span><span className="h-px w-10 bg-border" /> Tasarım ve yaratıcı çalışmalar
              </div>
            </div>

            <div className="editorial-stage relative min-h-[390px] overflow-hidden rounded-[22px] border border-border/80 lg:min-h-[570px]">
              {catalog.heroImageUrl ? (
                <ImageFrame src={catalog.heroImageUrl} alt="Galeri kapak görseli" eager aspect="portrait" className="absolute inset-0 h-full w-full rounded-none border-0" />
              ) : (
                <div className="absolute inset-0" aria-label="Galeri kapak tasarım alanı" role="img">
                  <div className="editorial-orbit editorial-orbit-one" />
                  <div className="editorial-orbit editorial-orbit-two" />
                  <div className="absolute left-[16%] top-[13%] h-[71%] w-[65%] rotate-[-9deg] rounded-t-[45%] border border-accent/25 bg-accent/5" />
                  <div className="absolute left-[27%] top-[25%] h-[58%] w-[61%] rotate-[9deg] rounded-t-[47%] border border-accent/15 bg-surface/45" />
                  <span className="absolute left-8 top-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">The visual edit / 01</span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/10" />
              <div className="absolute bottom-8 left-7 right-7 flex items-end justify-between gap-4 sm:bottom-10 sm:left-10 sm:right-10">
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">KentRehber Edit</p>
                  <p className="max-w-sm font-display text-3xl leading-tight sm:text-4xl">Özenle seçilmiş bir görsel dünya.</p>
                </div>
                <a href="#portfoyler" aria-label="Portföylere ilerle" className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background/50 text-accent backdrop-blur">
                  <ArrowDownRight aria-hidden className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="portfoyler" aria-labelledby="portfolios-title" className="scroll-mt-28 pb-14 pt-3 sm:pb-20">
          <div className="mb-8 flex flex-col justify-between gap-5 border-b border-border/70 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-accent">02 / Portföy seçkisi</p>
              <h2 id="portfolios-title" className="font-display text-[clamp(2.4rem,4.7vw,4.4rem)] leading-[1.05] tracking-[-0.05em]">
                {catalog.sectionTitle}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{catalog.sectionDescription}</p>
            </div>
            <Link href="/ara" className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-accent/50 px-5 text-sm font-semibold text-accent hover:bg-accent/10">
              Tüm portföyler <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          {hasCards ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
              {catalog.cards.map((card, index) => (
                <article key={index} className="group overflow-hidden rounded-2xl border border-border/80 bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent/60">
                  <div className="relative">
                    <ImageFrame src={card.imageUrl || undefined} alt={card.title + ' portföy görseli'} aspect="portrait" className="rounded-none border-0" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-border/80 bg-background/80 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground backdrop-blur-xl">
                      {card.eyebrow || 'Portföy'}
                    </span>
                    <span className="absolute bottom-4 right-5 font-display text-2xl text-foreground/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="p-3 sm:p-5">
                    <h3 className="font-display text-lg tracking-tight sm:text-2xl">{card.title}</h3>
                    {card.description ? <p className="mt-2 hidden line-clamp-2 min-h-10 text-sm sm:block leading-6 text-muted-foreground">{card.description}</p> : null}
                    <div className="mt-4 hidden items-center justify-between border-t border-border/80 pt-4 text-xs sm:flex font-bold uppercase tracking-[0.14em] text-accent">
                      Seçkide yer alıyor <Compass aria-hidden className="h-4 w-4" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5" aria-label="Portföy kartları henüz yayınlanmadı">
              {['GÖRSEL HİKÂYELER', 'YARATICI PROJELER', 'YENİ SEÇKİLER'].map((label, index) => (
                <div key={label} className="overflow-hidden rounded-2xl border border-border/70 bg-surface">
                  <div className="editorial-card-blank relative aspect-[3/4] overflow-hidden">
                    <span className="absolute left-6 top-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{label}</span>
                    <span aria-hidden className="absolute -bottom-14 -right-4 font-display text-[230px] leading-none tracking-[-0.13em] text-accent/[0.10]">{index + 1}</span>
                  </div>
                  <div className="p-6">
                    <p className="font-display text-2xl">Yeni bir hikâye için alan</p>
                    <p className="mt-2 text-sm text-muted-foreground">Yayınlanmış portföy görselleri burada görüntülenecek.</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mb-16 flex flex-col justify-between gap-6 rounded-2xl border border-border bg-surface px-7 py-9 sm:flex-row sm:items-center sm:px-10 sm:py-10">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">03 / Keşif</p>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">İlham veren projeleri keşfet.</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">Yayınlanan portföyleri ve kategorileri tek bir ekranda incele.</p>
          </div>
          <Link href="/ara" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-lg bg-accent px-6 text-sm font-bold text-background hover:opacity-90">
            Galeride ara <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
