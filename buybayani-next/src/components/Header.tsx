'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  // Close sidebar with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen]);

  return (
    <>
      <header className="site-header">
        <div className="menu-bar container">
          <div className="brand">
            <Link href="/" className="brand-link">
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
            </Link>
          </div>

          <div className="search-wrap nav-adjacent">
            <label className="visually-hidden" htmlFor="site-search">Search products</label>
            <input id="site-search" className="search-box nav-search-box" placeholder="Search produce, farms..." />
          </div>

          <nav className="main-nav" aria-label="Main navigation">
            <button 
              className="nav-toggle" 
              aria-expanded={sidebarOpen}
              onClick={toggleSidebar}
            >
              ☰
            </button>
            <ul className="nav-list desktop-nav">
              <li><Link href="/">Home</Link></li>
              <li><a href="#produce">Produce</a></li>
              <li><Link href="/farmers">Farmers</Link></li>
              <li><a href="#about">About</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="icon-png logo-wrap">
              <Image
                className="site-logo"
                src="/buybayani (2).png"
                alt="BuyBayAni logo"
                width={48}
                height={48}
              />
            </div>
            <div className="site-title">BuyBayAni</div>
          </div>
          <button 
            className="sidebar-close" 
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div className="sidebar-search">
          <label className="visually-hidden" htmlFor="sidebar-search">Search products</label>
          <input id="sidebar-search" className="search-box" placeholder="Search produce, farms..." />
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <ul className="sidebar-nav-list">
            <li><Link href="/" onClick={closeSidebar}>Home</Link></li>
            <li><a href="#produce" onClick={closeSidebar}>Produce</a></li>
            <li><Link href="/farmers" onClick={closeSidebar}>Farmers</Link></li>
            <li><a href="#about" onClick={closeSidebar}>About</a></li>
          </ul>
        </nav>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}