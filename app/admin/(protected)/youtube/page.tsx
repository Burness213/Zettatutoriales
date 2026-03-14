import { getYoutubeVideos } from "@/lib/data";
import AdminYoutubeClient from "./client";

export const metadata = { title: "Gestión de Videos YouTube" };
export const dynamic = "force-dynamic";

export default async function AdminYoutubePage() {
  const videos = await getYoutubeVideos();

  return (
    <div>
      <AdminYoutubeClient initialVideos={videos} />
    </div>
  );
}
