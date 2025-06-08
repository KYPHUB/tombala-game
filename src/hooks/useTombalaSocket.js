// hooks/useTombalaSocket.js
import { useEffect } from 'react';
import { useSocket } from '../context/WebSocketContext';
import { useParams } from 'react-router-dom';

/**
 * WebSocket bağlantısı üzerinden tombala çekilişlerini dinler.
 * Sayı çekilince `onDraw(number)` tetiklenir.
 */
export function useTombalaSocket(onDraw) {
  const socket = useSocket();
  const { lobbyId } = useParams();

  useEffect(() => {
    if (!socket || !lobbyId) return;

    //  Oyuncu WS üzerinden lobby'e katılır
    console.log('📡 [WS] Lobiye bağlanılıyor:', lobbyId);
    socket.emit('join-lobby', lobbyId);

    //  Çekilen sayı mesajı geldiğinde çalışır
    const handleDraw = (number) => {
      console.log('🎯 [WS] Sayı geldi:', number);
      if (typeof onDraw === 'function') {
        onDraw(number);
      }
    };

    socket.on('tombala:draw', handleDraw);

    return () => {
      socket.off('tombala:draw', handleDraw);
    };
  }, [socket, lobbyId, onDraw]);

  return socket;
}
