/** Apertura de sección: eyebrow centrado con líneas + heading + texto muted. */
export function SectionHead({
  eyebrow,
  title,
  children,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={`mb-12 ${center ? "mx-auto max-w-[640px] text-center" : ""}`}>
      <p className={`eyebrow ${center ? "" : "eyebrow-left"}`}>{eyebrow}</p>
      <h2 className="text-gradient mt-5 text-[32px] leading-[1.16] sm:text-[44px]">{title}</h2>
      {children && <p className="mt-4 text-[17px] leading-relaxed text-mist">{children}</p>}
    </div>
  );
}
