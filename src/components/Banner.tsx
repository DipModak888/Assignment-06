import Image from "next/image";
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#171d20] px-8 py-8 md:px-12">

        {/* Left Side */}
        <div className="w-[55%]">

          <p className="mb-4 text-sm font-bold text-lime-400">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
            TRAIN WITH INTENT. LOG
            <br />
            EVERY SET.
          </h1>

          <p className="mt-4 max-w-[560px] text-sm leading-5 text-white/70">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            <br />
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <button className="mt-5 rounded-md bg-lime-400 px-6 py-3 text-sm font-bold text-black">
            BROWSE WORKOUTS
          </button>

        </div>

        {/* Right Side */}
        <div className="flex w-[45%] justify-end">

          <Image
            src={bannerImg}
            alt="Workout"
            width={420}
            height={350}
            className="h-auto w-[280px] object-contain md:w-[400px]"
          />

        </div>

      </div>
    </section>
  );
};

export default Banner;