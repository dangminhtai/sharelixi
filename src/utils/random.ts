export interface WheelPrize {
    id: string;
    label: string;
    value: number | 'SPECIAL';
    probability: number;
    color: string;
    textColor: string;
}

export interface SpinResult {
    prize: WheelPrize;
    finalValue: number;
    message: string;
}

export const WHEEL_PRIZES: WheelPrize[] = [
    {
        id: '10k',
        label: '10.000đ',
        value: 10000,
        probability: 19.1,
        color: '#FFFDD0', // Cream
        textColor: '#D00000'
    },
    {
        id: '20k',
        label: '20.000đ',
        value: 20000,
        probability: 45.2,
        color: '#FFD700', // Gold
        textColor: '#D00000'
    },
    {
        id: '50k',
        label: '50.000đ',
        value: 50000,
        probability: 15.3,
        color: '#FFA500', // Orange
        textColor: '#8B0000'
    },
    {
        id: '100k',
        label: '100.000đ',
        value: 100000,
        probability: 0.4,
        color: '#D00000', // Red
        textColor: '#FFD700'
    },
    {
        id: 'special',
        label: 'Đặc Biệt',
        value: 'SPECIAL',
        probability: 20.0,
        color: '#8B0000', // Dark Red
        textColor: '#FFD700'
    },
];

export const NEW_YEAR_WISHES = [
    "Tiền vào như nước sông Đà, tiền ra nhỏ giọt như cà phê phin.",
    "Sức khỏe vô biên, kiếm được nhiều tiền, đời sướng như tiên.",
    "Hay ăn chóng béo, tiền nhiều như kẹo, tình chặt như keo.",
    "Công thành danh toại, túi tiền rủng rỉnh, gia đình bình an.",
    "Năm mới năm me, gia đình mạnh khỏe, mọi người tươi trẻ, đi chơi vui vẻ.",
    "Vạn sự như ý, tỷ sự như mơ, triệu điều bất ngờ, không chờ cũng đến."
];

// Compatibility exports if needed elsewhere
export type Prize = WheelPrize;
export const PRIZES = WHEEL_PRIZES;

export const getRandomPrize = (): WheelPrize => {
    const random = Math.random() * 100;
    let cumulativeProbability = 0;

    for (const prize of WHEEL_PRIZES) {
        cumulativeProbability += prize.probability;
        if (random <= cumulativeProbability) {
            return prize;
        }
    }
    return WHEEL_PRIZES[0];
};

export const getSpecialPrizeValue = (): number => {
    return Math.floor(Math.random() * (30000 - 20000 + 1)) + 20000;
}
