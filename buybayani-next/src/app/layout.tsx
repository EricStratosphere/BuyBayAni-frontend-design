import type { Metadata } from "next";
import Image from "next/image";
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
        <header className="site-header">
          <div className="menu-bar container">
            <div className="brand">
              <a href="#" className="brand-link">
                <div className="icon-png logo-wrap">
                  <Image
                    className="site-logo"
                    src="/buybayani (2).png"
                    alt="BuyBayAni logo"
                    width={64}
                    height={64}
                    priority
                  />
                </div>
                <div className="site-title">BuyBayAni</div>
              </a>
            </div>

            <div className="search-wrap nav-adjacent">
              <label className="visually-hidden" htmlFor="site-search">Search products</label>
              <input id="site-search" className="search-box nav-search-box" placeholder="Search produce, farms..." />
            </div>

            <nav className="main-nav" aria-label="Main navigation">
              <button className="nav-toggle" aria-expanded="false">☰</button>
              <ul className="nav-list">
                <li><a href="#">Home</a></li>
                <li><a href="#produce">Produce</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="site-main container">{children}</main>
      </body>
    </html>
  );
}
