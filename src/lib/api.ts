/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Workout } from "@/types/workoutTypes";

const BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

const pick = (o: any, keys: string[], d: any = "") => {
  for (const k of keys) if (o?.[k] !== undefined && o[k] !== null && o[k] !== "") return o[k];
  return d;
};
const num = (v: any) => {
  const n = parseFloat(String(v).replace(/[^\d.]/g, ""));
  return Number.isNaN(n) ? 0 : n;
};
const list = (v: any): string[] =>
  Array.isArray(v)
    ? v.map(String)
    : typeof v === "string"
      ? v.split(/\r?\n|,(?=\s)/).map((s) => s.trim()).filter(Boolean)
      : [];

// The API field names are normalised here so the UI always gets one shape.
export function normalize(o: any, i = 0): Workout {
  const equip = pick(o, ["equipment", "equipments"], "");
  return {
    id: String(pick(o, ["id", "_id", "slug"], i + 1)),
    name: String(pick(o, ["name", "title", "workoutName"], "Workout")),
    description: String(pick(o, ["description", "subtitle", "summary", "about"], "")),
    categories: list(pick(o, ["categories", "category", "tags", "muscleGroups", "muscles"], [])),
    equipment: Array.isArray(equip) ? equip.join(", ") : String(equip),
    difficulty: String(pick(o, ["difficulty", "level"], "—")),
    sets: String(pick(o, ["sets"], "—")),
    reps: String(pick(o, ["reps", "repetitions"], "—")),
    duration: num(pick(o, ["duration", "minutes", "time"], 0)),
    calories: num(pick(o, ["calories", "kcal"], 0)),
    rating: num(pick(o, ["rating", "stars"], 0)),
    image: String(pick(o, ["image", "imageUrl", "image_url", "thumbnail", "photo", "img"], "")),
    instructions: list(pick(o, ["instructions", "steps", "howTo"], [])),
  };
}

async function request(path: string): Promise<any> {
  let lastErr: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr ?? new Error("Request failed");
}

export async function getWorkouts(): Promise<Workout[]> {
  const j = await request("");
  const arr = Array.isArray(j) ? j : (j?.data ?? j?.workouts ?? j?.fitlog ?? j?.items ?? []);
  return (arr as any[]).map(normalize);
}

export async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const j = await request(`/${id}`);
    const o = j?.data ?? j?.workout ?? j;
    return o && typeof o === "object" && !Array.isArray(o) ? normalize(o) : null;
  } catch {
    return null;
  }
}
