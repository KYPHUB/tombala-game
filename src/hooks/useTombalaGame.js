import { useEffect, useState } from 'react';
import { generateCard } from '../utils/generateCard';
import { checkForWin } from '../utils/checkForWin';
import { useTombalaSocket } from './useTombalaSocket';

export function useTombalaGame() {
  const [card, setCard] = useState(generateCard());
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [winnerState, setWinnerState] = useState(null);
  const [chinkoCount, setChinkoCount] = useState(0);

  //  önce fonksiyon tanımlanmalı
  function onNumberDrawn(number) {
    setDrawnNumbers((prev) =>
      prev.includes(number) ? prev : [...prev, number]
    );
  }

  //  sonra hook çağrılmalı
  const socket = useTombalaSocket(onNumberDrawn);

  //  sadece kurucu kullanır
  function drawNumber() {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 90) + 1;
    } while (drawnNumbers.includes(newNumber));

    socket.emit('tombala:draw', { lobbyId: window.location.pathname.split('/').pop(), number: newNumber });
    onNumberDrawn(newNumber);
  }

  useEffect(() => {
    const updatedCard = card.map((row) =>
      row.map((cell) =>
        cell.number && drawnNumbers.includes(cell.number)
          ? { ...cell, marked: true }
          : cell
      )
    );

    const result = checkForWin(updatedCard);

    if (!winnerState && result.rowCount > chinkoCount && result.rowCount < 3) {
      setChinkoCount(result.rowCount);
    }

    if (result.isFullHouse && !winnerState) {
      setWinnerState(result);
    }

    setCard(updatedCard);
  }, [drawnNumbers]);

  return {
    card,
    drawnNumbers,
    drawNumber,
    winnerState,
    chinkoCount,
    socket
  };
}
