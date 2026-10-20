import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="eyebrow">Señal perdida</p>
      <h1 className="text-gradient glow-text mt-6 text-[96px] leading-none">404</h1>
      <p className="mt-6 text-mist">Esta escena no existe. Quizás la fuente fue eliminada.</p>
      <Link href="/" className="btn-ghost btn-lg mt-10">Volver al inicio</Link>
    </div>
  );
}
