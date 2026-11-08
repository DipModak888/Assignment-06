import { Suspense } from "react";
import WorkoutDetails from "@/components/WorkoutDetails";

async function Details({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WorkoutDetails id={id} />;
}

export default function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-[#0f1115]" />}>
      <Details params={params} />
    </Suspense>
  );
}