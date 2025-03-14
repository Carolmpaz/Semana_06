class WinScene extends Phaser.Scene {
    constructor() {
        super("WinScene");
    }

    preload() {
        this.load.image('backgroundWin', 'assets/background_win.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundWin');
        this.add.text(250, 280, "Você Ganhou!", { fontSize: "48px", fill: "#fff" }).setOrigin(0,0);
        this.input.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

