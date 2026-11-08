import WorkoutDetails from "@/components/WorkoutDetails";

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WorkoutDetails id={id} />;
}
