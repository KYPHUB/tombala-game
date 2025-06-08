    // utils/nickname.js

    const adjectives = [
    "Parlak", "Uçan", "Çılgın", "Sihirli", "Gizli", "Havalı", "Neon", "Zıpır", "Fırtına", "Sessiz"
    ];

    const nouns = [
    "Kedi", "Ejderha", "Ninja", "Kartal", "Robot", "Penguen", "Panter", "Samuray", "Yıldız", "Aslan"
    ];

    export function generateRandomNickname() {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 100);
    return `${adj}${noun}${number}`;
    }
