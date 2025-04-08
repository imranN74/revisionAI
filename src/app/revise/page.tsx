import MessageInput from "../../components/message-input";
import { Options } from "./options";

export default function Revise() {
  return (
    <div className="grid grid-cols-7">
      <div className="flex flex-col justify-end h-[100dvh] lg:col-start-2 lg:col-end-7 col-span-full">
        <div>
          <div className="flex justify-center py-2">
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
