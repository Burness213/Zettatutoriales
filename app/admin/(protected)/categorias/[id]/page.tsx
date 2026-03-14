import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import EditarCategoriaForm from "./form";

export const metadata = { title: "Editar Categoría" };

export default async function EditarCategoriaPage({ params }: { params: { id: string } }) {
  const category = await prisma.category.findUnique({
    where: { id: params.id }
  });

  if (!category) return notFound();

  return <EditarCategoriaForm category={category} />;
}
