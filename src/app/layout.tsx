import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/Footer";
import SharingStick from "@/components/ui/SharingStick";
import Navbar from "../components/ui/Navbar";
import Script from "next/script";

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
      <div className="">
        <body className={inter.className}>
          <Navbar />
          {children}
          <SharingStick />
        </body>
        <Footer />
      </div>
    </html>
  );
}
