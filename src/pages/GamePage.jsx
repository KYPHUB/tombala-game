import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Fade, Grid } from '@mui/material';
import TombalaCard from '../components/TombalaCard';
import BallDraw from '../components/BallDraw';
import Board from '../components/Board';
import WinnerModal from '../components/WinnerModal';
import PlayerList from '../components/PlayerList';
import { useTombalaGame } from '../hooks/useTombalaGame';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function GamePage() {
  const {
    card,
    drawnNumbers,
    drawNumber,
    winnerState,
    chinkoCount
  } = useTombalaGame();

  const { user } = useAuth();
  const { lobbyId } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [players, setPlayers] = useState([]);
  const [ownerEmail, setOwnerEmail] = useState('');

  // Lobi bilgisi her zaman fetch edilmeli (yenileme / yönlenme sonrası için)
  useEffect(() => {
    const fetchLobby = async () => {
      try {
        const res = await axios.get(`/api/lobbies/${lobbyId}`);
        setIsOwner(res.data.createdBy === user?.email);
        setOwnerEmail(res.data.createdBy);
        setPlayers(res.data.participants || []);
      } catch (err) {
        console.error('Lobi bilgisi alınamadı:', err);
      }
    };

    if (lobbyId && user) {
      fetchLobby();
    }
  }, [lobbyId, user]);

  const chinkoText = chinkoCount === 1 ? '1. ÇİNKO!' : chinkoCount === 2 ? '2. ÇİNKO!' : '';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #000428, #004e92)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 2,
        py: 4,
        gap: 4,
        position: 'relative',
      }}
    >
      <Typography variant="h3" fontWeight="bold" color="#00eaff">
        Tombala
      </Typography>

      <Fade in={!!chinkoText} timeout={600}>
        <Box
          sx={{
            position: 'absolute',
            top: 24,
            right: 24,
            px: 3,
            py: 1,
            borderRadius: 2,
            bgcolor: '#ffc107',
            color: '#000',
            fontWeight: 'bold',
            boxShadow: '0 0 10px #0007',
          }}
        >
          {chinkoText}
        </Box>
      </Fade>

      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <TombalaCard card={card} />
        </Grid>
        <Grid item>
          <PlayerList players={players} ownerEmail={ownerEmail} />
        </Grid>
      </Grid>

      <BallDraw
        drawnNumber={drawnNumbers[drawnNumbers.length - 1]}
        onDrawClick={drawNumber}
        disabled={!isOwner || !!winnerState}
      />

      <Board drawnNumbers={drawnNumbers} />

      <WinnerModal
        open={!!winnerState}
        onClose={() => window.location.reload()}
        winnerName={user?.email || 'Oyuncu'}
        isFullHouse={winnerState?.isFullHouse}
      />
    </Box>
  );
}
