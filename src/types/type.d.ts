type CardType = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * 0: NUMBER (ZERO TO NINE)
 * 1: SKIP
 * 2: REVERSE
 * 3: DRAW TWO
 * 4: WILD DRAW FOUR
 * 5: WILD
 */

type CardColor = 0 | 1 | 2 | 3;

/**
 * 0: RED
 * 1: GREEN
 * 2: BLUE
 * 3: YELLOW
 */

type CardNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface Card {
    type: CardType;
    color: CardColor | null;
    number: CardNumber | null;
}

interface Player {
    cards: Card[];
    cardsLeft: number;
    slot: 1 | 2 | 3 | 4;
}
