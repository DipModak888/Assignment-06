import Image from "next/image";
import { ArrowDown } from "lucide-react";
import banner from "@/assets/banner.png";

export default function Banner() {
  return (
    <section className="flex flex-col items-center gap-10 rounded-2xl border border-[#222630] bg-[#15171d] p-6 sm:p-10 lg:flex-row lg:justify-between lg:gap-[162px] lg:p-14">
      <div className="flex max-w-[558px] flex-col gap-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#c2f800]">WORKOUT LIBRARY</p>
        <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-[-0.025em] text-white sm:text-5xl lg:text-[60px]">
          TRAIN WITH INTENT. LOG <br className="hidden lg:block" />
          EVERY SET.
        </h1>
        <p className="max-w-[512px] text-base leading-6 text-[#9ca3af]">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the
          week&apos;s work add up.
        </p>
        <div className="pt-2">
          <a
            href="#library"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-[#c2f800] px-6 text-xs font-bold uppercase tracking-[0.025em] text-black shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:brightness-95"
          >
            BROWSE WORKOUTS
            <ArrowDown size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>
      <Image
        src={banner}
        alt="Athlete training with weights"
        priority
        className="h-auto w-full max-w-[334px] shrink-0 rounded-2xl object-cover lg:h-[334px] lg:w-[334px]"
      />
    </section>
  );
}
