export default class Player {
    cards: Card[];
    cardsLeft;
    slot;
    constructor(handSize: number, slot: 1 | 2 | 3 | 4) {
        this.cards = [];
        this.cardsLeft = handSize;
        this.slot = slot;
    }
}
