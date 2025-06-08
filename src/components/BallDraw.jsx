import React from 'react';
import { Box, Button, Typography, Fade } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';

export default function BallDraw({ drawnNumber, onDrawClick, disabled }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        mt: 4,
      }}
    >
      <Fade in={Boolean(drawnNumber)} timeout={400}>
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, #00eaff, #007ea7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px #00eaff88',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '0 0 6px #000',
            }}
          >
            {drawnNumber ?? '--'}
          </Typography>
        </Box>
      </Fade>

      <Button
        onClick={onDrawClick}
        disabled={disabled}
        startIcon={<CasinoIcon />}
        variant="contained"
        size="large"
        sx={{
          mt: 2,
          borderRadius: 3,
          fontWeight: 'bold',
          px: 4,
          background: 'linear-gradient(90deg,#00c9ff,#92fe9d)',
          color: '#1c1c1c',
          '&:hover': {
            background: 'linear-gradient(90deg,#00b7e6,#7de58a)',
            filter: 'brightness(1.1)'
          }
        }}
      >
        RASTGELE SAYI ÇEK
      </Button>
    </Box>
  );
}
