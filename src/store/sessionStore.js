import { create } from 'zustand';

const useSessionStore = create((set) => ({
  candidateName: '',
  registrationNumber: '',
  selectedExam: 'CTET Paper I',
  selectedLanguage: 'English',
  examStarted: false,

  setCandidateName: (candidateName) => set({ candidateName }),
  setRegistrationNumber: (registrationNumber) => set({ registrationNumber }),
  setSelectedExam: (selectedExam) => set({ selectedExam }),
  setSelectedLanguage: (selectedLanguage) => set({ selectedLanguage }),
  setExamStarted: (examStarted) => set({ examStarted }),

  startSession: () => set({ examStarted: true }),
  resetSession: () =>
    set({
      candidateName: '',
      registrationNumber: '',
      selectedExam: 'CTET Paper I',
      selectedLanguage: 'English',
      examStarted: false,
    }),
}));

export default useSessionStore;
