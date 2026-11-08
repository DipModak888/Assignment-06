"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Logo from "@/assets/logo.png";


type NavbarProps = {
  activePage: "workouts" | "my-plan";
};

const Navbar = ({ activePage }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 

  return (
    <nav className="relative w-full border-b border-white/10 bg-[#0b0f10] text-white">
      <div className="container mx-auto flex h-[72px] items-center px-4 md:px-8">

        {/* Logo */}
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="FitLog Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />

            <span className="text-lg font-extrabold tracking-tight">
              FITLOG
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 justify-center sm:flex">
          <div className="flex items-center gap-2">

            {/* Workouts */}
            <Link
              href="/"
              className={
                activePage === "workouts"
                  ? "rounded-full bg-lime-400 px-5 py-2 font-semibold text-black"
                  : "rounded-full px-5 py-2 font-semibold text-white hover:bg-white/10"
              }
            >
              Workouts
            </Link>

            {/* My Plan */}
            <Link
              href="/my-plan?tab=plan"
              className={
                activePage === "my-plan"
                  ? "rounded-full bg-lime-400 px-5 py-2 font-semibold text-black"
                  : "rounded-full px-5 py-2 font-semibold text-white hover:bg-white/10"
              }
            >
              My Plan
            </Link>

          </div>
        </div>

        {/* Plan + Saved */}
        <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">

          {/* Plan */}
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-lime-400"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-xs font-bold text-black">

            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-lime-400"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/30 px-1 text-xs font-bold text-white">

            </span>
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md border border-white/20 px-3 py-2 text-sm"
          >
            Menu
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0b0f10] px-4 py-4 sm:hidden">

          <div className="flex flex-col gap-2">

            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Workouts
            </Link>

            <Link
              href="/my-plan?tab=plan"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-semibold hover:bg-white/10"
            >
              My Plan
            </Link>

            <Link
              href="/my-plan?tab=plan"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-semibold hover:bg-white/10"
            >
 
            </Link>

            <Link
              href="/my-plan?tab=saved"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-semibold hover:bg-white/10"
            >
    
            </Link>

          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;