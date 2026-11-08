import Image from "next/image";
import Logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0b0f10] text-white">
      <div className="container mx-auto flex min-h-[80px] items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="FitLog Logo"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />

          <span className="text-sm font-extrabold tracking-tight">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;