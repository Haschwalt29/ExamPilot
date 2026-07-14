import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import ExamHeader from '../components/ExamHeader';
import QuestionPanel from '../components/QuestionPanel';
import QuestionPalette from '../components/QuestionPalette';
import NavigationBar from '../components/NavigationBar';
import Legend from '../components/Legend';
import useExamStore from '../store/examStore';
import useSessionStore from '../store/sessionStore';

const Exam = () => {
  const navigate = useNavigate();
  const { candidateName, selectedExam, selectedLanguage } = useSessionStore();
  const {
    currentQuestionIndex,
    questions,
    answers,
    reviewQuestions,
    visitedQuestions,
    status,
    startTimer,
    setCurrentQuestion,
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    clearResponse,
    markForReviewAndNext,
  } = useExamStore();

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (status === 'submitted') {
      navigate('/result');
    }
  }, [status, navigate]);

  const questionCount = questions.length;
  const currentQuestion = questions[currentQuestionIndex] || {
    id: '',
    question: '',
    subject: '',
    difficulty: '',
    options: [],
    correctAnswer: '',
    explanation: '',
  };

  const handleSelectQuestion = (index, questionId) => {
    setCurrentQuestion(index, questionId);
  };

  const handleOptionSelect = (value) => {
    answerQuestion(currentQuestion.id, value);
  };

  const handlePrevious = () => {
    goToPreviousQuestion();
  };

  const handleSaveNext = () => {
    goToNextQuestion(currentQuestion.id);
  };

  const handleClearResponse = () => {
    clearResponse(currentQuestion.id);
  };

  const handleMarkReviewNext = () => {
    markForReviewAndNext(currentQuestion.id);
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden', bgcolor: '#f3f5f8' }}>
      <ExamHeader
        candidateName={candidateName}
        examName={selectedExam}
        selectedLanguage={selectedLanguage}
      />

      <Box
        sx={{
          height: 'calc(100vh - 70px)',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '3.3fr 1fr' },
          gap: 2,
          px: { xs: 1, md: 3 },
          py: 2,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          <Box sx={{ flex: 1, overflowY: 'auto', pr: { md: 2 }, pb: 2 }}>
            <QuestionPanel
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questionCount}
              questionText={currentQuestion.question}
              subject={currentQuestion.subject}
              difficulty={currentQuestion.difficulty}
              options={currentQuestion.options}
              selectedValue={answers[currentQuestion.id]}
              onOptionSelect={handleOptionSelect}
            />
          </Box>
          <NavigationBar
            onPrevious={handlePrevious}
            onSaveNext={handleSaveNext}
            onClearResponse={handleClearResponse}
            onMarkReviewNext={handleMarkReviewNext}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, overflow: 'hidden' }}>
          <QuestionPalette
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            reviewQuestions={reviewQuestions}
            visitedQuestions={visitedQuestions}
            onSelectQuestion={handleSelectQuestion}
          />
          <Box sx={{ mt: 1.5, flexShrink: 0 }}>
            <Legend />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Exam;
