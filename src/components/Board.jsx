import React from 'react';
import { Box } from '@mui/material';

export default function Board({ drawnNumbers = [] }) {
  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 2,
        bgcolor: '#102030',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 1.5,
        boxShadow: '0 0 12px rgba(0,0,0,0.4)',
        minHeight: 120,
      }}
    >
      {drawnNumbers.length === 0 ? (
        <Box sx={{ color: '#ccc' }}>Henüz çekilen sayı yok</Box>
      ) : (
        drawnNumbers.map((n) => (
          <Box
            key={n}
            sx={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: '#1e88e5',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 0 6px rgba(30,136,229,0.7)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: '#42a5f5',
              },
            }}
          >
            {n}
          </Box>
        ))
      )}
    </Box>
  );
}
