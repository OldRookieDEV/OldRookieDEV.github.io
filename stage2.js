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
        this.load.image("sky", "./assets/stage2/sky.png");

        // 선인장
        this.load.atlas(
            "catuses",
            "./assets/stage2/catus-texture.png",
            "./assets/stage2/catus-data.json"
        );

        // 구름
        this.load.atlas(
            "clouds",
            "./assets/stage2/cloud-texture.png",
            "./assets/stage2/cloud-data.json"
        );

        //캠프
        this.load.atlas(
            "camps",
            "./assets/stage2/camp-texture.png",
            "./assets/stage2/camp-data.json"
        );

        // 문
        this.load.image("gate", "./assets/stage2/gate.png");
        this.load.image("key", "./assets/stage2/key/key.png");
        this.load.image("key-bg", "./assets/stage2/key/key-bg.png");
        this.load.image(
            "main-raindrop",
            "./assets/stage2/raindrop/main-raindrop.png"
        );

        // 바닥
        this.load.image("ground-bottom", "./assets/stage2/ground-bottom.png");
        this.load.image("ground-ceiling", "./assets/stage2/ground-ceiling.png");

        // 물방울

        this.load.image("raindrop-bg", "./assets/raindrop-bg.png");
        this.load.image("raindrop", "./assets/stage_comm/raindrop.png");
        this.load.json(
            "raindrop-shape",
            "./assets/stage_comm/raindrop-shape.json"
        );

        // shapes
        this.load.json("shapes", "./assets/stage2/shapes.json");
    },

    create: function () {
        // 월드 , 카메라 설정
        this.cameras.main.setBounds(0, -100, 6650, 2000);
        this.matter.world.setBounds(0, -100, 6650, 2000);
        this.cameras.main.setBackgroundColor("#fff");

        // 이미지 추가
        let shape = this.cache.json.get("shapes");

        this.add.image(3200, 1000, "sky").setScale(2.5);

        // 캠프
        this.add.sprite(800, 650, "camps", "camp1.png").setScale(1);
        this.add.sprite(2500, 600, "camps", "camp3.png").setScale(1);
        this.add.sprite(5100, 800, "camps", "camp2.png").setScale(1);

        // 구름
        this.add.sprite(800, 200, "clouds", "cloud1.png");
        this.add.sprite(1100, 450, "clouds", "cloud2.png");
        this.add.sprite(1600, 300, "clouds", "cloud3.png");
        this.add.sprite(2000, 250, "clouds", "cloud4.png");
        this.add.sprite(2200, 150, "clouds", "cloud1.png");
        this.add.sprite(2700, 100, "clouds", "cloud2.png");
        this.add.sprite(5800, 200, "clouds", "cloud4.png");
        this.add.sprite(6200, 450, "clouds", "cloud5.png");
        this.add.sprite(4900, 300, "clouds", "cloud6.png");
        this.add.sprite(6600, 250, "clouds", "cloud7.png");
        this.add.sprite(5400, 150, "clouds", "cloud8.png");
        this.add.sprite(5600, 100, "clouds", "cloud4.png");

        let gate = this.matter.add
            .image(5000, 1600, "gate", null, {
                shape: shape.gate,
                label: "gate",
            })
            .setStatic(true);
        this.add.image(5700, 1550, "raindrop-bg");
        this.matter.add
            .image(5700, 1550, "main-raindrop", null, {
                shape: shape.mainRaindrop,
                label: "main-raindrop",
            })
            .setStatic(true);

        this.add.image(3500, 400, "key-bg");
        this.matter.add
            .image(3500, 400, "key", null, {
                shape: shape.key,
                label: "key",
            })
            .setStatic(true);

        let groundBottom = this.matter.add
            .sprite(3200, 1400, "ground-bottom", null, {
                shape: shape.groundBottom,
            })
            .setScale(2.5)
            .setStatic(true);

        let groundCeiling = this.matter.add
            .sprite(3850, 450, "ground-ceiling", null, {
                shape: shape.groundCeiling,
            })
            .setScale(2.5)
            .setStatic(true);

        // 선인장
        this.add.sprite(1350, 600, "catuses", "catus1.png").setScale(0.6);
        this.add.sprite(1230, 640, "catuses", "catus2.png").setScale(0.6);
        this.add.sprite(3300, 1710, "catuses", "catus3.png").setScale(0.6);
        this.add.sprite(3400, 1760, "catuses", "catus4.png").setScale(0.6);

        let raindropShape = this.cache.json.get("raindrop-shape");
        this.matter.add
            .image(900, 660, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(1050, 630, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(1150, 550, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(1300, 480, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(1450, 450, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);

        this.matter.add
            .image(3750, 1650, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(3900, 1600, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(4050, 1580, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(4200, 1550, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);

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
                location.href = "./stage3.html";
            }
        });

        // 유저 설정
        var player = this.matter.add.sprite(50, 600, "player-idle");
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
            player.setVelocityX(-6);

            player.flipX = true;
            if (!cursors.up.isDown) {
                player.anims.play("move", true);
            }
        } else if (cursors.right.isDown) {
            player.setVelocityX(6);
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
    scene: GameScene,
};

var game = new Phaser.Game(config);
