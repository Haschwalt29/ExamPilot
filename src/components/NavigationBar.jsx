import { Box, Button, Stack } from '@mui/material';

const NavigationBar = ({ onPrevious, onSaveNext, onClearResponse, onMarkReviewNext, onSubmit }) => {
  return (
    <Box sx={{ mt: 2, py: 2, borderTop: '1px solid #e0e0e0', bgcolor: '#fafbfc' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button variant="outlined" sx={{ minHeight: 44, flex: 1 }} onClick={onPrevious}>
          Previous
        </Button>
        <Button variant="contained" color="primary" sx={{ minHeight: 44, flex: 1 }} onClick={onSaveNext}>
          Save & Next
        </Button>
        <Button variant="outlined" color="secondary" sx={{ minHeight: 44, flex: 1 }} onClick={onClearResponse}>
          Clear Response
        </Button>
        <Button variant="contained" color="warning" sx={{ minHeight: 44, flex: 1 }} onClick={onMarkReviewNext}>
          Mark For Review & Next
        </Button>
      </Stack>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="success"
          sx={{ minHeight: 48, minWidth: 180, fontWeight: 700 }}
          onClick={onSubmit}
        >
          Submit Exam
        </Button>
      </Box>
    </Box>
  );
};

export default NavigationBar;
