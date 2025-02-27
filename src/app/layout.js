import { DM_Sans, Inter } from "next/font/google";
import { Toaster } from "@/components/global/Toaster";
import "./globals.css";

const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Limeblock",
  description: "Limeblock allows your users to use AI for in-app actions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="LimeblockLogo.png" />
      </head>
      <body
        className={`${dm.variable} ${inter.variable} bg-white text-black antialiased`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
