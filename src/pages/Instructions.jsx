import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import useSessionStore from '../store/sessionStore';
import useExamStore from '../store/examStore';
import { getQuestionsByExam, QUESTION_COUNT } from '../data/questions';

const instructions = [
  'Read every question carefully before selecting an answer.',
  'Use the Save & Next option after answering a question.',
  'Questions marked for review can be revisited later.',
  'The timer begins only after you click Start Examination.',
  'The examination will be submitted automatically when the allotted time expires.',
  'Do not switch tabs or navigate away from the test window during the exam.',
  'Ensure that your internet connection remains stable throughout the session.',
  'Avoid using external help or reference material during the assessment.',
  'Confirm your responses before moving to the next question.',
  'Stay calm and manage your time wisely to complete all questions.',
];

const Instructions = () => {
  const navigate = useNavigate();
  const { candidateName, registrationNumber, selectedExam, selectedLanguage, examStarted } = useSessionStore();
  const initializeExam = useExamStore((state) => state.initializeExam);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!candidateName || !examStarted) {
      navigate('/');
    }
  }, [candidateName, examStarted, navigate]);

  const handleStartExamination = () => {
    const questions = getQuestionsByExam(selectedExam);
    
    const examConfig = {
      examId: 'exam-001',
      startedAt: new Date().toISOString(),
      duration: 150,
    };

    initializeExam(examConfig, questions);
    navigate('/exam');
  };

  return (
    <Box sx={{ maxWidth: 860, mx: 'auto', py: 2 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={600}>
                Examination Instructions
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Please review the instructions carefully before starting your practice test.
              </Typography>
            </Box>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Candidate Details
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body1"><strong>Candidate Name:</strong> {candidateName}</Typography>
                  <Typography variant="body1"><strong>Registration Number:</strong> {registrationNumber || 'Not provided'}</Typography>
                  <Typography variant="body1"><strong>Exam Name:</strong> {selectedExam}</Typography>
                  <Typography variant="body1"><strong>Language:</strong> {selectedLanguage}</Typography>
                  <Typography variant="body1"><strong>Duration:</strong> 150 Minutes</Typography>
                  <Typography variant="body1"><strong>Total Questions:</strong> {QUESTION_COUNT}</Typography>
                  <Typography variant="body1"><strong>Negative Marking:</strong> No</Typography>
                </Stack>
              </CardContent>
            </Card>

            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                GENERAL INSTRUCTIONS
              </Typography>
              <List dense sx={{ pl: 1 }}>
                {instructions.map((instruction) => (
                  <ListItem key={instruction} disablePadding sx={{ py: 0.3 }}>
                    <ListItemText primary={instruction} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Divider />

            <FormControlLabel
              control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />}
              label="I have read and understood all instructions."
            />

            <Button
              variant="contained"
              size="large"
              disabled={!agreed}
              sx={{ alignSelf: 'flex-start', px: 4, py: 1.25 }}
              onClick={handleStartExamination}
            >
              Start Examination
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Instructions;
