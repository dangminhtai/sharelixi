export interface Prize {
    id: string;
    name: string;
    value: number; // For statistics
    probability: number; // Percentage (0-100)
    color: string;
    textColor: string;
}

export const PRIZES: Prize[] = [
    { id: '10k', name: '10.000đ', value: 10000, probability: 19.1, color: '#e63946', textColor: '#ffffff' },
    { id: '20k', name: '20.000đ', value: 20000, probability: 45.2, color: '#f1faee', textColor: '#e63946' },
    { id: '50k', name: '50.000đ', value: 50000, probability: 15.3, color: '#a8dadc', textColor: '#1d3557' },
    { id: '100k', name: '100.000đ', value: 100000, probability: 0.4, color: '#457b9d', textColor: '#ffffff' },
    { id: 'special', name: 'Đặc Biệt', value: 0, probability: 20.0, color: '#ffd700', textColor: '#c1121f' }, // Value varies
];

export const getRandomPrize = (): Prize => {
    const random = Math.random() * 100;
    let cumulativeProbability = 0;

    for (const prize of PRIZES) {
        cumulativeProbability += prize.probability;
        if (random <= cumulativeProbability) {
            return prize;
        }
    }

    // Fallback (should ideally not happen if probs sum to >= 100)
    return PRIZES[0];
};

export const getSpecialPrizeValue = (): number => {
    // Random between 20000 and 30000
    return Math.floor(Math.random() * (30000 - 20000 + 1)) + 20000;
}
