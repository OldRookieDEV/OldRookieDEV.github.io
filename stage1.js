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
        this.load.image("key", "./assets/stage1/key.png");
        // this.load.image("ground", "./assets/stage1/ground.2.png");

        this.load.atlas(
            "sheet",
            "./assets/stage1/ground-texture.png",
            "./assets/stage1/ground-data.json"
        );

        this.load.json("ground-shape", "./assets/stage1/ground-shape.json");

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
        this.load.image("gate", "./assets/stage1/gate.png");
        this.load.image("raindrop-bg", "./assets/raindrop-bg.png");
    },

    create: function () {
        this.add.image(0, 0, "sky").setScale(2);
        this.add.image(800, 600, "bushes1").setScale(1);
        this.add.image(2250, 650, "bushes3").setScale(1);
        this.add.image(3100, 750, "bushes2").setScale(1);
        this.add.image(4100, 650, "bushes4").setScale(1);
        this.add.image(900, 680, "small-tree").setScale(1);

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

        this.cameras.main.setBounds(0, -100, 4900, 1100);
        this.matter.world.setBounds(0, -100, 4900, 1100);

        this.cameras.main.setBackgroundColor("#fff");

        let groundShape = this.cache.json.get("ground-shape");
        let ground = this.matter.add
            .sprite(0, 0, "sheet", "ground", {
                shape: groundShape.ground,
            })
            .setScale(2.8)
            .setStatic(true);
        ground.setPosition(2400, 930 + ground.centerOfMass.y);
        this.add.image(3560, 790, "raindrop-bg");
        this.matter.add
            .image(3560, 790, "raindrop", null, {
                label: "main-raindrop",
            })
            .setScale(1)
            .setStatic(true);

        let gate = this.matter.add
            .image(3560, 790, "gate", null, {
                label: "gate",
            })
            .setScale(0.8)
            .setStatic(true);

        this.add.image(3400, 270, "big-tree").setScale(0.7);

        let pad1 = this.matter.add
            .image(3350, 780, "pad1", null, {
                shape: groundShape.pad1,
            })
            .setStatic(true);
        let pad2 = this.matter.add
            .image(3430, 690, "pad2", null, {
                shape: groundShape.pad2,
            })
            .setStatic(true);
        let pad3 = this.matter.add
            .image(3620, 630, "pad3", null, {
                shape: groundShape.pad3,
            })
            .setStatic(true);
        let pad4 = this.matter.add
            .image(3770, 520, "pad4", null, {
                shape: groundShape.pad4,
            })
            .setStatic(true);
        let pad5 = this.matter.add
            .image(3350, 450, "pad5", null, {
                shape: groundShape.pad5,
            })
            .setStatic(true);

        this.matter.add
            .image(3000, 200, "key", null, {
                label: "key",
            })
            .setStatic(true);

        let raindrop1 = this.matter.add
            .image(550, 700, "raindrop", null, {
                label: "raindrop",
            })
            .setScale(0.6)
            .setStatic(true);
        this.matter.add
            .image(650, 680, "raindrop", null, {
                label: "raindrop",
            })
            .setScale(0.6)
            .setStatic(true);
        this.matter.add
            .image(750, 640, "raindrop", null, {
                label: "raindrop",
            })
            .setScale(0.6)
            .setStatic(true);
        this.matter.add
            .image(850, 580, "raindrop", null, {
                label: "raindrop",
            })
            .setScale(0.6)
            .setStatic(true);
        this.matter.add
            .image(950, 540, "raindrop", null, {
                label: "raindrop",
            })
            .setScale(0.6)
            .setStatic(true);
        this.matter.add
            .image(1050, 520, "raindrop", null, {
                label: "raindrop",
            })
            .setScale(0.6)
            .setStatic(true);
        this.matter.add
            .image(3430, 600, "raindrop", null, {
                label: "raindrop",
            })
            .setScale(0.6)
            .setStatic(true);

        this.matter.add
            .image(3550, 500, "raindrop", null, {
                label: "raindrop",
            })
            .setScale(0.6)
            .setStatic(true);

        var player = this.matter.add.sprite(50, 800, "player-idle");
        player.setBounce(0.15);
        player.setScale(0.4);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);

        this.matter.world.on("collisionstart", function (event, bodyA, bodyB) {
            if (bodyA.label === "raindrop" || bodyB.label === "raindrop") {
                const body = bodyA.label === "raindrop" ? bodyA : bodyB;
                body.gameObject.destroy();
            } else if (bodyA.label === "key" || bodyB.label === "key") {
                const body = bodyA.label === "key" ? bodyA : bodyB;
                body.gameObject.destroy();
                gate.destroy();
            } else if (
                bodyA.label === "main-raindrop" ||
                bodyB.label === "main-raindrop"
            ) {
                const body = bodyA.label === "main-raindrop" ? bodyA : bodyB;
            }
        });

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

        player.anims.play("idle", true);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.arrowLeft = this.add
            .image(80, 510, "arrow-left")
            .setScale(0.25)
            .setInteractive();

        this.arrowLeft.setScrollFactor(0);
        this.arrowRight = this.add
            .image(250, 510, "arrow-right")
            .setScale(0.25)
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
            .setScale(0.8)
            .setInteractive();
        jumpButton.on("pointerdown", () => {
            if (
                this.player.body.velocity.y <= 1 &&
                this.player.body.velocity.y >= -1
            ) {
                this.cursors.up.isDown = true;
                this.player.isJump = true;
            }
        });
        jumpButton.on("pointerup", () => {
            this.cursors.up.isDown = false;
        });
        jumpButton.setScrollFactor(0);
    },

    update: function () {
        var cursors = this.cursors;
        var player = this.player;

        player.angle = 0;

        if (cursors.up.isDown) {
            if (player.isJump) {
                player.setVelocityY(-15);
                player.isJump = false;
            }
            player.anims.play("jump", true);
        } else if (cursors.left.isDown) {
            player.setVelocityX(-5);

            player.flipX = true;
            if (!cursors.up.isDown) {
                player.anims.play("move", true);
            }
        } else if (cursors.right.isDown) {
            player.setVelocityX(5);
            player.flipX = false;
            if (!cursors.up.isDown) {
                player.anims.play("move", true);
            }
        } else {
            player.setVelocityX(0);
            if (player.anims.currentAnim.key !== "idle") {
                if (player.isJump) {
                    player.anims.play("jump", true);
                } else {
                    player.anims.play("idle", true);
                }
            }
        }
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
    // activePointers: 2,
    input: {
        activePointers: 3,
    },
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 1.5 },
            debug: false,
        },
    },
    scene: GameScene,
};

var game = new Phaser.Game(config);
