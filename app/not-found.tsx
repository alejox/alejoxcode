import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-mono text-sm text-live">● SEÑAL PERDIDA</p>
      <h1 className="mt-4 text-6xl font-bold">404</h1>
      <p className="mt-4 text-muted">Esta escena no existe. Quizás la fuente fue eliminada.</p>
      <Link href="/" className="bg-brand mt-8 inline-block rounded-xl px-6 py-3 font-semibold">Volver al inicio</Link>
    </div>
  );
}
