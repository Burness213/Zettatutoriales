import { getCategories } from "@/lib/data";
import AdminCategoriasClient from "./client";

export const metadata = { title: "Categorías | Admin" };
export const dynamic = "force-dynamic";

export default async function AdminCategoriasPage() {
  const categories = await getCategories();

  return <AdminCategoriasClient initialCategories={categories} />;
}
