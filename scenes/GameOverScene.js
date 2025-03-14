class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    preload() {
        this.load.image('backgroundGameOver', 'assets/background_gameover.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundGameOver');
        this.add.text(250, 280, "Game Over!", { fontSize: "48px", fill: "#000" });
        this.input.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

