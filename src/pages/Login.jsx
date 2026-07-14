import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import useSessionStore from '../store/sessionStore';
import { QUESTION_COUNT } from '../data/questions';

const examOptions = ['CTET Paper I', 'CTET Paper II'];
const languageOptions = ['English', 'Hindi'];

const Login = () => {
  const navigate = useNavigate();
  const [candidateName, setCandidateName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [selectedExam, setSelectedExam] = useState('CTET Paper I');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const { setCandidateName: saveCandidateName, setRegistrationNumber: saveRegistrationNumber, setSelectedExam: saveSelectedExam, setSelectedLanguage: saveSelectedLanguage, startSession } = useSessionStore();

  const handleStartPracticeTest = () => {
    if (!candidateName.trim()) {
      alert('Candidate Name is required');
      return;
    }

    saveCandidateName(candidateName.trim());
    saveRegistrationNumber(registrationNumber.trim());
    saveSelectedExam(selectedExam);
    saveSelectedLanguage(selectedLanguage);
    startSession();
    navigate('/instructions');
  };

  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 480, boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={600}>
                Government Examination
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Computer Based Test Portal
              </Typography>
            </Box>

            <TextField
              label="Candidate Name"
              required
              fullWidth
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
            <TextField
              label="Registration Number"
              fullWidth
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
            <TextField
              select
              label="Exam Selection"
              fullWidth
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
            >
              {examOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Language"
              fullWidth
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Duration: 150 Minutes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Questions: {QUESTION_COUNT}
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ py: 1.5, mt: 1 }}
              onClick={handleStartPracticeTest}
            >
              Start Practice Test
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
