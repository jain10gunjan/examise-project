import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/Footer";
import SharingStick from "@/components/ui/SharingStick";
// import Navbar from "../components/ui/Navbar";
import Script from "next/script";
import { AuthProvider } from "../components/context/Authcontext";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../components/ui/Navbar"), {
  ssr: false,
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Examise",
  description: "Your One Stop For All MCQs Needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2873018653456315"
        crossOrigin="anonymous"
      ></Script>

      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <SharingStick />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
