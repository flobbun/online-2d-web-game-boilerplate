import { useGameStore } from "../stores/game.store";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game');
    }

    create() {
        useGameStore.subscribe(this.stateUpdate.bind(this));

        const game = this.add.text(100, 100, 'Click me!');
        game.setInteractive();
        game.on('pointerdown', () => {
            useGameStore.getState().incrementScore();
        });
    }

    stateUpdate() {
        const newState = useGameStore.getState();
        console.log('New state:', newState);
    }
}