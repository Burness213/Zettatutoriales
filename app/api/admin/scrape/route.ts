import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  // 1. Verify Authentication
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { url } = await req.json();

    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ error: "URL inválida" }, { status: 400 });
    }

    // 2. Fetch the target URL
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching URL: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // 3. Extract Metadata
    const title = $('meta[property="og:title"]').attr("content") || $("title").text() || "";
    const description = $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content") || "";
    const image = $('meta[property="og:image"]').attr("content") || "";
    
    // Clean up title (remove common suffixes like " - SiteName")
    const cleanTitle = title.split(" - ")[0].split(" | ")[0].trim();

    return NextResponse.json({
      title: cleanTitle,
      description,
      image,
    });
    
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json({ error: "No se pudo extraer información de esa URL" }, { status: 500 });
  }
}
