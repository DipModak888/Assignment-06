import Banner from "@/components/Banner";
import AllWorkouts from "@/components/AllWorkouts";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16 px-4 py-8 sm:px-6 sm:py-12">
      <Banner />
      <AllWorkouts />
    </div>
  );
}
