// tombala-game/src/pages/MenuPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography, Stack, Paper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsPanel from '../components/SettingsPanel';
import { motion } from 'framer-motion';
import { useSocket } from '../context/WebSocketContext';

function MenuPage() {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const { lobbyId } = useParams();
  const socket = useSocket();

  // WS ile lobiye katıl + oyun başlatıldığında yönlendirme
  useEffect(() => {
    if (!socket || !lobbyId) return;

    socket.emit('join-lobby', lobbyId);
    console.log('🟢 WS → join-lobby', lobbyId);

    const handleStart = (id) => {
      console.log('🚀 tombala:start alındı', id);

      if (document.hidden) {
        const originalTitle = document.title;
        let toggle = true;
        const blinkInterval = setInterval(() => {
          document.title = toggle ? '🎯 Oyun Başladı!' : originalTitle;
          toggle = !toggle;
        }, 1000);

        const stopBlink = () => {
          clearInterval(blinkInterval);
          document.title = originalTitle;
          document.removeEventListener('visibilitychange', stopBlink);
        };

        document.addEventListener('visibilitychange', stopBlink);
      }

      navigate(`/tombala/play/${id}`);
    };

    socket.on('tombala:start', handleStart);
    return () => socket.off('tombala:start', handleStart);
  }, [socket, lobbyId, navigate]);

  const handleStartGame = () => {
    if (!socket) return;
    socket.emit('tombala:start', lobbyId);
    navigate(`/tombala/play/${lobbyId}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)',
        backgroundSize: '400% 400%',
        animation: 'gradientMove 15s ease infinite',
        '@keyframes gradientMove': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 420 }}
      >
        <Paper elevation={8} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontFamily: 'Orbitron', color: '#00eaff', mb: 4 }}>
            Tombala
          </Typography>

          <Stack spacing={2}>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={handleStartGame}
              sx={{ borderRadius: 3, fontWeight: 'bold' }}
            >
              Oyna
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<SettingsIcon />}
              onClick={() => setShowSettings(!showSettings)}
              sx={{ borderRadius: 3 }}
            >
              Ayarlar
            </Button>
          </Stack>

          {showSettings && (
            <Box mt={4}>
              <SettingsPanel />
            </Box>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
}

export default MenuPage;
