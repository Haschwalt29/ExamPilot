import ctetPaper1Questions from './ctetPaper1';
import ctetPaper2Questions from './ctetPaper2';

export const QUESTION_COUNT = 150;

const rawQuestionBanks = {
  'CTET Paper I': ctetPaper1Questions,
  'CTET Paper II': ctetPaper2Questions,
};

const paperPrefixes = {
  'CTET Paper I': 'ctet1',
  'CTET Paper II': 'ctet2',
};

const expandQuestions = (baseQuestions, paperPrefix) => {
  if (!baseQuestions.length) {
    return [];
  }

  return Array.from({ length: QUESTION_COUNT }, (_, index) => {
    const base = baseQuestions[index % baseQuestions.length];
    const questionNumber = index + 1;

    return {
      ...base,
      id: `q-${paperPrefix}-${String(questionNumber).padStart(3, '0')}`,
      question: `[Q${questionNumber}] ${base.question}`,
    };
  });
};

export const getQuestionsByExam = (examName) => {
  const baseQuestions = rawQuestionBanks[examName] || [];
  const paperPrefix = paperPrefixes[examName] || 'exam';

  return expandQuestions(baseQuestions, paperPrefix);
};

export const questionBanks = Object.fromEntries(
  Object.keys(rawQuestionBanks).map((examName) => [examName, getQuestionsByExam(examName)])
);

export default questionBanks;
