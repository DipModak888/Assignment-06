import { IWorkout } from "@/types/workoutTypes";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

export const getWorkouts = async (): Promise<IWorkout[]> => {
    try {
        const response = await fetch(API_URL, {
            cache: "no-store",
        });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        const data: IWorkout[] = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch workouts: ", error);
        throw error;
    }
};

export const getWorkout = async (id: string): Promise<IWorkout | null> => {
    try {
        const workouts = await getWorkouts();

        const workout = workouts.find((item) => item.id === Number(id));
        return workout ?? null;
    } catch (error) {
        console.error(`Failed to fetch workout ${id}:`, error);
        throw error;
    }
};