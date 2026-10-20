import Image from "next/image";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src="/img/logo.png" alt="AlejoxCode" width={size} height={size} priority />
      <span className="font-display text-[17px] font-medium tracking-tight text-frost">AlejoxCode</span>
    </span>
  );
}
