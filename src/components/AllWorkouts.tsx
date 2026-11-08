"use client";

import { useFitlog } from "@/context/FitlogContext";
import WorkoutCard from "./WorkoutCard";

export default function AllWorkouts() {
  const { workouts, loading, error } = useFitlog();

  return (
    <section id="library" className="scroll-mt-24 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-3xl font-bold uppercase tracking-[-0.025em] text-white">THE LIBRARY</h2>
        <p className="text-sm text-[#9ca3af]">Twelve lifts covering every major muscle group.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center gap-3 py-24" role="status" aria-live="polite">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#222630] border-t-[#c2f800]" />
          <span className="text-sm text-[#9ca3af]">Loading workouts…</span>
        </div>
      ) : error ? (
        <p className="py-16 text-center text-sm text-[#9ca3af]">{error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}
