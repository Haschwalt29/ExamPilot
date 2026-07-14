import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { HEADER_BG, HEADER_TEXT, HEADER_TIMER_BG } from '../constants/examColors';

const ExamHeader = ({ candidateName, examName, selectedLanguage, timerLabel }) => {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        height: 70,
        bgcolor: HEADER_BG,
        borderBottom: '1px solid #dfe3e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 3 },
      }}
    >
      <Stack direction="row" spacing={3} alignItems="center" sx={{ minWidth: 0 }}>
        <Box>
          <Typography variant="h6" sx={{ color: HEADER_TEXT, fontWeight: 700, lineHeight: 1 }}>
            ExamPilot
          </Typography>
          <Typography variant="body2" sx={{ color: HEADER_TEXT, opacity: 0.8 }}>
            Computer Based Examination Simulator
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={4} alignItems="center" sx={{ overflow: 'hidden' }}>
        <Box>
          <Typography variant="caption" sx={{ color: HEADER_TEXT, opacity: 0.7, letterSpacing: 0.5 }}>
            Candidate
          </Typography>
          <Typography variant="body2" sx={{ color: HEADER_TEXT, fontWeight: 600 }}>
            {candidateName}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: HEADER_TEXT, opacity: 0.7, letterSpacing: 0.5 }}>
            Exam
          </Typography>
          <Typography variant="body2" sx={{ color: HEADER_TEXT, fontWeight: 600 }}>
            {examName}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: HEADER_TEXT, opacity: 0.7, letterSpacing: 0.5 }}>
            Language
          </Typography>
          <Typography variant="body2" sx={{ color: HEADER_TEXT, fontWeight: 600 }}>
            {selectedLanguage}
          </Typography>
        </Box>
        <Box sx={{ px: 2, py: 1, bgcolor: HEADER_TIMER_BG, borderRadius: 1, minWidth: 132, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: HEADER_TEXT, opacity: 0.8, letterSpacing: 0.5 }}>
            Time Left
          </Typography>
          <Typography variant="subtitle1" sx={{ color: HEADER_TEXT, fontWeight: 700 }}>
            {timerLabel}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ExamHeader;
