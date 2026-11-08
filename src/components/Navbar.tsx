"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext } from "react";

import logo from "@/assets/logo.png";

const Navbar = () => {
    const pathname = usePathname();
    const myPlanCount = length || 0;
    const savedCount = length || 0;

    const navClass = (path: string) => {
        const isActive = pathname === path;

        return isActive
            ? "rounded-full bg-[#baff00] px-5 py-2 text-[12px] font-semibold text-[#0a0b0d] shadow-[0_0_20px_-4px_rgba(186,255,0,0.5)] transition"
            : "rounded-full px-5 py-2 text-[12px] font-medium text-[#9a9ca4] transition-colors duration-200 hover:bg-white/[0.06] hover:text-white";
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0a0b0d]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6">

                <Link href="/" className="flex items-center gap-2.5">
                    <Image
                        src={logo}
                        alt="FITLOG"
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                    />

                    <span className="text-[17px] font-bold tracking-tight text-white">
                        FITLOG
                    </span>
                </Link>

                <nav className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] p-1 md:flex">

                    <Link href="/" className={navClass("/")}>
                        Workouts
                    </Link>

                    <Link href="/component/my-plan" className={navClass("/component/my-plan")}>
                        My Plan
                    </Link>

                </nav>

                <div className="hidden items-center gap-6 text-[12px] md:flex">

                    <Link href="/component/my-plan" className="group flex items-center gap-2 text-[#9a9ca4] transition-colors duration-200 hover:text-white">
                        <span>Plan</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#baff00] px-1.5 text-[10px] font-bold text-[#0a0b0d] transition-transform duration-200 group-hover:scale-110">
                            {myPlanCount}
                        </span>
                    </Link>

                    <Link href="/component/my-plan" className="group flex items-center gap-2 text-[#9a9ca4] transition-colors duration-200 hover:text-white">
                        <span>Saved</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/[0.12] px-1.5 text-[10px] text-[#9a9ca4] transition-colors duration-200 group-hover:border-[#baff00] group-hover:text-[#baff00]">
                            {savedCount}
                        </span>
                    </Link>

                </div>

                <div className="dropdown dropdown-end md:hidden">

                    <button tabIndex={0} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white transition-colors duration-200 hover:bg-white/[0.08]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <ul tabIndex={0} className="menu dropdown-content z-[100] mt-3 w-52 rounded-2xl border border-white/[0.08] bg-[#0d0e11]/95 p-2 shadow-2xl backdrop-blur-xl">
                        <li>
                            <Link href="/" className={pathname === "/" ? "text-[#baff00]" : "text-[#9a9ca4] hover:text-[#baff00]"}>Workouts</Link>
                        </li>

                        <li>
                            <Link href="/component/my-plan" className={pathname === "/component/my-plan" ? "text-[#baff00]" : "text-[#9a9ca4] hover:text-[#baff00]"}>
                                My Plan
                            </Link>
                        </li>

                        <li>
                            <Link href="/component/my-plan">
                                Plan
                                <span className="ml-auto rounded-full bg-[#baff00] px-2 py-0.5 text-[10px] font-bold text-[#0a0b0d]">
                                    {myPlanCount}
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/component/my-plan">
                                Saved
                                <span className="ml-auto rounded-full border border-white/[0.12] px-2 py-0.5 text-[10px]">
                                    {savedCount}
                                </span>
                            </Link>
                        </li>
                    </ul>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;