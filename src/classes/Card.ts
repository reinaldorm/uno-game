export default class Card {
    type;
    color;
    number;
    constructor(type: CardType, color: CardColor | null, number: CardNumber | null) {
        this.type = type;
        this.color = color;
        this.number = number;
    }
}

export class NumberCard extends Card {
    constructor(color: CardColor, number: CardNumber) {
        super(0, color, number);
    }
}

export class SpecialColorCard extends Card {
    constructor(type: 1 | 2 | 3, color: CardColor) {
        super(type, color, null);
    }
}

export class SpecialCard extends Card {
    constructor(type: 4 | 5) {
        super(type, null, null);
    }
}
