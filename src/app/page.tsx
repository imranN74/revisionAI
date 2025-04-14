import MessageInput from "../components/message-input";
import { Options } from "@/components/quest-options";
import { Hero } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="grid grid-cols-7 grid-rows-3 h-[100dvh]">
      <div className="col-start-3 col-end-6 row-start-2 row-end-3 lg:row-start-1 lg:row-end-1 lg:mt-10">
        <Hero />
      </div>
      <div className="row-start-3 rows-end-3 lg:col-start-2 lg:col-end-7 col-span-full">
        <div className="flex flex-col h-full justify-end">
          <div className="flex justify-center">
            <Options />
          </div>
          <div className="flex justify-center">
            <MessageInput />
          </div>
        </div>
      </div>
    </div>
  );
}
