import { Timer } from "phaser";

/**
 * @class WelcomeScene
 */
export default class DemoScene extends Phaser.State {
    cursor: Phaser.CursorKeys;
    hero: Phaser.Sprite;
    ground: Phaser.Group;

    constructor () {
        super();
    }

    preload () {
        this.load.image('text_start', '../assets/开始游戏.png');

        this.load.spritesheet('hero', '../assets/hero.png', 32, 32, 16);
        this.load.spritesheet('ground', '../assets/terrain.png', 32*2, 32, 1);
    }

    create () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.ground = this.add.group();
        this.ground.enableBody = true;

        this.add.tileSprite(0, 0, 32*1, 32*10, 'ground', 0, this.ground);
        var wall2 = this.add.tileSprite(32*3, 0, 32*1, 32*10, 'ground', 0, this.ground);
        wall2.tilePosition.set(-32, 0);

        var hero = this.add.sprite(this.game.width/2, this.game.height/2, 'hero');
        hero.anchor.setTo(0.5, 0.5);

        hero.animations.add('moveDown', [0, 1, 2, 3], 12, false);
        hero.animations.add('moveLeft', [4, 5, 6, 7], 12, false);
        hero.animations.add('moveRight', [8, 9, 10, 11], 12, false);
        hero.animations.add('moveUp', [12, 13, 14, 15], 12, false);

        this.hero = hero;
        this.cursor = this.input.keyboard.createCursorKeys();

        this.physics.enable(this.ground);
        this.ground.enableBody = true;
        this.ground.setAll('body.immovable', true);
        this.ground.setAll('checkWorldBounds', true);
        this.ground.setAll('outOfBoundsKill', true);

        this.physics.enable(this.hero);
        this.hero.body.gravity.y = 0;
        this.hero.body.mass = 0;
        this.hero.body.collideWorldBounds = true;
    }

    update () {
        this.physics.arcade.collide(this.hero, this.ground, function () {
            console.log('碰到了');
        }, null, this);

        if (this.cursor.left.isDown) {
            this.hero.animations.play('moveLeft');
            this.hero.body.velocity.x = -80;
            this.hero.body.velocity.y = 0;
        } else if (this.cursor.right.isDown) {
            this.hero.animations.play('moveRight');
            this.hero.body.velocity.x = 80;
            this.hero.body.velocity.y = 0;
        } else if (this.cursor.up.isDown) {
            this.hero.animations.play('moveUp');
            this.hero.body.velocity.y = -80;
            this.hero.body.velocity.x = 0;
        } else if (this.cursor.down.isDown) {
            this.hero.animations.play('moveDown');
            this.hero.body.velocity.y = 80;
            this.hero.body.velocity.x = 0;
        } else {
            this.hero.animations.stop();
            this.hero.body.velocity.x = 0;
            this.hero.body.velocity.y = 0;
        }
    }
}