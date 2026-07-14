import { create } from 'zustand';

const useExamStore = create((set) => ({
  examId: '',
  startedAt: null,
  duration: 0,
  remainingTime: 0,
  currentQuestionIndex: 0,
  questions: [],
  answers: {},
  reviewQuestions: [],
  visitedQuestions: [],
  status: 'idle',

  initializeExam: (examConfig, questions) =>
    set({
      examId: examConfig.examId || '',
      startedAt: examConfig.startedAt || new Date().toISOString(),
      duration: examConfig.duration || 0,
      remainingTime: examConfig.duration || 0,
      currentQuestionIndex: 0,
      questions: questions || [],
      answers: {},
      reviewQuestions: [],
      visitedQuestions: [],
      status: 'inProgress',
    }),

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

  updateRemainingTime: (seconds) =>
    set((state) => ({
      remainingTime: Math.max(0, state.remainingTime + seconds),
    })),

  submitExam: () =>
    set({
      status: 'submitted',
    }),

  resetExam: () =>
    set({
      examId: '',
      startedAt: null,
      duration: 0,
      remainingTime: 0,
      currentQuestionIndex: 0,
      questions: [],
      answers: {},
      reviewQuestions: [],
      visitedQuestions: [],
      status: 'idle',
    }),
}));

export default useExamStore;
