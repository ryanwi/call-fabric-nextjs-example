import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/ui/header"
import Footer from "@/app/ui/footer"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Call Fabric Next App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="container mx-auto px-4">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
