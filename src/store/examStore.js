import { create } from 'zustand';
import evaluateExam from '../utils/evaluateExam';

let timerIntervalId = null;

const clearTimerInterval = () => {
  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
};

const useExamStore = create((set, get) => ({
  examId: '',
  startedAt: null,
  duration: 0,
  remainingTime: 0,
  isRunning: false,
  startTime: null,
  endTime: null,
  currentQuestionIndex: 0,
  questions: [],
  answers: {},
  reviewQuestions: [],
  visitedQuestions: [],
  status: 'idle',
  submissionType: null,
  results: null,

  initializeExam: (examConfig, questions) => {
    clearTimerInterval();
    const durationMinutes = examConfig.duration || 0;

    set({
      examId: examConfig.examId || '',
      startedAt: examConfig.startedAt || new Date().toISOString(),
      duration: durationMinutes,
      remainingTime: durationMinutes * 60,
      isRunning: false,
      startTime: null,
      endTime: null,
      currentQuestionIndex: 0,
      questions: questions || [],
      answers: {},
      reviewQuestions: [],
      visitedQuestions: [],
      status: 'inProgress',
      submissionType: null,
      results: null,
    });
  },

  startTimer: () => {
    const { isRunning, status } = get();
    if (isRunning || timerIntervalId !== null || status !== 'inProgress') {
      return;
    }

    set({
      isRunning: true,
      startTime: Date.now(),
    });

    timerIntervalId = setInterval(() => {
      get().tick();
    }, 1000);
  },

  pauseTimer: () => {
    const { isRunning } = get();
    if (!isRunning || timerIntervalId === null) {
      return;
    }

    clearTimerInterval();
    set({ isRunning: false });
  },

  resumeTimer: () => {
    const { isRunning, status, remainingTime } = get();
    if (isRunning || timerIntervalId !== null || status !== 'inProgress' || remainingTime <= 0) {
      return;
    }

    set({ isRunning: true });

    timerIntervalId = setInterval(() => {
      get().tick();
    }, 1000);
  },

  tick: () => {
    const { remainingTime, status } = get();
    if (status !== 'inProgress') {
      return;
    }

    if (remainingTime <= 1) {
      set({ remainingTime: 0 });
      get().autoSubmit();
      return;
    }

    set({ remainingTime: remainingTime - 1 });
  },

  stopTimer: () => {
    clearTimerInterval();
    set({
      isRunning: false,
      endTime: Date.now(),
    });
  },

  autoSubmit: () => {
    const { questions, answers, status } = get();
    if (status === 'submitted') {
      return;
    }

    get().stopTimer();
    set({
      status: 'submitted',
      remainingTime: 0,
      submissionType: 'auto',
      results: evaluateExam(questions, answers),
    });
  },

  setCurrentQuestion: (index, questionId = null) =>
    set((state) => ({
      currentQuestionIndex: Math.max(0, Math.min(index, state.questions.length - 1)),
      visitedQuestions: questionId && state.visitedQuestions.includes(questionId)
        ? state.visitedQuestions
        : questionId
          ? [...state.visitedQuestions, questionId]
          : state.visitedQuestions,
    })),

  answerQuestion: (questionId, answer) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: answer,
      },
      visitedQuestions: state.visitedQuestions.includes(questionId)
        ? state.visitedQuestions
        : [...state.visitedQuestions, questionId],
    })),

  toggleReview: (questionId) =>
    set((state) => {
      const isReviewed = state.reviewQuestions.includes(questionId);
      return {
        reviewQuestions: isReviewed
          ? state.reviewQuestions.filter((id) => id !== questionId)
          : [...state.reviewQuestions, questionId],
      };
    }),

  markVisited: (questionId) =>
    set((state) => ({
      visitedQuestions: state.visitedQuestions.includes(questionId)
        ? state.visitedQuestions
        : [...state.visitedQuestions, questionId],
    })),

  goToNextQuestion: (questionId) =>
    set((state) => ({
      currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1),
      reviewQuestions: questionId
        ? state.reviewQuestions.filter((id) => id !== questionId)
        : state.reviewQuestions,
      visitedQuestions: state.visitedQuestions.includes(questionId)
        ? state.visitedQuestions
        : questionId
          ? [...state.visitedQuestions, questionId]
          : state.visitedQuestions,
    })),

  goToPreviousQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
    })),

  clearResponse: (questionId) =>
    set((state) => ({
      answers: Object.fromEntries(
        Object.entries(state.answers).filter(([id]) => id !== questionId)
      ),
      reviewQuestions: questionId
        ? state.reviewQuestions.filter((id) => id !== questionId)
        : state.reviewQuestions,
      visitedQuestions: state.visitedQuestions.includes(questionId)
        ? state.visitedQuestions
        : [...state.visitedQuestions, questionId],
    })),

  markForReviewAndNext: (questionId) =>
    set((state) => ({
      reviewQuestions: state.reviewQuestions.includes(questionId)
        ? state.reviewQuestions
        : [...state.reviewQuestions, questionId],
      visitedQuestions: state.visitedQuestions.includes(questionId)
        ? state.visitedQuestions
        : [...state.visitedQuestions, questionId],
      currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1),
    })),

  submitExam: () => {
    const { questions, answers, status } = get();
    if (status === 'submitted') {
      return;
    }

    get().stopTimer();
    set({
      status: 'submitted',
      endTime: Date.now(),
      submissionType: 'manual',
      results: evaluateExam(questions, answers),
    });
  },

  resetExam: () => {
    clearTimerInterval();
    set({
      examId: '',
      startedAt: null,
      duration: 0,
      remainingTime: 0,
      isRunning: false,
      startTime: null,
      endTime: null,
      currentQuestionIndex: 0,
      questions: [],
      answers: {},
      reviewQuestions: [],
      visitedQuestions: [],
      status: 'idle',
      submissionType: null,
      results: null,
    });
  },
}));

export default useExamStore;
