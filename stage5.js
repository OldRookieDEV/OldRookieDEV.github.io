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
        this.load.spritesheet("player-swim", "./assets/stage1/user-swim.png", {
            frameWidth: 309,
            frameHeight: 229,
        });

        this.load.image("arrow-left", "./assets/arrow-left.png");
        this.load.image("arrow-right", "./assets/arrow-right.png");
        this.load.image("circle", "./assets/circle.png");

        // 하늘 배경
        this.load.image("sky", "./assets/stage5/sky.png");

        // 문
        this.load.image("gate", "./assets/stage5/gate.png");

        this.load.image("key", "./assets/stage_comm/key.png");
        this.load.image("key-bg", "./assets/stage5/key-bg.png");
        this.load.image("main-raindrop", "./assets/stage5/raindrop.png");

        // 바닥
        this.load.image("wave1", "./assets/stage5/wave1.png");
        this.load.image("wave2", "./assets/stage5/wave2.png");
        this.load.image("wave3", "./assets/stage5/wave3.png");
        this.load.image("whale", "./assets/stage5/whale.png");
        this.load.image("island", "./assets/stage5/island.png");
        this.load.image("tree", "./assets/stage5/tree.png");

        this.load.image("pad1", "./assets/stage5/pad1.png");
        this.load.image("pad2", "./assets/stage5/pad2.png");

        this.load.image("starPad1", "./assets/stage5/starPad1.png");
        this.load.image("starPad2", "./assets/stage5/starPad2.png");
        this.load.image("starPad3", "./assets/stage5/starPad3.png");
        this.load.image("moon", "./assets/stage5/moon.png");

        this.load.atlas(
            "bg",
            "./assets/stage5/bg-texture.png",
            "./assets/stage5/bg-data.json"
        );
        this.load.atlas(
            "star",
            "./assets/stage5/star-texture.png",
            "./assets/stage5/star-data.json"
        );

        // 물방울
        this.load.image("raindrop-bg", "./assets/raindrop-bg.png");
        this.load.image("raindrop", "./assets/stage_comm/raindrop.png");
        this.load.json(
            "raindrop-shape",
            "./assets/stage_comm/raindrop-shape.json"
        );

        // shapes
        this.load.json("shapes", "./assets/stage5/shapes.json");
    },

    create: function () {
        // 월드 , 카메라 설정
        this.cameras.main.setBounds(0, -100, 6650, 2000);
        this.matter.world.setBounds(0, -100, 6650, 2000);
        this.cameras.main.setBackgroundColor("#fff");

        // 이미지 추가
        let shape = this.cache.json.get("shapes");

        this.add.image(3200, 1000, "sky").setScale(2.5);

        // 배경 요소 : 삼각형
        this.add.sprite(600, 1400, "bg", "bg1.png").setScale(1.8);
        this.add.sprite(400, 1300, "bg", "bg1.png").setScale(2);
        this.add.sprite(3000, 1400, "bg", "bg1.png").setScale(1);
        this.add.sprite(2300, 1300, "bg", "bg3.png").setScale(1.7);
        this.add.sprite(5000, 1300, "bg", "bg3.png").setScale(1.7);

        // 배경 요소 : 별
        this.add.sprite(500, 300 + 200, "star", "star1.png");
        this.add.sprite(200, 300 + 400, "star", "star2.png");
        this.add.sprite(800, 300 + 500, "star", "star3.png");
        this.add.sprite(400, 300 + 700, "star", "star1.png");
        this.add.sprite(800, 300 + 800, "star", "star2.png");
        this.add.sprite(900, 300 + 900, "star", "star3.png");
        this.add.sprite(300, 300 + 100, "star", "star3.png");
        this.add.sprite(1500, 300 + 200, "star", "star1.png");
        this.add.sprite(1200, 300 + 400, "star", "star2.png");
        this.add.sprite(1800, 300 + 500, "star", "star3.png");
        this.add.sprite(1400, 300 + 700, "star", "star1.png");
        this.add.sprite(1800, 300 + 800, "star", "star2.png");
        this.add.sprite(1900, 300 + 900, "star", "star3.png");
        this.add.sprite(1300, 300 + 100, "star", "star3.png");
        this.add.sprite(2500, 300 + 200, "star", "star1.png");
        this.add.sprite(2200, 300 + 400, "star", "star2.png");
        this.add.sprite(2800, 300 + 500, "star", "star3.png");
        this.add.sprite(2400, 300 + 700, "star", "star1.png");
        this.add.sprite(3800, 300 + 800, "star", "star2.png");
        this.add.sprite(3900, 300 + 900, "star", "star3.png");
        this.add.sprite(3300, 300 + 100, "star", "star3.png");

        // 메인 빗방울
        this.add.image(4280, 1180, "raindrop-bg");
        // 1180 <- origin
        // 1380 <- hide
        let mainRaindrop = this.matter.add
            .image(4280, 1380, "main-raindrop", null, {
                shape: shape.mainRaindrop,
                label: "main-raindrop",
            })
            .setStatic(true);
        let maskMainRaindrop = this.add.image(4280, 1180, "main-raindrop");

        let gate = this.add.image(4280, 1200, "gate");

        let wave3 = this.add.image(1700, 1900, "wave3").setScale(2);
        let wave2 = this.add.image(1850, 1950, "wave2").setScale(2);

        let whale = this.matter.add
            .image(1000, 1500, "whale", null, {
                shape: shape.whale,
                label: "whale",
            })
            .setScale(1.3)
            .setStatic(true);

        let island = this.matter.add
            .image(4200, 1600, "island", null, {
                shape: shape.island,
                label: "island",
            })
            .setStatic(true);

        this.matter.add
            .image(4400, 1090, "pad1", null, {
                shape: shape.pad1,
            })
            .setStatic(true);
        this.matter.add
            .image(4300, 860, "pad2", null, {
                shape: shape.pad2,
            })
            .setStatic(true);

        let tree = this.matter.add
            .image(3880, 800, "tree", null, {
                label: "tree",
                shape: shape.tree,
            })
            .setStatic(true);

        let wave1 = this.matter.add
            .image(1700, 2200, "wave1", null, {
                shape: shape.wave1,
            })
            .setScale(2)
            .setStatic(true);

        this.add.image(1400, 500, "key-bg");
        this.matter.add
            .image(1400, 500, "key", null, {
                shape: shape.key,
                label: "key",
            })
            .setStatic(true);
        this.matter.add
            .image(1200, 600, "moon", null, {
                shape: shape.moon,
            })
            .setScale(1.8)
            .setStatic(true);
        this.matter.add
            .image(1800, 800, "starPad1", null, {
                shape: shape.starPad1,
            })
            .setScale(1.2)
            .setStatic(true);

        this.matter.add
            .image(2200, 600, "starPad2", null, {
                shape: shape.starPad2,
            })
            .setStatic(true);

        this.matter.add
            .image(2500, 800, "starPad1", null, {
                shape: shape.starPad1,
            })
            .setStatic(true);
        this.matter.add
            .image(2950, 850, "starPad3", null, {
                shape: shape.starPad3,
            })
            .setScale(1.2)
            .setStatic(true);

        let raindropShape = this.cache.json.get("raindrop-shape");

        this.matter.add
            .image(2800, 1400, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.25)
            .setStatic(true);
        this.matter.add
            .image(3000, 1400, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.25)
            .setStatic(true);
        this.matter.add
            .image(3200, 1400, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.25)
            .setStatic(true);
        this.matter.add
            .image(3400, 1400, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.25)
            .setStatic(true);

        // 나무 위 빗방울
        this.matter.add
            .image(4200, 700, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.25)
            .setStatic(true);
        this.matter.add
            .image(4100, 650, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.25)
            .setStatic(true);
        this.matter.add
            .image(4000, 630, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.25)
            .setStatic(true);
        // 구름 위 빗방울
        this.matter.add
            .image(2950, 700, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.25)
            .setStatic(true);
        this.matter.add
            .image(2500, 650, "raindrop", null, {
                label: "raindrop",
                shape: raindropShape.raindrop,
            })
            .setScale(0.25)
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
                maskMainRaindrop.destroy();
                mainRaindrop.setY(1180);
            } else if (
                bodyA.parent.label === "main-raindrop" ||
                bodyB.parent.label === "main-raindrop"
            ) {
                location.href = "./stage_ending.html";
                // console.log("clear!");
            }
        });

        // 유저 설정
        var player = this.matter.add.sprite(1200, 1200, "player-idle");
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
    scene: GameScene,
};

var game = new Phaser.Game(config);
