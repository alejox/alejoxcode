import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-grotesk" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const fontVariables = `${inter.variable} ${grotesk.variable} ${jetbrains.variable}`;
