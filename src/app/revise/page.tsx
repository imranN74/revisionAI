import MessageInput from "../../components/message-input";

export default function Revise() {
  return (
    <div className="grid grid-cols-7">
      <div className="flex items-end h-[100dvh] lg:col-start-2 lg:col-end-7 col-span-full">
        <MessageInput />
      </div>
    </div>
  );
}
