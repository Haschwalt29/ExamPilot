import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import useExamStore from '../store/examStore';
import useSessionStore from '../store/sessionStore';

const statCards = (results) => [
  { label: 'Total Questions', value: results.total, color: '#1565c0' },
  { label: 'Correct', value: results.correct, color: '#2e7d32' },
  { label: 'Incorrect', value: results.incorrect, color: '#d32f2f' },
  { label: 'Unanswered', value: results.unanswered, color: '#ed6c02' },
];

const Result = () => {
  const navigate = useNavigate();
  const { candidateName, registrationNumber, selectedExam, selectedLanguage, resetSession } = useSessionStore();
  const { status, results, submissionType, resetExam } = useExamStore();

  useEffect(() => {
    if (status !== 'submitted' || !results) {
      navigate('/');
    }
  }, [status, results, navigate]);

  if (!results) {
    return null;
  }

  const handleBackToHome = () => {
    resetExam();
    resetSession();
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', py: 2 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={600}>
                Examination Result
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {submissionType === 'auto'
                  ? 'Your exam was submitted automatically because the allotted time expired.'
                  : 'Your exam has been submitted successfully.'}
              </Typography>
            </Box>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Candidate Details
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body1"><strong>Name:</strong> {candidateName}</Typography>
                  <Typography variant="body1"><strong>Registration Number:</strong> {registrationNumber || 'Not provided'}</Typography>
                  <Typography variant="body1"><strong>Exam:</strong> {selectedExam}</Typography>
                  <Typography variant="body1"><strong>Language:</strong> {selectedLanguage}</Typography>
                </Stack>
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              {statCards(results).map((stat) => (
                <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h4" fontWeight={700} sx={{ color: stat.color, mt: 1 }}>
                        {stat.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Card variant="outlined">
              <CardContent>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ sm: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Overall Score
                    </Typography>
                    <Typography variant="h3" fontWeight={700} color="primary">
                      {results.scorePercent}%
                    </Typography>
                  </Box>
                  <Divider flexItem orientation="vertical" sx={{ display: { xs: 'none', sm: 'block' } }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Accuracy (answered questions)
                    </Typography>
                    <Typography variant="h5" fontWeight={600}>
                      {results.accuracyPercent}%
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Question-wise Evaluation
              </Typography>
              <TableContainer sx={{ maxHeight: 420, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Q. No.</strong></TableCell>
                      <TableCell><strong>Subject</strong></TableCell>
                      <TableCell><strong>Your Answer</strong></TableCell>
                      <TableCell><strong>Correct Answer</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.questionResults.map((item) => (
                      <TableRow key={item.questionId} hover>
                        <TableCell>{item.questionNumber}</TableCell>
                        <TableCell>{item.subject}</TableCell>
                        <TableCell>{item.userAnswerLabel}</TableCell>
                        <TableCell>{item.correctAnswerLabel}</TableCell>
                        <TableCell>
                          {!item.isAnswered && (
                            <Chip label="Unanswered" size="small" color="warning" variant="outlined" />
                          )}
                          {item.isAnswered && item.isCorrect && (
                            <Chip label="Correct" size="small" color="success" />
                          )}
                          {item.isAnswered && !item.isCorrect && (
                            <Chip label="Incorrect" size="small" color="error" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Button variant="contained" size="large" onClick={handleBackToHome} sx={{ alignSelf: 'flex-start' }}>
              Back to Home
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Result;
