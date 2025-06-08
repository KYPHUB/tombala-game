import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

export default function PlayerList({ players = [], ownerEmail }) {
  return (
    <Paper elevation={3} sx={{ p: 2, width: 300, backgroundColor: '#101d33' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#00eaff' }}>
        Oyuncular
      </Typography>
      <List dense>
        {players.map((email) => (
          <ListItem key={email} disablePadding>
            <ListItemText
              primary={
                email === ownerEmail
                  ? `${email} (Kurucu)`
                  : email
              }
              primaryTypographyProps={{ fontSize: '0.95rem', color: '#fff' }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
