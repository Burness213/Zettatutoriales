import { getPrograms } from "@/lib/data";
import AdminProgramasClient from "./client";

export const metadata = { title: "Programas | Admin" };
export const dynamic = "force-dynamic";

export default async function AdminProgramasPage() {
  const programs = await getPrograms();
  return <AdminProgramasClient initialPrograms={programs} />;
}
