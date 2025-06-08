// utils/generateCard.js
//
// 1 – 90 arasından rastgele 15 sayı seçip
// 3 × 9’luk Tombala kartına yerleştirir.
// Her hücre { number: <sayı veya null>, marked: false } şeklindedir.
// Dışa “generateCard” adıyla **named export** yapılır.

export function generateCard() {
  // 1) 90 sayıyı diziye al
  const pool = Array.from({ length: 90 }, (_, i) => i + 1);

  // 2) 15 rastgele sayı seç
  const selected = [];
  while (selected.length < 15) {
    const index = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(index, 1)[0]);
  }

  // 3) 15 sayıyı 3 satıra eşit dağıt
  const rows = [[], [], []];
  selected.forEach((num, i) => rows[i % 3].push(num));

  // 4) Her satırda 5 sayı olacak biçimde 9 sütuna yerleştir
  const card = rows.map((rowNums) => {
    // Hangi sütunlara sayı gelecek? 0-8 arası 5 rastgele sütun
    const cols = [];
    while (cols.length < 5) {
      const col = Math.floor(Math.random() * 9);
      if (!cols.includes(col)) cols.push(col);
    }
    cols.sort((a, b) => a - b);
    rowNums.sort((a, b) => a - b);

    // Hücreleri oluştur
    const fullRow = Array(9)
      .fill(null)
      .map(() => ({ number: null, marked: false }));

    cols.forEach((colIdx, i) => {
      fullRow[colIdx] = { number: rowNums[i], marked: false };
    });

    return fullRow;
  });

  return card; // 3 × 9 matris – hücre nesneleri
}
