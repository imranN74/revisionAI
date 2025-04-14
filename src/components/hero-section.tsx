import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center text-white">
      <div className="text-7xl md:text-8xl">
        Revise<span className="text-red-400 font-serif">AI</span>
      </div>
      <div className="text-2xl md:text-3xl whitespace-nowrap">
        Level Up Your Rivision
      </div>
      <div className="text-lg md:text-xl whitespace-nowrap">
        <span className="text-red-400 font-bold font-serif">AI</span>
        &nbsp;Powered Study Buddy
      </div>
      <div className="flex gap-2 border rounded-xl p-3 mt-3 animate-bounce border-red-400 cursor-pointer">
        Learn more
        <span className="">
          <ArrowRight color="red" />
        </span>
      </div>
    </div>
  );
}
