import type { SVGProps } from "react";
import type { Platform } from "@/lib/types";

type P = SVGProps<SVGSVGElement>;
const base = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor" } as const;

export const DownloadIcon = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
);

export const ArrowIcon = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

export const SearchIcon = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const WindowsIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 5.5 10.5 4.5v7H3zm0 13 7.5 1v-7H3zm8.5 1.2L21 21v-8.5h-9.5zm0-15.4v7.2H21V3z" />
  </svg>
);
export const AppleIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z" />
  </svg>
);
export const LinuxIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2c-2.2 0-3.6 1.9-3.6 4.6 0 1.4.3 2.3-.6 3.6-1.2 1.6-3 4.1-3 6.7 0 .6.1 1.1.3 1.6-.6.4-1.3 1-1.1 1.8.3 1.1 2.6.8 3.7 1.5 1.1.7 2.4.4 2.9-.5.5.1 1.5.2 2.8 0 .5.9 1.8 1.2 2.9.5 1.1-.7 3.4-.4 3.7-1.5.2-.8-.5-1.4-1.1-1.8.2-.5.3-1 .3-1.6 0-2.6-1.8-5.1-3-6.7-.9-1.3-.6-2.2-.6-3.6C15.6 3.9 14.2 2 12 2zm-1.5 4.5c.4 0 .7.5.7 1.1 0 .6-.3 1.1-.7 1.1s-.7-.5-.7-1.1c0-.6.3-1.1.7-1.1zm3 0c.4 0 .7.5.7 1.1 0 .6-.3 1.1-.7 1.1s-.7-.5-.7-1.1c0-.6.3-1.1.7-1.1zM12 9.6c.9 0 2 .6 2 1s-1.1 1.1-2 1.1-2-.7-2-1.1 1.1-1 2-1z" />
  </svg>
);
export const GlobeIcon = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
  </svg>
);

export function PlatformIcon({ platform, ...p }: { platform: Platform } & P) {
  if (platform === "windows") return <WindowsIcon {...p} />;
  if (platform === "macos") return <AppleIcon {...p} />;
  if (platform === "linux") return <LinuxIcon {...p} />;
  return <GlobeIcon {...p} />;
}

export const GithubIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
  </svg>
);
export const YoutubeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.8 3-5.8 3z" />
  </svg>
);
export const TwitchIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 2 2.5 6v14h5v2.5h2.8l2.5-2.5h4L22 15V2H4zm16 12-3.2 3.2h-4.5l-2.6 2.6v-2.6H6V4h14v10zm-4.6-6.3h-2v5.5h2V7.7zm-5.3 0h-2v5.5h2V7.7z" />
  </svg>
);
export const XIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M17.8 2.5h3.3l-7.2 8.2 8.5 11.3h-6.6l-5.2-6.8-6 6.8H1.3L9 13.2.9 2.5h6.8l4.7 6.2 5.4-6.2zm-1.2 17.5h1.8L6.5 4.4h-2l12.1 15.6z" />
  </svg>
);
export const InstagramIcon = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);
export const TiktokIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9a7.3 7.3 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5z" />
  </svg>
);

export const SOCIAL_ICONS: Record<string, (p: P) => React.JSX.Element> = {
  github: GithubIcon,
  youtube: YoutubeIcon,
  twitch: TwitchIcon,
  x: XIcon,
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
};
