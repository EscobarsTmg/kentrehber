import Link from 'next/link';
import { ArrowLeft, ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { ImageFrame } from '@kentrehber/ui/ImageFrame';
import { getPublicCatalog } from '@/lib/catalog';
import { getPublicCategories } from '@/lib/public-categories';

export const metadata = {
  title: 'Portföylerde ara',
  description: 'Yayınlanan yaratıcı portföyleri proje adı ve kategoriye göre keşfedin.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const query = (typeof params.q === 'string' ? params.q : '').trim().slice(0, 100);
  const category = (typeof params.category === 'string' ? params.category : '').trim().slice(0, 80);
  const [catalog, categories] = await Promise.all([getPublicCatalog(), getPublicCategories()]);
  const needle = query.toLocaleLowerCase('tr');
  const matching = catalog.cards.filter((card) => {
    const text = [card.title, card.eyebrow, card.description].join(' ').toLocaleLowerCase('tr');
    return (!needle || text.includes(needle)) &&
      (!category || card.eyebrow.toLocaleLowerCase('tr') === category.toLocaleLowerCase('tr'));
  });

  return (
    <div className="editorial-page min-h-[75dvh]">
      <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-9 sm:px-7 lg:px-10">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent">
          <ArrowLeft aria-hidden className="h-4 w-4" /> Ana sayfaya dön
        </Link>
        <header className="mt-5 border-b border-border pb-9 sm:pb-11">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-accent">KentRehber / Galeri</p>
          <h1 className="max-w-3xl font-display text-[clamp(2.8rem,6vw,5.6rem)] leading-[1.04] tracking-[-0.055em]">
            Yeni bir fikir keşfet.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Yayınlanmış yaratıcı portföyleri isim, proje veya kategori üzerinden arayın.
          </p>
        </header>

        <form action="/ara" method="get" className="mt-7 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[minmax(0,1fr)_220px_auto] sm:items-end sm:p-5">
          <label className="block text-xs font-semibold text-muted-foreground">
            Arama
            <span className="mt-2 flex min-h-12 items-center gap-3 rounded-lg border border-border bg-background px-4 focus-within:border-accent">
              <Search aria-hidden className="h-4 w-4 text-accent" />
              <input
                name="q"
                type="search"
                maxLength={100}
                defaultValue={query}
                className="w-full min-w-0 bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                placeholder="Başlık veya anahtar kelime"
              />
            </span>
          </label>
          <label className="block text-xs font-semibold text-muted-foreground">
            Kategori
            <span className="mt-2 flex min-h-12 items-center gap-3 rounded-lg border border-border bg-background px-3 focus-within:border-accent">
              <SlidersHorizontal aria-hidden className="h-4 w-4 shrink-0 text-accent" />
              <select name="category" defaultValue={category} className="min-w-0 w-full bg-transparent py-3 text-sm text-foreground outline-none">
                <option className="bg-background" value="">Tüm kategoriler</option>
                {categories.map((item) => <option className="bg-background" key={item.slug} value={item.name}>{item.name}</option>)}
                {category && !categories.some((item) => item.name === category) ? (
                  <option className="bg-background" value={category}>{category}</option>
                ) : null}
              </select>
            </span>
          </label>
          <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-bold text-background hover:opacity-90">
            Sonuçları göster <ArrowRight aria-hidden className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-11 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Koleksiyon</p>
            <h2 className="font-display text-3xl tracking-tight">Yayınlanan portföyler</h2>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">{matching.length} sonuç</span>
        </div>

        {matching.length ? (
          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
            {matching.map((card, index) => (
              <article key={index} className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative">
                  <ImageFrame src={card.imageUrl || undefined} alt={card.title + ' görseli'} aspect="portrait" className="rounded-none border-0" />
                  <span className="absolute left-4 top-4 rounded-full border border-border bg-background/85 px-3 py-2 text-[10px] font-bold uppercase tracking-widest">{card.eyebrow || 'Portföy'}</span>
                </div>
                <div className="p-3 sm:p-6">
                  <h3 className="font-display text-lg sm:text-2xl">{card.title}</h3>
                  {card.description ? <p className="mt-3 hidden text-sm leading-7 text-muted-foreground sm:block">{card.description}</p> : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="editorial-card-blank mt-7 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-border px-6 py-12 text-center">
            <Search aria-hidden className="mb-5 h-9 w-9 text-accent" />
            <h3 className="relative font-display text-3xl">Henüz eşleşen portföy bulunmuyor.</h3>
            <p className="relative mt-3 max-w-md text-sm leading-7 text-muted-foreground">
              Daha genel bir arama yapabilirsiniz. Yeni içerikler yayınlandığında burada görünür.
            </p>
            <Link href="/ara" className="relative mt-7 inline-flex min-h-11 items-center rounded-full border border-accent/50 px-5 text-sm font-semibold text-accent hover:bg-accent/10">
              Filtreleri temizle
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
