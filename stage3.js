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

        // 하늘 배경
        this.load.image("sky", "./assets/stage3/sky.png");

        // 문
        this.load.image("gate", "./assets/stage3/gate.png");
        this.load.image("gateBottom", "./assets/stage3/gateBottom.png");
        this.load.image("key", "./assets/stage_comm/key.png");
        this.load.image("key-bg", "./assets/stage3/key/key-bg.png");
        this.load.image(
            "main-raindrop",
            "./assets/stage3/raindrop/mainRaindrop.png"
        );

        this.load.atlas(
            "grass",
            "./assets/stage3/grass-texture.png",
            "./assets/stage3/grass-data.json"
        );
        this.load.atlas(
            "cloud",
            "./assets/stage3/cloud-texture.png",
            "./assets/stage3/cloud-data.json"
        );

        this.load.image("fish1", "./assets/stage3/fish1.png");
        this.load.image("fish2", "./assets/stage3/fish2.png");
        this.load.image("fish3", "./assets/stage3/fish3.png");

        // 바닥
        this.load.image("ground", "./assets/stage3/ground.png");
        this.load.image("mountain", "./assets/stage3/mountain.png");

        // 물방울
        this.load.image("raindrop-bg", "./assets/raindrop-bg.png");
        this.load.image("raindrop", "./assets/stage_comm/raindrop.png");
        this.load.json(
            "raindrop-shape",
            "./assets/stage_comm/raindrop-shape.json"
        );
        this.load.image("clouds", "./assets/stage3/clouds.png");

        // shapes
        this.load.json("shapes", "./assets/stage3/shapes.json");
        this.load.audio("bgm", "./assets/stage_comm/bgm/stage3.mp3");
    },

    create: function () {
        let bgWhite = this.add.graphics();
        bgWhite.fillStyle(0xffffff, 1);
        bgWhite.fillRect(0, 0, 3000, 2000);
        bgWhite.setScrollFactor(0);
        // 월드 , 카메라 설정
        this.cameras.main.setBounds(0, -100, 6650, 2000);
        this.matter.world.setBounds(0, -100, 6650, 2000);
        this.cameras.main.setBackgroundColor("#fff");

        // 이미지 추가
        let shape = this.cache.json.get("shapes");

        this.add.image(3200, 1000, "sky").setScale(2.5);

        this.add.image(3730, 1370, "raindrop-bg");
        this.matter.add
            .image(3730, 1370, "main-raindrop", null, {
                shape: shape.mainRaindrop,
                label: "main-raindrop",
            })
            .setStatic(true);

        let gate = this.matter.add
            .image(3730, 1350, "gate", null, {
                shape: shape.gate,
                label: "gate",
            })
            .setScale(0.8)
            .setStatic(true);

        this.add.sprite(3600, 1400, "mountain").setScale(1);

        this.matter.add
            .image(3730, 1500, "gateBottom", null, {
                shape: shape.gateBottom,
            })
            .setStatic(true);

        let ground = this.matter.add
            .sprite(3300, 1400, "ground", null, {
                shape: shape.ground,
            })
            .setScale(2.5)
            .setStatic(true);

        this.add.image(5650, 1150, "key-bg");
        this.matter.add
            .image(5650, 1150, "key", null, {
                shape: shape.key,
                label: "key",
            })
            .setStatic(true);

        let raindropShape = this.cache.json.get("raindrop-shape");
        this.matter.add
            .image(900, 660, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(1050, 730, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(1200, 780, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(1350, 820, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(1500, 700, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(1650, 660, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.2)
            .setStatic(true);

        this.matter.add
            .image(4900, 1000, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(5050, 1050, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(5200, 1100, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(5350, 1150, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.2)
            .setStatic(true);

        this.add.sprite(1650, 900, "grass", "grass1.png");
        this.add.sprite(1550, 850, "grass", "grass3.png").setScale(1.2);
        this.add.sprite(2300, 1150, "grass", "grass2.png");
        this.add.sprite(2450, 1100, "grass", "grass4.png");
        this.add.sprite(4900, 1200, "grass", "grass3.png");
        this.add.sprite(5000, 1180, "grass", "grass6.png");

        this.add.image(2000, 650, "fish3");
        this.add.image(2800, 800, "fish2");
        this.add.image(3400, 1100, "fish1");

        this.add.image(4800, 500, "clouds");
        this.add.sprite(0, 200, "clouds", "cloud1.png");
        this.add.sprite(600, 300, "clouds", "cloud4.png");
        this.add.sprite(4000, 300, "clouds", "cloud3.png");
        this.add.sprite(2000, 300, "clouds", "cloud2.png");

        // 오브젝트 충돌 처리

        this.matter.world.on("collisionstart", function (event, bodyA, bodyB) {
            if (
                bodyA.parent.label === "raindrop" ||
                bodyB.parent.label === "raindrop"
            ) {
                const body =
                    bodyA.parent.label === "raindrop"
                        ? bodyA.parent
                        : bodyB.parent;
                body.gameObject.destroy();
            } else if (
                bodyA.parent.label === "key" ||
                bodyB.parent.label === "key"
            ) {
                const body =
                    bodyA.parent.label === "key" ? bodyA.parent : bodyB.parent;
                body.gameObject.destroy();
                gate.destroy();
            } else if (
                bodyA.parent.label === "main-raindrop" ||
                bodyB.parent.label === "main-raindrop"
            ) {
                location.href = "./stage4.html";
                // console.log("clear!");
            }
        });

        // 유저 설정
        var player = this.matter.add.sprite(50, 400, "player-idle");
        player.setBounce(0.15);
        player.setScale(0.4);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.player = player;

        // 유저 애니메이션
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

        player.anims.play("idle", true);

        // 버튼
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
                this.player.body.velocity.y < 15 &&
                this.player.body.velocity.y > -15
            ) {
                this.cursors.up.isDown = true;
                this.player.isJump = true;
            }
        });
        jumpButton.on("pointerup", () => {
            this.cursors.up.isDown = false;
        });
        jumpButton.setScrollFactor(0);

        let bgm = this.sound.add("bgm");
        window.setTimeout(() => {
            bgm.play();
        }, 800);
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
        width: 1300,
        height: 630,
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
    backgroundColor: "#fff",
    scene: GameScene,
};

var game = new Phaser.Game(config);
