import { NextResponse } from "next/server";
import { countDownload, getRelease } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const release = await getRelease(id);
  if (!release) return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 });

  // Contenido demo: no hay archivo real
  if (release.file_url === "#") {
    return NextResponse.redirect(new URL("/obs?demo=1", req.url));
  }

  await countDownload(id);
  return NextResponse.redirect(release.file_url, 302);
}
