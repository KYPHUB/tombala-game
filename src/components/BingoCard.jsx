import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

const CELL_SIZE = 48;
const HEADERS = ['B', 'I', 'N', 'G', 'O'];

const Cell = styled(Paper)(({ theme }) => ({
  width: CELL_SIZE,
  height: CELL_SIZE,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
}));

const CenterCell = styled(Cell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

const BingoCard = ({ numbers = [] }) => {
  return (
    <Box display="inline-block" p={2} borderRadius={3} boxShadow={3}>
      <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
        TOMBALA KARTI
      </Typography>
      <Grid container spacing={0} justifyContent="center">
        {HEADERS.map((header) => (
          <Cell key={header}>{header}</Cell>
        ))}
        {numbers.map((row, rowIndex) =>
          row.map((num, colIndex) => {
            const isCenter = rowIndex === 2 && colIndex === 2;
            if (isCenter) {
              return <CenterCell key={`center`} >✓</CenterCell>;
            }
            return <Cell key={`${rowIndex}-${colIndex}`}>{num}</Cell>;
          })
        )}
      </Grid>
    </Box>
  );
};

export default BingoCard;
