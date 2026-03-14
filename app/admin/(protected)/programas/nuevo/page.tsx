import { getCategories } from "@/lib/data";
import NuevoProgramaForm from "./form";

export const metadata = { title: "Nuevo Programa" };

export default async function NuevoProgramaPage() {
  const categories = await getCategories();
  
  return <NuevoProgramaForm categories={categories} />;
}
