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

interface Question {
  answer: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  question: string;
}

interface QuestionData {
  questions: Question[];
  setQuestions: (data: any[]) => void;
}

export const questionsData = create<QuestionData>((set) => ({
  questions: [],
  setQuestions: (data: Question[]) => set({ questions: data }),
}));
