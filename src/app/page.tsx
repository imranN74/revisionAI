import MessageInput from "../components/message-input";
import { Options } from "@/components/quest-options";

export default function Home() {
  return (
    <div className="grid grid-cols-7">
      <div className="flex flex-col justify-end h-[100dvh] lg:col-start-2 lg:col-end-7 col-span-full">
        <div>
          <div className="flex justify-center py-2 mb-10 lg:mb-0">
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
