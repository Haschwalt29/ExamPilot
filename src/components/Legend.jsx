import { Box, Stack, Typography } from '@mui/material';
import { EXAM_PALETTE_COLORS } from '../constants/examColors';

const legendItems = [
  { label: 'Not Visited', color: EXAM_PALETTE_COLORS.notVisited },
  { label: 'Answered', color: EXAM_PALETTE_COLORS.answered },
  { label: 'Not Answered', color: EXAM_PALETTE_COLORS.notAnswered },
  { label: 'Marked For Review', color: EXAM_PALETTE_COLORS.review },
  { label: 'Current Question', color: 'transparent', outline: EXAM_PALETTE_COLORS.current },
];

const Legend = () => {
  return (
    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: '#fff' }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Legend
      </Typography>
      <Stack spacing={1.25}>
        {legendItems.map((item) => (
          <Stack key={item.label} direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: 0.5,
                bgcolor: item.color || '#fff',
                border: item.outline ? `2px solid ${item.outline}` : '1px solid rgba(0,0,0,0.12)',
              }}
            />
            <Typography variant="body2">{item.label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default Legend;
