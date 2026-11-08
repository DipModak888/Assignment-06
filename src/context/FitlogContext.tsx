"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getWorkouts } from "@/lib/api";
import type { PlanItem, Workout } from "@/types/workoutTypes";

export const PLAN_CAP = 5;
const KEY = "fitlog:v1";

type Toast = { id: number; message: string };

type Ctx = {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  plan: PlanItem[];
  saved: string[];
  addToPlan: (w: Workout) => void;
  saveForLater: (w: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  markDone: (id: string) => void;
  toast: (message: string) => void;
};

const FitlogContext = createContext<Ctx | null>(null);

export function FitlogProvider({ children }: { children: React.ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Fetch the library once for the whole app.
  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setError("Could not load workouts. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  // Restore persisted plan / saved lists.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPlan(Array.isArray(d.plan) ? d.plan : []);
        setSaved(Array.isArray(d.saved) ? d.saved : []);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ plan, saved }));
    } catch {}
  }, [plan, saved, hydrated]);

  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const addToPlan = useCallback(
    (w: Workout) => {
      if (plan.some((p) => p.id === w.id)) return toast("Already in today's plan");
      if (plan.length >= PLAN_CAP) return toast(`Plan is full — max ${PLAN_CAP} lifts`);
      setPlan((p) => [...p, { id: w.id, done: false }]);
      toast("Added to today's plan");
    },
    [plan, toast],
  );

  const saveForLater = useCallback(
    (w: Workout) => {
      if (saved.includes(w.id)) return toast("Already saved");
      setSaved((s) => [...s, w.id]);
      toast("Saved for later");
    },
    [saved, toast],
  );

  const removeFromPlan = useCallback(
    (id: string) => {
      setPlan((p) => p.filter((x) => x.id !== id));
      toast("Removed from today's plan");
    },
    [toast],
  );

  const removeFromSaved = useCallback(
    (id: string) => {
      setSaved((s) => s.filter((x) => x !== id));
      toast("Removed from saved");
    },
    [toast],
  );

  const markDone = useCallback(
    (id: string) => {
      setPlan((p) => p.map((x) => (x.id === id ? { ...x, done: true } : x)));
      toast("Nice work — marked as done");
    },
    [toast],
  );

  const value = useMemo(
    () => ({ workouts, loading, error, plan, saved, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone, toast }),
    [workouts, loading, error, plan, saved, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone, toast],
  );

  return (
    <FitlogContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="toast-in pointer-events-auto flex items-center gap-2 rounded-xl border border-[#2d313b] bg-[#15171d] px-4 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <span className="h-2 w-2 rounded-full bg-[#ccff00]" />
            {t.message}
          </div>
        ))}
      </div>
    </FitlogContext.Provider>
  );
}

export function useFitlog() {
  const ctx = useContext(FitlogContext);
  if (!ctx) throw new Error("useFitlog must be used inside FitlogProvider");
  return ctx;
}
