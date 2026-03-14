import { prisma } from "@/lib/db";
import { getCategories } from "@/lib/data";
import { notFound } from "next/navigation";
import EditarProgramaForm from "./form";

export const metadata = { title: "Editar Programa" };
export const dynamic = "force-dynamic";

export default async function EditarProgramaPage({ params }: { params: { id: string } }) {
  const program = await prisma.program.findUnique({
    where: { id: params.id }
  });

  if (!program) return notFound();

  const categories = await getCategories();

  return <EditarProgramaForm program={program} categories={categories} />;
}
