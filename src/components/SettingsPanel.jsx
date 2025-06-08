// components/SettingsPanel.jsx
import React from 'react';
import {
  Box, Typography, Switch, FormControlLabel,
  ToggleButton, ToggleButtonGroup, Stack
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import PaletteIcon from '@mui/icons-material/Palette';
import { useGame } from '../context/GameContext';

const NEON = '#00eaff';
const YELLOW = '#fdd835';

const SettingsPanel = () => {
  const { settings, toggleSetting } = useGame();

  const toggleSx = (value, selected, color) => ({
    color: selected === value ? color : '#ccc',
    borderColor: selected === value ? color : '#8884',
    '&.Mui-selected': {
      backgroundColor: `${color}22`,
      color,
      borderColor: color,
      boxShadow: `0 0 12px ${color}`,
    },
  });

  return (
    <Box sx={{ p: 3, borderRadius: 3, background: '#121212bb', color: 'white' }}>
      <Typography variant="h5" gutterBottom>
        Ayarlar
      </Typography>

      <Stack spacing={3}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.chinkoSound}
              onChange={() => toggleSetting('chinkoSound', !settings.chinkoSound)}
            />
          }
          label={<><VolumeUpIcon sx={{ mr: 1 }} /> Çinko Sesi</>}
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.animations}
              onChange={() => toggleSetting('animations', !settings.animations)}
            />
          }
          label={<><AutoFixHighIcon sx={{ mr: 1 }} /> Animasyonlar</>}
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.showNickname}
              onChange={() => toggleSetting('showNickname', !settings.showNickname)}
            />
          }
          label={<><ShuffleIcon sx={{ mr: 1 }} /> Rastgele Nickname</>}
        />
        <Box>
          <Typography sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <PaletteIcon sx={{ mr: 1 }} /> Tema
          </Typography>
          <ToggleButtonGroup
            exclusive
            value={settings.theme}
            onChange={(_, val) => val && toggleSetting('theme', val)}
            size="small"
          >
            <ToggleButton value="neon" sx={toggleSx('neon', settings.theme, NEON)}>Neon</ToggleButton>
            <ToggleButton value="classic" sx={toggleSx('classic', settings.theme, YELLOW)}>Klasik</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>
    </Box>
  );
};

export default SettingsPanel;
