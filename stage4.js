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

        this.load.image("sky", "./assets/stage4/sky.png");

        this.load.image("gate", "./assets/stage4/gate.png");

        this.load.image("bg1", "./assets/stage4/bg1.png");
        this.load.image("bg2", "./assets/stage4/bg2.png");
        this.load.image("bg3", "./assets/stage4/bg3.png");

        this.load.image("castle", "./assets/stage4/castle.png");

        this.load.image("statue1", "./assets/stage4/statue1.png");
        this.load.image("statue2", "./assets/stage4/statue2.png");

        this.load.image("pad1", "./assets/stage4/pad1.png");
        this.load.image("pad2", "./assets/stage4/pad2.png");
        this.load.image("pad3", "./assets/stage4/pad3.png");

        this.load.image("key", "./assets/key.png");
        this.load.image("key-bg", "./assets/stage4/key/key-bg.png");

        this.load.image("ground", "./assets/stage4/ground.png");

        this.load.atlas(
            "bubbles",
            "./assets/stage4/bubble-texture.png",
            "./assets/stage4/bubble-data.json"
        );

        this.load.image("raindrop-bg", "./assets/raindrop-bg.png");
        this.load.image("raindrop", "./assets/stage_comm/raindrop.png");
        this.load.json(
            "raindrop-shape",
            "./assets/stage_comm/raindrop-shape.json"
        );
        this.load.image(
            "main-raindrop",
            "./assets/stage4/raindrop/mainRaindrop.png"
        );

        this.load.json("shapes", "./assets/stage4/shapes.json");

        this.load.audio("bgm", "./assets/stage_comm/bgm/stage4.mp3");
    },

    create: function () {
        // 월드 , 카메라 설정
        this.cameras.main.setBounds(0, -100, 6650, 2000);
        this.matter.world.setBounds(0, -100, 6650, 2000);
        this.cameras.main.setBackgroundColor("#fff");

        let shape = this.cache.json.get("shapes");

        // 하늘
        this.add.image(2500, 0, "sky").setScale(2);

        // 배경
        this.add.image(1200, 1400, "bg1").setScale(1.5);
        this.add.image(2900, 1700, "bg2").setScale(1.5);
        this.add.image(3700, 1400, "bg3").setScale(1.5);

        this.add.image(300, 1500, "bubbles", "bubble1.png");
        this.add.image(1000, 1300, "bubbles", "bubble2.png");
        this.add.image(1500, 1900, "bubbles", "bubble3.png");
        this.add.image(800, 1100, "bubbles", "bubble1.png");
        this.add.image(2000, 1200, "bubbles", "bubble2.png");
        this.add.image(2500, 1400, "bubbles", "bubble3.png");
        this.add.image(2800, 1800, "bubbles", "bubble1.png");
        this.add.image(1800, 1900, "bubbles", "bubble2.png");
        this.add.image(3000, 1700, "bubbles", "bubble3.png");
        this.add.image(3500, 1300, "bubbles", "bubble1.png");
        this.add.image(3800, 1100, "bubbles", "bubble2.png");
        this.add.image(4000, 1200, "bubbles", "bubble2.png");
        this.add.image(4300, 1300, "bubbles", "bubble2.png");
        this.add.image(5000, 1400, "bubbles", "bubble2.png");
        this.add.image(4900, 1500, "bubbles", "bubble2.png");

        this.add.image(300, 500, "bubbles", "bubble1.png");
        this.add.image(1000, 300, "bubbles", "bubble2.png");
        this.add.image(1500, 900, "bubbles", "bubble3.png");
        this.add.image(800, 100, "bubbles", "bubble1.png");
        this.add.image(2000, 200, "bubbles", "bubble2.png");
        this.add.image(2500, 400, "bubbles", "bubble3.png");
        this.add.image(2800, 800, "bubbles", "bubble1.png");
        this.add.image(1800, 900, "bubbles", "bubble2.png");
        this.add.image(3000, 700, "bubbles", "bubble3.png");
        this.add.image(3500, 300, "bubbles", "bubble1.png");
        this.add.image(3800, 100, "bubbles", "bubble2.png");
        this.add.image(4000, 200, "bubbles", "bubble2.png");
        this.add.image(4300, 300, "bubbles", "bubble2.png");
        this.add.image(5000, 400, "bubbles", "bubble2.png");
        this.add.image(4900, 500, "bubbles", "bubble2.png");

        // 1층 패드

        // 성
        this.add.image(5200, 850, "castle");

        this.add.image(5800, 1000, "raindrop-bg");
        this.matter.add
            .image(5800, 1000, "main-raindrop", null, {
                shape: shape.mainRaindrop,
                label: "main-raindrop",
            })
            .setStatic(true);
        let gate = this.matter.add
            .image(5800, 980, "gate", null, {
                shape: shape.gate,
                label: "gate",
            })
            .setScale(1.4)
            .setStatic(true);
        this.matter.add
            .image(5800, 1150, "pad3", null, {
                shape: shape.pad3,
            })
            .setScale(1.5)
            .setStatic(true);

        this.matter.add
            .image(5500, 1050, "pad2", null, { shape: shape.pad2 })
            .setStatic(0.9)
            .setStatic(true);

        this.matter.add
            .image(5200, 930, "pad3", null, { shape: shape.pad3 })
            .setScale(1.2)
            .setStatic(true);
        this.matter.add
            .image(4900, 1050, "pad2", null, { shape: shape.pad2 })
            .setScale(1.1)
            .setStatic(true);
        this.matter.add
            .image(4600, 1150, "pad1", null, { shape: shape.pad1 })
            .setScale(1.1)
            .setStatic(true);
        this.matter.add
            .image(4400, 1250, "pad1", null, { shape: shape.pad1 })
            .setScale(1.1)
            .setStatic(true);

        // 2층 패드

        this.matter.add
            .image(4800, 800, "pad2", null, { shape: shape.pad2 })
            .setStatic(true);

        this.matter.add
            .image(4500, 700, "pad1", null, { shape: shape.pad1 })
            .setStatic(true);
        this.matter.add
            .image(4300, 600, "pad1", null, { shape: shape.pad1 })
            .setStatic(true);
        this.matter.add
            .image(4000, 500, "pad3", null, { shape: shape.pad3 })
            .setStatic(true);

        this.matter.add
            .image(3700, 600, "pad1", null, { shape: shape.pad1 })
            .setStatic(true);

        this.matter.add
            .image(3400, 600, "pad3", null, { shape: shape.pad3 })
            .setStatic(true);

        this.add.image(3400, 500, "key-bg");
        this.matter.add
            .image(3400, 500, "key", null, {
                shape: shape.key,
                label: "key",
            })
            .setStatic(true);

        let raindropShape = this.cache.json.get("raindrop-shape");
        this.matter.add
            .image(1500, 1300, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(1650, 1300, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(1800, 1300, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(1950, 1200, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(2100, 1100, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(2250, 1050, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);

        this.matter.add
            .image(4600, 1000, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(4700, 950, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(4800, 900, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);
        this.matter.add
            .image(4900, 850, "raindrop", null, {
                shape: raindropShape.raindrop,
                label: "raindrop",
            })
            .setScale(0.2)
            .setStatic(true);

        // 바닥
        let ground = this.matter.add
            .sprite(3600, 1800, "ground", null, {
                shape: shape.ground,
            })
            .setScale(1.5)
            .setStatic(true);

        // 유저 설정
        var player = this.matter.add.sprite(50, 1300, "player-idle");
        player.setBounce(0.15);
        player.setScale(0.4);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.player = player;

        // 동상
        this.add.image(2200, 1400, "statue1").setScale(1.3);
        this.add.image(3200, 1300, "statue2").setScale(1.5);

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
                location.href = "./stage5.html";
                // console.log("clear!");
            }
        });

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
    backgroundColor: "#fff",
    scene: GameScene,
};

var game = new Phaser.Game(config);
