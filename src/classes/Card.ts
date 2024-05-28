import { v4 } from "uuid";

export class Card {
    type;
    color;
    number;
    id;
    constructor(type: CardType, color: CardColor | null, number: CardNumber | null) {
        this.type = type;
        this.color = color;
        this.number = number;
        this.id = v4();
    }
}

export class NumberCard extends Card {
    color;
    number;
    constructor(color: CardColor, number: CardNumber) {
        super("number", color, number);
        this.color = color;
        this.number = number;
    }
}

export class SpecialColorCard extends Card {
    constructor(type: "skip" | "reverse" | "drawtwo", color: CardColor) {
        super(type, color, null);
        this.color = color;
    }
}

export class SpecialCard extends Card {
    constructor(type: "wildfour" | "wild") {
        super(type, null, null);
    }
}
