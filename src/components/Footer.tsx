import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1d24] bg-[#090a0d] py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
          <span className="font-display text-sm font-bold tracking-[0.05em] text-white">FITLOG</span>
        </div>
        <p className="text-center text-xs text-[#6b7280]">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
