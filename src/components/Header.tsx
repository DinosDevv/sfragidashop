"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/useToast";
import { categories } from "@/lib/categories";
import Icon from "./Icon";
import Logo from "./Logo";

const homeLink = { href: "/", label: "Αρχική" };
const pageLinks = [
  { href: "/checkout", label: "Checkout" },
  { href: "/contact", label: "Επικοινωνία" },
];
const shopLinks = [
  { href: "/shop", label: "Όλα τα προϊόντα" },
  ...categories.map((c) => ({ href: `/shop/${c.slug}`, label: c.name })),
];

export default function Header() {
  const { count } = useCart();
  const toast = useToast();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const close = () => {
    setMenuOpen(false);
    setShopOpen(false);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const desktopLink = (href: string) =>
    `border-b-2 py-1 transition-colors ${isActive(href) ? "border-red-600" : "border-transparent hover:text-gray-600"}`;
  const mobileLink = (href: string) => `block py-3 ${isActive(href) ? "text-red-600" : ""}`;

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Μενού"
            aria-expanded={menuOpen}
            className="-ml-2 p-2 md:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
          <Link href="/" onClick={close}>
            <Logo />
          </Link>
        </div>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 font-medium md:flex lg:gap-8">
          <li>
            <Link href={homeLink.href} className={desktopLink(homeLink.href)}>{homeLink.label}</Link>
          </li>
          <li className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
            <button
              onClick={() => setShopOpen((o) => !o)}
              aria-expanded={shopOpen}
              className={`flex items-center gap-1 ${desktopLink("/shop")}`}
            >
              Shop
              <Icon name="chevronDown" className={`h-4 w-4 transition-transform ${shopOpen ? "rotate-180" : ""}`} />
            </button>
            {shopOpen && (
              <div className="absolute left-0 top-full pt-2">
                <ul className="w-52 rounded-md border bg-white py-2 shadow-lg">
                  {shopLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={close} className="block px-4 py-2 hover:bg-gray-100">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          {pageLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={desktopLink(l.href)}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <Link href="/cart" onClick={close} aria-label={`Καλάθι (${count})`} className="-mr-2 p-2">
          {/* Re-keyed on each new toast so the bump animation replays when an item is added. */}
          <span key={toast?.id ?? 0} className={`relative block ${toast ? "animate-bump motion-reduce:animate-none" : ""}`}>
            <Icon name="cart" className="h-7 w-7" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </span>
        </Link>
      </nav>

      {/* Mobile nav */}
      {menuOpen && (
        <ul className="border-t px-4 py-2 font-medium md:hidden">
          <li>
            <Link href={homeLink.href} onClick={close} className={mobileLink(homeLink.href)}>{homeLink.label}</Link>
          </li>
          <li>
            <button
              onClick={() => setShopOpen((o) => !o)}
              aria-expanded={shopOpen}
              className={`flex w-full items-center justify-between py-3 ${isActive("/shop") ? "text-red-600" : ""}`}
            >
              Shop
              <Icon name="chevronDown" className={`h-5 w-5 transition-transform ${shopOpen ? "rotate-180" : ""}`} />
            </button>
            {shopOpen && (
              <ul className="pb-2 pl-4 font-normal">
                {shopLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={close} className="block py-2">{l.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {pageLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={close} className={mobileLink(l.href)}>{l.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
