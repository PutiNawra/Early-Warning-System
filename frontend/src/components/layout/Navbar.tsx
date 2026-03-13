"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNavLinks } from "@/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-blue-700">
          EWS Flood Guard
        </Link>
        <ul className="flex flex-wrap items-center gap-2">
          {publicNavLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100",
                  pathname === item.href && "bg-blue-50 text-blue-700",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/admin/login"
              className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
