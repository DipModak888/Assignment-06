import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl font-bold text-[#c2f800] sm:text-8xl">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-[0.035em] text-white">Page not found</h1>
      <p className="mt-2 text-sm text-[#9ca3af]">That page doesn&apos;t exist. Let&apos;s get you back to the gym.</p>
      <Link href="/" className="mt-6 rounded-full bg-[#c2f800] px-6 py-2.5 text-xs font-semibold text-black">
        Go to workouts
      </Link>
    </div>
  );
}
