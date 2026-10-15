import { z } from 'zod';

const imageUrl = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password;
    } catch {
      return false;
    }
  }, 'Görsel bağlantısı HTTPS adresi olmalı');

const showcaseCard = z.object({
  title: z.string().trim().min(1).max(100),
  eyebrow: z.string().trim().max(60),
  description: z.string().trim().max(240),
  imageUrl,
}).strict();

export const catalogContentSchema = z.object({
  eyebrow: z.string().trim().min(1).max(80),
  title: z.string().trim().min(1).max(130),
  description: z.string().trim().max(400),
  heroImageUrl: imageUrl,
  sectionTitle: z.string().trim().min(1).max(100),
  sectionDescription: z.string().trim().max(300),
  cards: z.array(showcaseCard).max(6),
}).strict();

export type CatalogContent = z.infer<typeof catalogContentSchema>;

export const defaultCatalogContent: CatalogContent = {
  eyebrow: 'EDITORIAL / KREATİF PORTFÖYLER',
  title: 'Her portföy, farklı bir hikâye.',
  description: 'Moda, fotoğraf ve yaratıcı projelerden özenle seçilmiş çalışmalar. Güçlü görsellerle yeni fikirler keşfedin.',
  heroImageUrl: '',
  sectionTitle: 'Öne çıkan portföyler',
  sectionDescription: 'Yeni çalışmalar yayınlandıkça bu seçki genişleyecek.',
  cards: [],
};

export function normalizeCatalogContent(value: unknown): CatalogContent {
  const result = catalogContentSchema.safeParse(value);
  return result.success ? result.data : structuredClone(defaultCatalogContent);
}
