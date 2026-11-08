import Image from "next/image";
import BannerImage from "@/assets/banner.png";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Hero = () => {
    return (
        <section className="bg-[#0a0b0d] px-6 py-10">
            <div className="relative mx-auto flex min-h-[360px] max-w-7xl items-center justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-[#121317] px-8 py-10 sm:px-12 lg:px-16">

                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#baff00]/[0.08] blur-3xl" />

                <div className="relative z-10 max-w-[620px]">

                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#baff00]">
                        Workout Library
                    </p>

                    <h1 className="max-w-[600px] text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Train with intent. Log
                        <br />
                        every set.
                    </h1>

                    <p className={`${inter.className} mt-6 max-w-[520px] text-[12px] leading-[1.7] text-[#9a9ca4] sm:text-[13px]`}>
                        FitLog is a dark, no-nonsense gym companion: pick a lift,
                        lock it into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>
                    <Link href="/">
                        <button className="mt-6 rounded-full bg-[#baff00] px-6 py-3 text-[11px] font-bold uppercase text-[#0a0b0d] transition duration-200 hover:bg-[#c9ff33] hover:shadow-[0_0_24px_-2px_rgba(186,255,0,0.35)]">
                            Browse Workouts
                        </button>
                    </Link>
                </div>

                <div className="relative hidden h-[330px] w-[420px] shrink-0 sm:block lg:h-[340px] lg:w-[480px]">

                    <Image
                        src={BannerImage}
                        alt="Workout illustration"
                        fill
                        priority
                        sizes="(max-width: 1024px) 420px, 480px"
                        className="object-contain object-center"
                    />

                </div>
            </div>
        </section>
    );
};

export default Hero;