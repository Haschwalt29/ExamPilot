const evaluateExam = (questions, answers) => {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  const questionResults = questions.map((question, index) => {
    const userAnswer = answers[question.id];
    const isAnswered = userAnswer !== undefined && userAnswer !== '';
    const isCorrect = isAnswered && userAnswer === question.correctAnswer;

    if (!isAnswered) {
      unanswered += 1;
    } else if (isCorrect) {
      correct += 1;
    } else {
      incorrect += 1;
    }

    const selectedOption = question.options.find((option) => option.id === userAnswer);
    const correctOption = question.options.find((option) => option.id === question.correctAnswer);

    return {
      questionId: question.id,
      questionNumber: index + 1,
      subject: question.subject,
      question: question.question,
      userAnswer,
      userAnswerLabel: selectedOption?.label || 'Not answered',
      correctAnswer: question.correctAnswer,
      correctAnswerLabel: correctOption?.label || question.correctAnswer,
      isCorrect,
      isAnswered,
      explanation: question.explanation,
    };
  });

  const total = questions.length;
  const answered = correct + incorrect;

  return {
    total,
    correct,
    incorrect,
    unanswered,
    answered,
    scorePercent: total > 0 ? Math.round((correct / total) * 100) : 0,
    accuracyPercent: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    questionResults,
  };
};

export default evaluateExam;
