import { NextResponse } from "next/server";
import { getPrograms, getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const programs = await getPrograms();
    const categories = await getCategories();
    return NextResponse.json({ programs, categories });
  } catch (error) {
    return NextResponse.json({ error: "No se pudieron obtener los datos" }, { status: 500 });
  }
}
