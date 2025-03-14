class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.image('startButton', 'assets/start.png');
        this.load.image('backgroundMenu', 'assets/background_menu.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundMenu');
        this.add.text(175, 150, "Jogo do Labirinto", { fontSize: "48px", fill: "#fff" });
        let startButton = this.add.image(400, 300, 'startButton').setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}