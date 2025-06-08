// components/WinnerModal.jsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
  Box
} from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useTheme } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function WinnerModal({ open, onClose, winnerName, isFullHouse }) {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      PaperProps={{
        sx: {
          textAlign: 'center',
          p: 4,
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'
              : 'linear-gradient(135deg, #ffffff, #f5f5f5)',
          color: theme.palette.text.primary,
          boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          {isFullHouse ? <EmojiEventsIcon fontSize="large" /> : <CelebrationIcon fontSize="large" />}
          <Typography variant="h5" fontWeight="bold">
            {isFullHouse ? 'TOMBALA!' : 'ÇİNKO!'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6" mt={2}>
          Kazanan: <strong>{winnerName}</strong>
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ borderRadius: 3, px: 4 }}
        >
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WinnerModal;
