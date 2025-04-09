"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Paperclip } from "lucide-react";

export default function MessageInput() {
  return (
    <div className="w-full bg-white px-4 py-2">
      <div className=" rounded-2xl  border border-gray-300 bg-gray-50 px-4 py-2 shadow-xl">
        <Textarea
          placeholder="Type your topic..."
          className="min-h-[50px] max-h-60 flex-1 resize-none border-none bg-transparent p-0 text-lg shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="flex justify-between">
          <Button
            size="icon"
            variant="ghost"
            className="text-black hover:text-blue-800"
          >
            <Paperclip size={20} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-black hover:text-blue-800"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
