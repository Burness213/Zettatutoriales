import { prisma } from "./db";

export async function getCategories() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { programs: true } } }
  });
  return categories.map((c: any) => ({
    ...c,
    count: c._count.programs
  }));
}

export async function getPrograms() {
  return await prisma.program.findMany({
    include: { category: true }
  });
}

export async function getCategoryBySlug(slug: string) {
  return await prisma.category.findUnique({ where: { slug } });
}

export async function getProgramBySlug(slug: string) {
  return await prisma.program.findUnique({
    where: { slug },
    include: { category: true }
  });
}

export async function getProgramsByCategory(categorySlug: string) {
  return await prisma.program.findMany({
    where: { category: { slug: categorySlug } },
    include: { category: true }
  });
}

export async function getFeaturedPrograms() {
  return await prisma.program.findMany({
    take: 4,
    orderBy: { downloads: 'desc' },
    include: { category: true }
  });
}

export async function getRelatedPrograms(currentSlug: string, categorySlug: string) {
  return await prisma.program.findMany({
    where: {
      category: { slug: categorySlug },
      NOT: { slug: currentSlug }
    },
    take: 4,
    include: { category: true }
  });
}

export function formatDownloads(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export async function getYoutubeVideos() {
  return await prisma.youtubeVideo.findMany({
    orderBy: { publishedAt: 'desc' }
  });
}
