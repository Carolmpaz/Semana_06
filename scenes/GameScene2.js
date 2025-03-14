class GameScene2 extends Phaser.Scene {
    constructor() {
        super("GameScene2"); 
        this.score = 0; // Inicializa a pontuação do jogador
        this.hasKey = false; // Indica se o jogador tem uma chave
        this.keysCollected = 0; // Inicializa o contador de chaves coletadas pelo jogador
         this.velocity = 100; // Define a velocidade inicial do inimigo
    }

    preload() {
        // Carrega as imagens utilizadas no jogo
        this.load.tilemapTiledJSON('map2', 'assets/map2.json');
        this.load.image('backgroundGame2', 'assets/background_game2.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('key', 'assets/key.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('door', 'assets/door.png');
    }

    create() {
        // Adiciona a imagem de fundo do jogo
        this.add.image(400, 300, 'backgroundGame2');

        // Cria o jogador e define suas propriedades físicas
        this.player_2 = this.physics.add.sprite(250, 250, 'player');
        this.player_2.setCollideWorldBounds(true); // Impede que o jogador saia dos limites da tela
        this.player_2.setBounce(0.2); // Define um pequeno efeito de quique

        // Cria a porta de saída e verifica e declara o que acontece quando o jogador encosta nela 
        this.door_2 = this.physics.add.sprite(500, 200, 'door');
        this.physics.add.overlap(this.player_2, this.door_2, this.enterDoor, null, this);

        // Cria o inimigo na cena
        this.addenemy();

        // Exibe o placar na tela
        this.scoreText = this.add.text(16, 16, 'Placar: 0', { fontSize: '32px', fill: '#fff' });

        // Cria a primeira chave no mapa
        this.spawnKey();

        // Cria a condição de game over do jogo 
        this.physics.add.overlap(this.player_2, this.enemy_2, () => {
            this.scene.start('GameOverScene');
        });

        // Configura os controles do teclado para movimentação
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Define a velocidade inicial do personagem como zero
        this.player_2.setVelocity(0);

        // Movimentação do jogador usando as setas do teclado
        if (this.cursors.left.isDown) { // Verifica se a seta "direita" foi pressionada
            this.player_2.setVelocityX(-160);
        } else if (this.cursors.right.isDown) { // Verifica se a seta "esquerda" foi pressionada
            this.player_2.setVelocityX(160);
        }

        if (this.cursors.up.isDown) { // Verifica se a seta "superior" foi pressionada
            this.player_2.setVelocityY(-160);
        } else if (this.cursors.down.isDown) { // Verifica se a seta "inferior" foi pressionada
            this.player_2.setVelocityY(160);
        }
    }

    // Cria o inimigo no jogo e define seu comportamento
    addenemy() {
        this.enemy_2 = this.physics.add.sprite(400, 200, 'enemy');
        this.enemy_2.setVelocity(this.velocity, this.velocity); // Define a velocidade inicial
        this.enemy_2.setBounce(1, 1); // Faz o inimigo quicar ao bater nas paredes
        this.enemy_2.setCollideWorldBounds(true); // Impede que o inimigo saia da tela
        
    }

    // Gera uma nova chave no mapa
    spawnKey() {
        if (this.keysCollected < 10) { // Apenas gera a chave se ainda não estiver sido coletas 10 chaves 
            if (this.keyItem_2) {
                this.keyItem_2.destroy(); // Remove a chave anterior antes de criar uma nova
                this.velocity += 25; // Aumenta a velocidade do inimigo a cada chave coletada
                this.enemy_2.setVelocity(this.velocity, this.velocity); // Atualiza a velocidade do inimigo
            }

            // Define uma posição aleatória para a chave
            let x = Phaser.Math.Between(50, 750);
            let y = Phaser.Math.Between(50, 550);
            this.keyItem_2 = this.physics.add.sprite(x, y, 'key');

            // Configura a colisão entre o jogador e a chave
            this.physics.add.overlap(this.player_2, this.keyItem_2, this.collectKey, null, this);
            this.hasKey = false;
        }
    }

    // Função chamada quando o jogador coleta uma chave
    collectKey(player_2, key) {
        key.destroy(); // Remove a chave coletada
        this.hasKey = true; // Marca que o jogador tem uma chave
        this.keysCollected += 1; // Incrementa o número de chaves coletadas
        this.score += 10; // Adiciona pontos ao placar
        this.scoreText.setText('Placar: ' + this.score); // Atualiza o placar na tela

        if (this.keysCollected < 10) {
            this.spawnKey(); // Gera uma nova chave se ainda não atingiu o limite
        }
    }

    // Função chamada quando o jogador tenta entrar na porta
    enterDoor(player, door_2) {
        if (this.hasKey && this.keysCollected >= 10) {
            this.scene.start('WinScene'); // Se todas as chaves foram coletadas, o jogador vence
        }
    }
}
