import type { Metadata } from "next";
import { Plugins } from "@/components/Plugins";

export const metadata: Metadata = {
  title: "Plugins — Alejandro Grajales",
  description:
    "Plugins I build and publish independently. Free, open source, with downloads for every platform.",
};

export default function Page() {
  return <Plugins locale="en" />;
}
