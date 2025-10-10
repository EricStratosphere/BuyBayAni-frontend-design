import type { Metadata } from "next";
import Header from "../components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuyBayAni — Fresh farm produce",
  description: "Buy directly from Filipino farms — fresh, certified, and sustainable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="site-main container">{children}</main>
      </body>
    </html>
  );
}
