var GameScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function GameScene() {
        Phaser.Scene.call(this, { key: "gameScene", active: true });

        this.player = null;
        this.cursors = null;
        this.score = 0;
        this.scoreText = null;
    },

    preload: function () {
        this.load.spritesheet("player-idle", "./assets/stage1/user-idle.png", {
            frameWidth: 189,
            frameHeight: 353,
        });
        this.load.spritesheet("player-jump", "./assets/stage1/user-jump.png", {
            frameWidth: 249,
            frameHeight: 352,
        });
        this.load.spritesheet("player-move", "./assets/stage1/user-move.png", {
            frameWidth: 221.5,
            frameHeight: 349,
        });
        this.load.image("arrow-left", "./assets/arrow-left.png");
        this.load.image("arrow-right", "./assets/arrow-right.png");
        this.load.image("circle", "./assets/circle.png");
        this.load.image("sky", "./assets/stage1/sky.png");
        this.load.image("ground", "./assets/stage1/ground.2.png");
        this.load.image("bushes1", "./assets/stage1/bushes1.png");
        this.load.image("bushes2", "./assets/stage1/bushes2.png");
        this.load.image("bushes3", "./assets/stage1/bushes3.png");
        this.load.image("bushes4", "./assets/stage1/bushes4.png");
        this.load.image("small-tree", "./assets/stage1/small_tree.png");
        this.load.image("big-tree", "./assets/stage1/big_tree.png");
        this.load.image("cloud1", "./assets/stage1/cloud1.png");
        this.load.image("cloud2", "./assets/stage1/cloud2.png");
        this.load.image("cloud3", "./assets/stage1/cloud3.png");
        this.load.image("cloud4", "./assets/stage1/cloud4.png");
        this.load.image("cloud5", "./assets/stage1/cloud5.png");

        this.load.image("pad1", "./assets/stage1/pad1.png");
        this.load.image("pad2", "./assets/stage1/pad2.png");
        this.load.image("pad3", "./assets/stage1/pad3.png");
        this.load.image("pad4", "./assets/stage1/pad4.png");
        this.load.image("pad5", "./assets/stage1/pad5.png");

        this.load.image("raindrop", "./assets/stage1/pink_bubble.png");
    },

    create: function () {
        this.add.image(0, 0, "sky").setScale(2);
        this.add.image(800, 550, "bushes1").setScale(1);
        this.add.image(2250, 600, "bushes3").setScale(1);
        this.add.image(3100, 700, "bushes2").setScale(1);
        this.add.image(4100, 600, "bushes4").setScale(1);
        this.add.image(1250, 680, "small-tree").setScale(0.9);

        this.add.image(800, 100, "cloud1").setScale(1);
        this.add.image(400, 400, "cloud1").setScale(1);
        this.add.image(1300, 200, "cloud5").setScale(1);
        this.add.image(1600, 500, "cloud3").setScale(1);
        this.add.image(2250, 200, "cloud3").setScale(1);
        this.add.image(3100, 300, "cloud2").setScale(1);
        this.add.image(1850, 300, "cloud3").setScale(1);
        this.add.image(1400, 200, "cloud2").setScale(1);
        this.add.image(4100, 500, "cloud4").setScale(1);
        this.add.image(5000, 600, "cloud5").setScale(1);

        var platforms = this.physics.add.staticGroup();
        platforms.create(2600, 950, "ground").setScale(1).refreshBody();
        this.add.image(3400, 200, "big-tree").setScale(0.7);

        let pad1 = this.add.image(3350, 730, "pad1");
        let pad2 = this.add.image(3430, 640, "pad2");
        let pad3 = this.add.image(3550, 550, "pad3");
        let pad4 = this.add.image(3750, 480, "pad4");
        let pad5 = this.add.image(3350, 400, "pad5");

        this.raindrop1 = this.add.image(550, 700, "raindrop").setScale(0.6);
        this.raindrop1.originY = 700;
        this.raindrop2 = this.add.image(650, 680, "raindrop").setScale(0.6);
        this.raindrop3 = this.add.image(750, 640, "raindrop").setScale(0.6);
        this.raindrop4 = this.add.image(850, 580, "raindrop").setScale(0.6);
        this.raindrop5 = this.add.image(950, 540, "raindrop").setScale(0.6);
        this.raindrop6 = this.add.image(1050, 520, "raindrop").setScale(0.6);
        this.raindrop7 = this.add.image(3430, 580, "raindrop").setScale(0.6);
        this.raindrop8 = this.add.image(3550, 480, "raindrop").setScale(0.6);
        this.raindrop_distance = 0;

        var player = this.physics.add.sprite(50, 800, "player-idle");
        player.setBounce(0.15);
        player.setScale(0.4);
        player.setCollideWorldBounds(true);

        // this.physics.add.collider(player, pad1 , pad2 , pad3 , pad4 , pad5);

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player-idle", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("player-jump", {
                start: 0,
                end: 20,
            }),
            frameRate: 20,
            repeat: 0,
        });

        this.anims.create({
            key: "move",
            frames: this.anims.generateFrameNumbers("player-move", {
                start: 0,
                end: 17,
            }),
            frameRate: 20,
            repeat: -1,
        });

        this.player = player;
        // this.physics.add.collider(player, platforms);

        player.anims.play("idle", true);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, -100, 4900, 1100);
        this.physics.world.setBounds(0, -100, 4900, 1100);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.setBackgroundColor("#fff");

        this.arrowLeft = this.add
            .image(80, 510, "arrow-left")
            .setScale(0.15)
            .setInteractive();

        this.arrowLeft.setScrollFactor(0);
        this.arrowRight = this.add
            .image(180, 510, "arrow-right")
            .setScale(0.15)
            .setInteractive();
        this.arrowRight.setScrollFactor(0);

        this.arrowLeft.on("pointerdown", () => {
            this.cursors.left.isDown = true;
        });
        this.arrowLeft.on("pointerup", () => {
            this.cursors.left.isDown = false;
        });

        this.arrowRight.on("pointerdown", () => {
            this.cursors.right.isDown = true;
        });
        this.arrowRight.on("pointerup", () => {
            this.cursors.right.isDown = false;
        });

        let jumpButton = this.add
            .image(1248 - 100, 510, "circle")
            .setScale(0.3)
            .setInteractive();
        jumpButton.on("pointerdown", () => {
            this.cursors.up.isDown = true;
            this.player.body.touching.down = true;
        });
        jumpButton.on("pointerup", () => {
            this.cursors.up.isDown = false;
            this.player.body.touching.down = false;
        });
        jumpButton.setScrollFactor(0);

        // this.input.addPointer(3);
        // Phaser.Actions.GridAlign(
        //     [this.arrowLeft, this.arrowRight, jumpButton],
        //     {
        //         width: 3,
        //     }
        // );
        // this.input.on("gameobjectdown", (pointer, gameObject) => {
        //     console.log(gameObject);
        // });
    },

    update: function () {
        var cursors = this.cursors;
        var player = this.player;

        if (cursors.up.isDown && !player.isJump) {
            // player.setTexture("player-jump");
            player.setVelocityY(-200);
        } else if (cursors.left.isDown) {
            player.setVelocityX(-600);

            player.flipX = true;
            if (!cursors.up.isDown) {
                player.anims.play("move", true);
            }
        } else if (cursors.right.isDown) {
            player.setVelocityX(600);
            player.flipX = false;
            if (!cursors.up.isDown) {
                player.anims.play("move", true);
            }
        } else {
            player.setVelocityX(0);
            // player.anims.play("turn");
            // player.setTexture("player-idle");

            // player.anims.play("idle", true);
            if (player.anims.currentAnim.key !== "idle") {
                if (player.isJump) {
                    player.anims.play("jump", true);
                } else {
                    player.anims.play("idle", true);
                }
            }
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
            player.anims.play("jump", true);
        }
    },

    collectStar: function (player, star) {
        // star.disableBody(true, true);
        // this.score += 10;
        // this.scoreText.setText("Score: " + this.score);
    },
});

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: "raindrop",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1248,
        height: 600,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: GameScene,
};

var game = new Phaser.Game(config);
