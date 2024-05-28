import { Card, NumberCard, SpecialColorCard, SpecialCard } from "./Card";
import Player from "./Player";

interface Turn {
    player: Player;
    color: CardColor;
    coloring: boolean;
    selectedCards: Card[];
    availableCards: Card[];
}

interface Streak {
    ongoing: boolean;
    payload: number;
}

interface Config {
    handSize: number;
}

export default class Game {
    deck: Card[];
    firstCard: NumberCard;
    lastCard: Card;
    lastFourCards: [Card | null, Card | null, Card | null, Card | null];
    players: Player[];
    turn: Turn;
    streak: Streak;
    config: Config;
    constructor(handSize: number) {
        this.deck = [];

        this.firstCard = new NumberCard(0, 9);
        this.lastCard = this.firstCard;
        this.lastFourCards = [null, null, null, this.lastCard];

        this.players = [];
        this.turn = {
            player: this.players[0],
            color: this.firstCard.color,
            coloring: false,
            selectedCards: [],
            availableCards: [],
        };

        this.streak = { ongoing: false, payload: 0 };
        this.config = { handSize };
    }

    private createDeck() {
        // four zero cards of each color
        for (let color = 0; color < 4; color += 1) {
            // @ts-ignore: `color` and `number` always in range
            this.deck.push(new NumberCard(color, 0));
        }

        // two of each number per color
        for (let color = 0; color < 4; color += 1) {
            for (let number = 0; number < 9; number += 1) {
                for (let i = 0; i < 2; i += 1) {
                    // @ts-ignore: `color` and `number` always in range
                    this.deck.push(new NumberCard(color, number + 1));
                }
            }
        }

        // two of each special (skip, block, draw two) per color
        for (let color = 0; color < 4; color += 1) {
            for (let i = 0; i < 2; i += 1) {
                // @ts-ignore: `color` always in range
                this.deck.push(new SpecialColorCard("drawtwo", color));
                // @ts-ignore: `color` always in range
                this.deck.push(new SpecialColorCard("reverse", color));
                // @ts-ignore: `color` always in range
                this.deck.push(new SpecialColorCard("skip", color));
            }
        }

        // four wild and wild draw four cards
        for (let i = 0; i < 4; i += 1) {
            this.deck.push(new SpecialCard("wild"));
            this.deck.push(new SpecialCard("wildfour"));
        }
    }

    private shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    private handOutDeck() {
        for (let player of this.players) {
            for (let i = 0; i < this.config.handSize; i += 1) {
                //@ts-ignore: deck always full when handing out cards
                player.cards.push(this.deck.pop());
            }
        }
    }

    private checkAvailableCards() {
        const availableCards: Card[] = [];

        // check whether or not the player is stacking cards, next available cards
        // must have the same type, the same number (if number) and different id.
        if (this.turn.selectedCards.length > 0) {
            const filteredDeck = this.turn.player.cards.filter(({ id }) => {
                return this.turn.selectedCards.every((selectedCard) => id !== selectedCard.id);
            });

            for (let card of filteredDeck) {
                if (card.number! && card.type === this.lastCard.type) availableCards.push(card);
                else if (card.number === this.lastCard.number) availableCards.push(card);
            }
        } else {
            for (let card of this.turn.player.cards) {
                //  if player not stacking then check whether the game is on an addition streak
                //  if so, the player can only play wild four or draw two; also, can't stack cards while on streak.
                if (this.streak.ongoing) {
                    if (card.type === "drawtwo" || card.type === "wildfour") availableCards.push(card);
                }
                // player not stacking and game not on streak, goes to normal flow
                else {
                    // bypass cards (wild, wildfour)
                    if (card.type === "wildfour" || card.type === "wild") availableCards.push(card);

                    // colored special cards (skip, reverse) that has the same type regardless of the color.
                    if (card.type === "skip" || card.type === "reverse") {
                        if (card.type === this.lastCard.type) availableCards.push(card);
                    }

                    // numbered cards that has the same number regardless of the color.
                    if (card.number === this.lastCard.number) availableCards.push(card);

                    // ultimately, cards that has the same color.
                    if (card.color === this.turn.color) availableCards.push(card);
                }
            }
        }

        this.turn.availableCards = availableCards;
    }

    public selectCard(cardId: string) {
        if (this.turn.availableCards.length <= 0) {
            console.log("no cards available");
            return;
        }

        const toBeSelected = this.turn.availableCards.find(({ id }) => id === cardId);

        if (toBeSelected) {
            this.turn.selectedCards.push(toBeSelected);
            console.log("card selected");
        } else {
            console.log("card not available");
        }
    }

    public unselectCards() {
        this.turn.selectedCards = [];
        this.turn.availableCards = [];
        this.checkAvailableCards();
    }

    public playCard() {
        const firstCard = this.turn.selectedCards[0];

        if (firstCard.type === "wild") {
            this.turn.coloring = true;
        }

        this.turn.player.cards = this.turn.player.cards.filter((card) => {
            return this.turn.selectedCards.every(({ id }) => card.id !== id);
        });
    }

    private updateTurn(reverse: boolean = false, skip: number = 0) {
        this.turn.availableCards = [];
        this.turn.selectedCards = [];

        const nextPlayer = this.players[this.turn.player.slot + 1];

        if (nextPlayer) {
            this.turn.player = nextPlayer;
        } else {
            this.turn.player = this.players[0];
        }
    }

    private updateStreak({ ongoing, payload }: Partial<Streak>) {
        if (ongoing && payload) {
            this.streak.ongoing = true;
            this.streak.payload += payload;
        } else {
            this.streak.ongoing = false;
            this.streak.payload = 0;
        }
    }

    private declareWinner() {}

    public init() {
        this.createDeck();
        this.shuffleDeck();

        return this;
    }
}
