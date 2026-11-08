"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { useFitlog } from "@/context/FitlogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitlog();

  const links = [
    { href: "/", label: "Workouts", active: pathname === "/" || pathname.startsWith("/workout") },
    { href: "/my-plan", label: "My Plan", active: pathname.startsWith("/my-plan") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c1f26] bg-[#0c0d10]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="FitLog home">
          <Image src={logo} alt="FitLog logo" width={28} height={28} className="h-7 w-7 object-contain" priority />
          <span className="hidden font-display text-lg font-bold tracking-[0.05em] text-white sm:inline">FITLOG</span>
        </Link>

        <nav className="flex items-center">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors sm:px-4 ${l.active ? "bg-[#1a2312] font-semibold text-[#c2f800]" : "font-medium text-[#9ca3af] hover:text-white"
                }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/my-plan" className="flex items-center gap-2" aria-label={`Plan: ${plan.length}`}>
            <span className="hidden text-xs font-medium text-[#d1d5db] sm:inline">Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c2f800] px-1 text-[11px] font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2" aria-label={`Saved: ${saved.length}`}>
            <span className="hidden text-xs font-medium text-[#9ca3af] sm:inline">Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#2d313b] px-1 text-[11px] font-medium text-[#d1d5db]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
