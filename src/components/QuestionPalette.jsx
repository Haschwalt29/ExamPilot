import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { EXAM_PALETTE_COLORS } from '../constants/examColors';

const PALETTE_COLUMNS = 5;

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
        border: `2px solid ${EXAM_PALETTE_COLORS.current}`,
      };
    }

    if (reviewed) {
      return {
        bgcolor: EXAM_PALETTE_COLORS.review,
        color: '#fff',
        border: `1px solid ${EXAM_PALETTE_COLORS.review}`,
      };
    }

    if (answered) {
      return {
        bgcolor: EXAM_PALETTE_COLORS.answered,
        color: '#fff',
        border: `1px solid ${EXAM_PALETTE_COLORS.answered}`,
      };
    }

    if (visited) {
      return {
        bgcolor: EXAM_PALETTE_COLORS.notAnswered,
        color: '#fff',
        border: `1px solid ${EXAM_PALETTE_COLORS.notAnswered}`,
      };
    }

    return {
      bgcolor: EXAM_PALETTE_COLORS.notVisited,
      color: '#1a1a1a',
      border: '1px solid #bdbdbd',
    };
  };

  return (
    <Card
      elevation={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <CardContent
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          '&:last-child': { pb: 2 },
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1, flexShrink: 0 }}>
          Question Palette ({questions.length})
        </Typography>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            border: '1px solid #d0d7de',
            borderRadius: 1,
            bgcolor: '#fafbfc',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              p: 1.5,
              '&::-webkit-scrollbar': {
                width: 10,
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: '#9aa5b1',
                borderRadius: 5,
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: '#eef1f4',
              },
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${PALETTE_COLUMNS}, minmax(0, 1fr))`,
                gap: 1.25,
                alignContent: 'start',
              }}
            >
              {questions.map((question, index) => {
                const questionNumber = index + 1;
                const styles = getButtonStyles(question, index);

                return (
                  <Button
                    key={question.id}
                    variant="outlined"
                    onClick={() => onSelectQuestion(index, question.id)}
                    sx={{
                      minWidth: 0,
                      width: '100%',
                      aspectRatio: '1 / 1',
                      borderRadius: 1.5,
                      fontSize: 16,
                      fontWeight: 700,
                      lineHeight: 1,
                      p: 0,
                      boxShadow: 'none',
                      ...styles,
                      '&:hover': {
                        opacity: 0.92,
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {questionNumber}
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionPalette;
