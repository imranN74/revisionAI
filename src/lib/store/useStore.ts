import { create } from "zustand";

//____________QUESTION FORM STORE_________________
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

//____________________QUESTIONS STORE____________
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

//_____________ANSWER STORE______________________

interface Answer {
  question_no: string;
  answer_key: string;
}

interface AnswerData {
  answers: Answer[];
  setAnswer: (data: Answer) => void;
}

export const answerData = create<AnswerData>((set, get) => ({
  answers: [],
  setAnswer: (data: Answer) => {
    const currentData = get().answers;
    const filtered = currentData.filter(
      (item) => item.question_no !== data.question_no
    );
    set({ answers: [...filtered, data] });
  },
}));

//_________ANSWER VERIFCATION STORE_____________

interface Marks {
  totalQuestion: number;
  correctAnswer: number;
}

interface MarksData {
  marks: Marks;
  setMarks: (data: Marks) => void;
}

export const marksData = create<MarksData>((set) => ({
  marks: {
    totalQuestion: 0,
    correctAnswer: 0,
  },
  setMarks: (data: any) => set({ marks: data }),
}));
