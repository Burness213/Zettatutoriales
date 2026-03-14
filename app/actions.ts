"use server"

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";

export async function deleteProgram(slug: string) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
  await prisma.program.delete({ where: { slug } });
  revalidatePath("/admin/programas");
  revalidatePath("/programas");
}

export async function deleteCategory(slug: string) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
  await prisma.category.delete({ where: { slug } });
  revalidatePath("/admin/categorias");
  revalidatePath("/categorias");
}

export async function createProgram(data: any) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
  await prisma.program.create({
    data: {
      slug: data.slug,
      name: data.name,
      icon: data.icon,
      imageUrl: data.imageUrl || null,
      youtubeUrl: data.youtubeUrl || null,
      version: data.version,
      categoryId: data.categoryId,
      size: data.size,
      badge: data.badge || null,
      badgeColor: data.badgeColor || null,
      description: data.description,
      longDescription: data.longDescription,
      requirements: data.requirements,
      tags: data.tags,
      releaseDate: data.releaseDate,
      downloadUrl: data.downloadUrl,
      // defaults for downloads/rating
    }
  });
  revalidatePath("/admin/programas");
  revalidatePath("/programas");
  revalidatePath("/");
}

export async function updateProgram(id: string, data: any) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
  await prisma.program.update({
    where: { id },
    data
  });
  revalidatePath("/admin/programas");
  revalidatePath("/programas");
  revalidatePath("/");
}

export async function createCategory(data: any) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
  await prisma.category.create({
    data: {
      slug: data.slug,
      name: data.name,
      icon: data.icon,
      color: data.color,
      description: data.description,
    }
  });
  revalidatePath("/admin/categorias");
  revalidatePath("/categorias");
  revalidatePath("/");
}

export async function updateCategory(id: string, data: any) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
  await prisma.category.update({
    where: { id },
    data
  });
  revalidatePath("/admin/categorias");
  revalidatePath("/categorias");
  revalidatePath("/");
}

export async function createYoutubeVideo(data: any) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
  await prisma.youtubeVideo.create({
    data: {
      title: data.title,
      videoId: data.videoId,
      thumbnail: data.thumbnail,
      duration: data.duration,
      views: data.views,
      publishedAt: data.publishedAt,
      url: data.url
    }
  });
  revalidatePath("/admin/youtube");
  revalidatePath("/youtube");
  revalidatePath("/");
}

export async function deleteYoutubeVideo(id: string) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
  await prisma.youtubeVideo.delete({ where: { id } });
  revalidatePath("/admin/youtube");
  revalidatePath("/youtube");
  revalidatePath("/");
}

export async function submitRating(programId: string, score: number) {
  const program = await prisma.program.findUnique({ where: { id: programId } });
  if (!program) throw new Error("Program not found");

  const newCount = program.ratingCount + 1;
  const newRating = ((program.rating * program.ratingCount) + score) / newCount;

  await prisma.program.update({
    where: { id: programId },
    data: {
      ratingCount: newCount,
      rating: Math.round(newRating * 10) / 10
    }
  });

  revalidatePath("/programas");
  revalidatePath(`/programas/${program.slug}`);
}
