import { Button } from "@/components/ui/button";
import Quest from "../../components/question";
import { QuestHeader } from "@/components/question-header";

export default function Question() {
  return (
    <div className="bg-white mx-3 lg:mx-20 my-10 rounded-xl p-5 shadow-2xl">
      <QuestHeader />
      <hr />
      <Quest />
      <div className="flex justify-center my-2">
        <Button>Submit</Button>
      </div>
    </div>
  );
}
