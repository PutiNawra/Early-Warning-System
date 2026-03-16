"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { landingNavLinks } from "@/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [isHeroMode, setIsHeroMode] = useState(false);
  const isHomePage = pathname === "/";

  const links = useMemo(() => landingNavLinks, []);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const heroSection = document.getElementById("home");
    if (!heroSection) {
      return;
    }

    const updateHeroMode = () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      const navbarHeight = 76;
      setIsHeroMode(heroBottom > navbarHeight + 24);
    };

    const frameId = window.requestAnimationFrame(updateHeroMode);
    window.addEventListener("scroll", updateHeroMode, { passive: true });
    window.addEventListener("resize", updateHeroMode);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateHeroMode);
      window.removeEventListener("resize", updateHeroMode);
    };
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const sectionElements = links
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.15, 0.3, 0.6, 1],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [isHomePage, links]);

  return (
    <header
      className={cn(
        "z-40 transition-colors duration-300",
        isHomePage ? "fixed inset-x-0 top-0" : "sticky top-0",
        isHomePage && isHeroMode
          ? "border-b border-transparent bg-white/8 backdrop-blur-sm"
          : "border-b border-blue-100 bg-white/95 shadow-sm backdrop-blur",
      )}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={cn(
            "text-lg font-bold transition-colors",
            isHomePage && isHeroMode ? "text-white" : "text-blue-700",
          )}
        >
          EWS Flood Guard
        </Link>
        <ul className="flex flex-wrap items-center gap-1 sm:gap-1.5">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isHomePage && isHeroMode
                    ? "text-blue-50/95 hover:bg-white/15 hover:text-white"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700",
                  isHomePage && activeSection === item.id && (isHeroMode ? "bg-white/15 text-white" : "bg-blue-50 text-blue-700"),
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full opacity-0 transition-opacity",
                    isHomePage && isHeroMode ? "bg-white" : "bg-blue-600",
                    isHomePage && activeSection === item.id && "opacity-100",
                  )}
                />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/login"
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
                isHomePage && isHeroMode
                  ? "border border-white/45 text-white hover:bg-white/15"
                  : "border border-blue-200 text-blue-700 hover:bg-blue-50",
              )}
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
