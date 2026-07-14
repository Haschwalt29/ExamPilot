import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { EXAM_PALETTE_COLORS } from '../constants/examColors';

const QuestionPalette = ({ questions, currentQuestionIndex, answers, reviewQuestions, visitedQuestions, onSelectQuestion }) => {
  const getButtonStyles = (question, index) => {
    const isCurrent = index === currentQuestionIndex;
    const answered = answers[question.id] !== undefined;
    const reviewed = reviewQuestions.includes(question.id);
    const visited = visitedQuestions.includes(question.id);

    if (isCurrent) {
      return {
        bgcolor: '#fff',
        color: EXAM_PALETTE_COLORS.current,
        borderColor: EXAM_PALETTE_COLORS.current,
      };
    }

    if (reviewed) {
      return {
        bgcolor: EXAM_PALETTE_COLORS.review,
        color: '#fff',
        borderColor: EXAM_PALETTE_COLORS.review,
      };
    }

    if (answered) {
      return {
        bgcolor: EXAM_PALETTE_COLORS.answered,
        color: '#fff',
        borderColor: EXAM_PALETTE_COLORS.answered,
      };
    }

    if (visited) {
      return {
        bgcolor: EXAM_PALETTE_COLORS.notAnswered,
        color: '#fff',
        borderColor: EXAM_PALETTE_COLORS.notAnswered,
      };
    }

    return {
      bgcolor: EXAM_PALETTE_COLORS.notVisited,
      color: '#000',
      borderColor: '#ccc',
    };
  };

  return (
    <Card elevation={2} sx={{ mb: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Question Palette
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, minmax(0, 1fr))',
            gap: 1,
            flex: 1,
            overflowY: 'auto',
            pt: 1,
          }}
        >
          {questions.map((question, index) => {
            const questionNumber = index + 1;
            const styles = getButtonStyles(question, index);

            return (
              <Button
                key={question.id}
                size="small"
                onClick={() => onSelectQuestion(index, question.id)}
                sx={{
                  minWidth: 0,
                  height: 36,
                  borderRadius: 1,
                  fontSize: 12,
                  p: 0,
                  ...styles,
                  '&:hover': {
                    opacity: 0.9,
                  },
                }}
              >
                {questionNumber}
              </Button>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionPalette;
