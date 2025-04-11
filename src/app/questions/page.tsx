import { Button } from "@/components/ui/button";
import Quest from "../../components/question";
import { QuestHeader } from "@/components/question-header";

export default function Question() {
  return (
    <div className="bg-white lg:mx-20 my-10 rounded-xl p-5">
      <QuestHeader />
      <hr />
      <Quest />
      <div className="flex justify-center my-2">
        <Button>Submit</Button>
      </div>
    </div>
  );
}
