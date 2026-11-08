"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, CalendarPlus } from "lucide-react";
import { PLAN_CAP, useFitlog } from "@/context/FitlogContext";
import { getWorkout } from "@/lib/api";
import type { Workout } from "@/types/workoutTypes";

export default function WorkoutDetails({ id }: { id: string }) {
  const { workouts, plan, addToPlan, saveForLater } = useFitlog();
  const fromCtx = workouts.find((w) => w.id === id);
  const [fetched, setFetched] = useState<Workout | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (fromCtx) return;
    let alive = true;
    getWorkout(id).then((w) => {
      if (!alive) return;
      if (w) setFetched(w);
      else setMissing(true);
    });
    return () => {
      alive = false;
    };
  }, [id, fromCtx]);

  const w = fromCtx ?? fetched;

  if (!w) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-[#0f1115] px-6 text-center">
        {missing ? (
          <>
            <h1 className="font-display text-2xl font-bold uppercase text-white">Workout not found</h1>
            <Link href="/" className="rounded-full bg-[#ccff00] px-6 py-2.5 text-xs font-semibold text-[#0f1115]">Go to workouts</Link>
          </>
        ) : (
          <>
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#222630] border-t-[#ccff00]" />
            <span className="text-sm text-[#9ca3af]">Loading workout…</span>
          </>
        )}
      </div>
    );
  }

  const full = plan.length >= PLAN_CAP && !plan.some((p) => p.id === w.id);
  const specs: [string, string][] = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.calories} kcal`],
    ["Rating", w.rating.toFixed(1)],
  ];

  return (
    <div className="bg-[#0f1115]">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-14">
        <div className="overflow-hidden rounded-2xl border border-[#232834] bg-[#171a21] shadow-[0_25px_50px_rgba(0,0,0,0.25)] lg:self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={w.image} alt={w.name} className="aspect-[4/5] h-full w-full object-cover lg:aspect-auto lg:h-[735px]" />
        </div>

        <div className="flex flex-col">
          <h1 className="font-display text-3xl font-bold uppercase leading-[40px] tracking-[-0.025em] text-white sm:text-4xl">{w.name}</h1>
          <p className="mt-3 text-base leading-6 text-[#9ca3af]">{w.description}</p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {w.categories.map((c) => (
              <span key={c} className="rounded-full bg-[#ccff00] px-3.5 py-1 text-xs font-semibold capitalize text-[#0f1115]">{c}</span>
            ))}
          </div>

          <div className="mt-7 overflow-hidden rounded-2xl border border-[#232834] bg-[#151922]">
            {specs.map(([label, value], i) => (
              <div key={label} className={`flex items-center justify-between gap-4 px-6 py-3.5 ${i ? "border-t border-[#1e2330]" : ""}`}>
                <span className="text-xs font-bold uppercase tracking-[0.05em] text-[#9ca3af]">{label}</span>
                <span className="text-right text-sm font-medium text-[#e5e7eb]">{value}</span>
              </div>
            ))}
          </div>

          <section className="mt-8">
            <h2 className="text-base font-extrabold uppercase tracking-[0.05em] text-white">INSTRUCTIONS</h2>
            <ol className="mt-4 flex flex-col gap-3">
              {w.instructions.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm leading-[22.8px] text-[#d1d5db]">
                  <span className="font-bold text-[#ccff00]">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => addToPlan(w)}
              disabled={full}
              className="inline-flex items-center gap-2 rounded-xl bg-[#ccff00] px-6 py-3 text-sm font-semibold text-[#0f1115] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CalendarPlus size={16} strokeWidth={1.8} />
              Add to today&apos;s plan
            </button>
            <button
              onClick={() => saveForLater(w)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#374151] px-6 py-3 text-sm font-medium text-[#e5e7eb] transition hover:bg-white/5"
            >
              <Bookmark size={16} strokeWidth={1.8} />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
