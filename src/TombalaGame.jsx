// tombala-game/src/TombalaGame.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import GamePage from './pages/GamePage';
import { GameProvider } from './context/GameContext';

export default function TombalaGame() {
  return (
    <GameProvider>
      <Routes>
        <Route path="menu/:lobbyId" element={<MenuPage />} />
        <Route path="play/:lobbyId" element={<GamePage />} />
      </Routes>
    </GameProvider>
  );
}
