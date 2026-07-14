import ctetPaper1Questions from './ctetPaper1';
import ctetPaper2Questions from './ctetPaper2';

export const questionBanks = {
  'CTET Paper I': ctetPaper1Questions,
  'CTET Paper II': ctetPaper2Questions,
};

export const getQuestionsByExam = (examName) => {
  return questionBanks[examName] || [];
};

export default questionBanks;
