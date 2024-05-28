/**
 * NUMBER (ZERO TO NINE),
 * SKIP,
 * REVERSE,
 * DRAW TWO,
 * WILD DRAW FOUR,
 * WILD.
 */

type CardType = "number" | "skip" | "reverse" | "drawtwo" | "wildfour" | "wild";

/**
 * RED,
 * GREEN,
 * BLUE,
 * YELLOW.
 */

type CardColor = 0 | 1 | 2 | 3;

type CardNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface Card {
    type: CardType;
    color: CardColor | null;
    number: CardNumber | null;
    id: string;
}

interface Player {
    cards: Card[];
    cardsLeft: number;
    slot: 1 | 2 | 3 | 4;
}
