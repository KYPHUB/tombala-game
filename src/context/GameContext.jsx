// context/GameContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Varsayılan ayarlar
const defaultSettings = {
  chinkoSound: true,
  animations: true,
  showNickname: true,
  theme: 'neon',
};

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  const toggleSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <GameContext.Provider value={{ settings, toggleSetting }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
};
