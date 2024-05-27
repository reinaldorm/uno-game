import { NumberCard, SpecialColorCard, SpecialCard } from "./Card";

import type Card from "./Card";

interface CurrentPlayer {
    player: Player;
    selectedCards: Card[];
}

export default class Game {
    deck: Card[];
    players: Player[];
    currentPlayer: CurrentPlayer;
    lastCard: Card;
    lastFourCards: [Card | null, Card | null, Card | null, Card | null];
    constructor() {
        this.deck = [];
        this.lastCard = new NumberCard(0, 9);
        this.lastFourCards = [null, null, null, this.lastCard];

        this.players = [];
        this.currentPlayer = {
            player: this.players[0],
            selectedCards: [],
        };
    }

    createDeck() {
        // four zero cards of each color
        for (let color = 0; color < 4; color += 1) {
            // @ts-ignore: `color` always in range
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
                this.deck.push(new SpecialColorCard(1, color));
                // @ts-ignore: `color` always in range
                this.deck.push(new SpecialColorCard(2, color));
                // @ts-ignore: `color` always in range
                this.deck.push(new SpecialColorCard(3, color));
            }
        }

        // four wild and wild draw four cards
        for (let i = 0; i < 4; i += 1) {
            this.deck.push(new SpecialCard(4));
            this.deck.push(new SpecialCard(5));
        }
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    selectCard(cardIndex: number) {
        const newSelectedCard: Card | undefined = this.currentPlayer.player.cards[cardIndex];

        if (newSelectedCard) {
            this.currentPlayer.selectedCards.push(newSelectedCard);
        } else {
            this.currentPlayer.selectedCards = [];
        }
    }

    playCard() {
        if (this.currentPlayer.selectedCards === null) return;

        // if (this.currentPlayer.selectedCards.)
    }

    declareWinner() {
        //TODO
    }

    init() {
        this.createDeck();
        this.shuffleDeck();

        return this;
    }
}
