"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarPlus, Check, ChevronDown, Clock, Flame, Star, X } from "lucide-react";
import { useFitlog } from "@/context/FitlogContext";
import type { SortKey, Workout } from "@/types/workoutTypes";

type Tab = "plan" | "saved";

const SORTS: Record<SortKey, (a: Workout, b: Workout) => number> = {
  duration: (a, b) => b.duration - a.duration,
  calories: (a, b) => b.calories - a.calories,
  rating: (a, b) => b.rating - a.rating,
};

export default function MyPlanPage() {
  const { workouts, loading, plan, saved, addToPlan, removeFromPlan, removeFromSaved, markDone } = useFitlog();
  const [tab, setTab] = useState<Tab>("plan");
  const [sort, setSort] = useState<SortKey>("duration");

  const byId = useMemo(() => new Map(workouts.map((w) => [w.id, w])), [workouts]);
  const planned = plan.map((p) => ({ w: byId.get(p.id), done: p.done })).filter((x): x is { w: Workout; done: boolean } => !!x.w);
  const savedList = saved.map((id) => byId.get(id)).filter((w): w is Workout => !!w);

  const minutes = planned.reduce((s, x) => s + x.w.duration, 0);
  const calories = planned.reduce((s, x) => s + x.w.calories, 0);

  const rows = (tab === "plan" ? planned : savedList.map((w) => ({ w, done: false }))).sort((a, b) => SORTS[sort](a.w, b.w));

  return (
    <div className="bg-[#0f1115]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-12 lg:py-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-bold uppercase tracking-[-0.025em] text-white">MY PLAN</h1>
          <p className="text-sm text-[#8a92a0]">Cap of five lifts for today. Finish them, then load more.</p>
        </div>

        <div className="grid grid-cols-3 rounded-2xl border border-[#232732] bg-[#13161d] p-4 sm:p-6">
          {[
            ["Exercises", planned.length, true],
            ["Minutes", minutes, false],
            ["Calories", calories, false],
          ].map(([label, value, accent], i) => (
            <div key={label as string} className={`px-2 sm:px-8 ${i ? "border-l border-[#232732]/60" : "sm:pl-0"}`}>
              <p className="text-xs text-[#8a92a0]">{label}</p>
              <p className={`font-display text-3xl font-bold sm:text-4xl ${accent ? "text-[#ccff00]" : "text-white"}`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex gap-1 rounded-xl border border-[#232732] bg-[#151921] p-1">
            {([["plan", "Today's Plan"], ["saved", "Saved"]] as const).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`rounded-lg px-4 py-1.5 text-xs ${
                  tab === k ? "border border-[#2b303d] bg-[#1f242d] font-bold text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]" : "border border-transparent text-[#8a92a0] hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-xs text-[#8a92a0]">
            Sort By
            <span className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-[34px] cursor-pointer appearance-none rounded-[9px] border border-[#232732] bg-[#13161d] pl-3 pr-9 text-xs text-white outline-none focus:border-[#ccff00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8a92a0]" />
            </span>
          </label>
        </div>

        {loading ? (
          <p className="py-16 text-center text-sm text-[#8a92a0]" role="status">Loading workouts…</p>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-white/10 bg-[#111317]/50 px-4 py-16 text-center">
            <h2 className="font-display text-xl font-bold uppercase tracking-[0.035em] text-white">NOTHING HERE YET</h2>
            <p className="mt-3 text-xs text-[#a1a1aa]">Browse the library and add a lift to get today moving.</p>
            <Link
              href="/"
              className="mt-6 rounded-full bg-[#c2f10d] px-6 py-2.5 text-xs font-semibold tracking-[-0.025em] text-black shadow-[0_4px_6px_rgba(194,241,13,0.1),0_10px_15px_rgba(194,241,13,0.1)]"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {rows.map(({ w, done }) => (
              <article
                key={w.id}
                className={`flex flex-col justify-between gap-4 rounded-2xl border border-[#232732] bg-[#14171e] p-4 lg:flex-row lg:items-center ${done ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <div className="h-20 w-36 shrink-0 overflow-hidden rounded-xl bg-[#1f2937]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={w.image} alt={w.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className={`font-display text-base font-bold uppercase leading-6 tracking-[0.025em] text-white ${done ? "line-through" : ""}`}>{w.name}</h3>
                    <p className="text-xs font-semibold text-[#8a92a0]">{w.equipment}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-[#d1d5db]">
                      <span className="flex items-center gap-1.5"><Clock size={14} strokeWidth={1.7} />{w.duration} min</span>
                      <span className="flex items-center gap-1.5"><Flame size={14} strokeWidth={1.7} />{w.calories} kcal</span>
                      <span className="flex items-center gap-1.5"><Star size={14} strokeWidth={1.7} />{w.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={`/workout/${w.id}`} className="rounded-full border border-[#374151] px-[18px] py-2 text-xs text-white transition hover:bg-white/5">
                    View Details
                  </Link>
                  {tab === "plan" ? (
                    <button
                      onClick={() => markDone(w.id)}
                      disabled={done}
                      className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-semibold text-black shadow-[0_1px_2px_rgba(0,0,0,0.05)] disabled:cursor-default"
                    >
                      <Check size={14} strokeWidth={2.2} />
                      {done ? "Done" : "Mark as Done"}
                    </button>
                  ) : (
                    <button
                      onClick={() => addToPlan(w)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-semibold text-black shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                    >
                      <CalendarPlus size={14} strokeWidth={2} />
                      Add to Plan
                    </button>
                  )}
                  <button
                    aria-label={`Remove ${w.name}`}
                    onClick={() => (tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id))}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[#8a92a0] transition hover:bg-white/5 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
