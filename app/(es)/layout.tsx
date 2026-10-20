import { fontVariables } from "@/lib/fonts";
import { rootMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata = rootMetadata("es");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontVariables}>
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
