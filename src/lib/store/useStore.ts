import { create } from "zustand";

interface QuestForm {
  ques: string;
  level: string;
}

interface QuestStore {
  questForm: QuestForm;
  setQuestState: (data: Partial<QuestForm>) => void;
}

export const questFormStore = create<QuestStore>((set) => ({
  questForm: {
    ques: "",
    level: "",
  },
  setQuestState: (data) =>
    set((state) => ({
      questForm: {
        ...state.questForm,
        ...data,
      },
    })),
}));
