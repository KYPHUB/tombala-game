// Kart: 3x9 matris. Her hücre: { number, marked: true/false }

export function checkForWin(card) {
  if (!Array.isArray(card) || card.length !== 3) {
    return { rowCount: 0, hasAnyWin: false, isFullHouse: false };
  }

  const isRowComplete = (row) =>
    row.every(cell => !cell?.number || cell.marked);

  let rowCount = 0;

  for (const row of card) {
    if (isRowComplete(row)) rowCount++;
  }

  return {
    rowCount,
    hasAnyWin: rowCount > 0,
    isFullHouse: rowCount === 3
  };
}
