import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';

const QuestionPanel = ({ questionNumber, totalQuestions, questionText, subject, difficulty, options, selectedValue, onOptionSelect }) => {
  return (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ px: { xs: 3, md: 4 }, py: { xs: 2.5, md: 3 } }}>
        <Stack spacing={2.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Box>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', letterSpacing: 0.5 }}>
                Question {questionNumber} of {totalQuestions}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                Subject: {subject}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Difficulty: {difficulty}
            </Typography>
          </Stack>

          <Divider />

          <Box>
            <Typography variant="body1" fontWeight={600} sx={{ mb: 1, whiteSpace: 'pre-line' }}>
              {questionText}
            </Typography>
          </Box>

          <Divider />

          <FormControl component="fieldset">
            <RadioGroup value={selectedValue || ''} onChange={(event) => onOptionSelect(event.target.value)}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={<Radio />}
                  label={<Typography variant="body2">{option.label}</Typography>}
                  sx={{ py: 1.25, borderRadius: 1, '& .MuiFormControlLabel-label': { fontSize: 14 } }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuestionPanel;
