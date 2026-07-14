export const EXAM_PALETTE_COLORS = {
  notVisited: '#e0e0e0',
  answered: '#2e7d32',
  notAnswered: '#d32f2f',
  review: '#6a1b9a',
  current: '#1565c0',
};

export const HEADER_BG = '#f7f9fc';
export const HEADER_TEXT = '#0f4c81';
export const HEADER_TIMER_BG = '#e3f2fd';

export const TIMER_COLORS = {
  normal: '#1565c0',
  warning: '#ed6c02',
  critical: '#d32f2f',
};

export const formatRemainingTime = (totalSeconds) => {
  const seconds = Math.max(0, totalSeconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const getTimerColor = (remainingSeconds) => {
  if (remainingSeconds <= 300) {
    return TIMER_COLORS.critical;
  }
  if (remainingSeconds <= 1800) {
    return TIMER_COLORS.warning;
  }
  return TIMER_COLORS.normal;
};
