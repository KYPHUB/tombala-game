// components/TombalaCard.jsx
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

/** Kare hücre boyutu (px) */
const SIZE = 40;

/** Hücre stilleri – işaretli / boş / normal */
const cellSx = (cell) => ({
  width: SIZE,
  height: SIZE,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 1,
  fontWeight: 'bold',
  fontSize: '1rem',
  transition: 'all 0.25s ease',
  // Boş hücre
  ...(cell.number === null && {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'transparent',
  }),
  // İşaretli hücre
  ...(cell.number !== null &&
    cell.marked && {
      backgroundColor: '#7CFC00',
      boxShadow: '0 0 8px #7CFC00',
      color: '#000',
      border: '1px solid #ffffff33',
    }),
  // Normal (işaretlenmemiş) hücre
  ...(cell.number !== null &&
    !cell.marked && {
      backgroundColor: '#1e88e5',
      border: '1px solid #ffffff22',
      color: '#fff',
      '&:hover': {
        filter: 'brightness(1.15)',
      },
    }),
});

export default function TombalaCard({ card = [] }) {
  return (
    <Paper elevation={4} sx={{ p: 1.5, backgroundColor: '#0a1929', borderRadius: 2 }}>
      <Typography variant="h6" align="center" fontWeight="bold" color="#00eaff" mb={1}>
        TOMBALA
      </Typography>

      <Grid container spacing={0.5} direction="column">
        {card.map((row, ri) => (
          <Grid key={ri} container item spacing={0.5} justifyContent="center">
            {row.map((cell, ci) => (
              <Grid item key={ci}>
                <Box sx={cellSx(cell)}>
                  <Typography>{cell.number ?? ''}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
