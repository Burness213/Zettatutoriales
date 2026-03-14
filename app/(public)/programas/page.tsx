import { getPrograms, getCategories } from "@/lib/data";
import ProgramasClient from "./client";

export const metadata = { title: "Programas" };

export default async function ProgramasPage() {
  const programs = await getPrograms();
  const categories = await getCategories();

  return <ProgramasClient programs={programs} categories={categories} />;
}
