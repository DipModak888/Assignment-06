import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workoutTypes";

export default function WorkoutCard({ workout: w }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${w.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#222630] bg-[#15171d] transition hover:-translate-y-0.5 hover:border-[#c2f800]/40"
    >
      <div className="h-48 w-full overflow-hidden bg-[#1f232b]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={w.image} alt={w.name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {w.categories.map((c) => (
            <span key={c} className="rounded-full bg-[#c2f800] px-2.5 py-0.5 text-[11px] font-bold uppercase leading-[17px] tracking-[0.05em] text-black">
              {c}
            </span>
          ))}
        </div>
        <h3 className="mt-2 font-display text-lg font-bold uppercase leading-7 tracking-[0.025em] text-white">{w.name}</h3>
        <p className="mt-1 text-xs text-[#9ca3af]">{w.equipment}</p>
        <div className="mt-auto flex gap-4 border-t border-[#20242e] pt-3 text-xs text-[#9ca3af]" style={{ marginTop: 16 }}>
          <span className="flex items-center gap-1.5"><Clock size={14} strokeWidth={1.7} />{w.duration} min</span>
          <span className="flex items-center gap-1.5"><Flame size={14} strokeWidth={1.7} />{w.calories} kcal</span>
          <span className="flex items-center gap-1.5"><Star size={14} strokeWidth={1.7} />{w.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
