export type Workout = {
  id: string;
  name: string;
  description: string;
  categories: string[];
  equipment: string;
  difficulty: string;
  sets: string;
  reps: string;
  duration: number; // minutes
  calories: number; // kcal
  rating: number;
  image: string;
  instructions: string[];
};

export type PlanItem = { id: string; done: boolean };
export type SortKey = "duration" | "calories" | "rating";
