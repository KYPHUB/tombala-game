import React, { useEffect, useState, useCallback } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Board from "./components/Board";
import { generateCard } from "./logic/generateCard";
import { useTombalaSocket } from "./hooks/useTombalaSocket";

export default function TombalaGame() {
  const [card] = useState(generateCard); // her oyuncuya özel kart
  const [drawn, setDrawn] = useState(new Set()); // sunucudan gelenler

  const socket = useTombalaSocket(
    useCallback(({ number }) => {
      setDrawn(prev => new Set(prev).add(number));
    }, [])
  );

  useEffect(() => {
  if (!socket) return;

  const playerId = socket.id || "anon-" + Date.now();
  socket.emit("tombala:join", { playerId });
}, [socket]);

socket.on("connect_error", (err) => {
  console.error("❌ Socket connect error:", err.message);
});


  // Şimdilik admin paneli simülasyonu (buton)
  const handleAdminDraw = () => {
  if (!socket) return; 

  socket.emit("tombala:admin-draw");

  
};

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h5">Tombala (Sunucu Kontrollü)</Typography>

      <Board card={card} drawn={drawn} />
      
      {!socket?.connected && (
  <Typography variant="caption" color="gray">
    Bağlantı bekleniyor...
  </Typography>
)}


      <Button
  variant="contained"
  onClick={handleAdminDraw}
  disabled={!socket || !socket.connected}
>
  ADMIN: SUNUCUDAN SAYI ÇEK
</Button>

      <Typography variant="caption">
        Çekilenler: {[...drawn].sort((a, b) => a - b).join(", ")}
      </Typography>
    </Stack>
  );
}
