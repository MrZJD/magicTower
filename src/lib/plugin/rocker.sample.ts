import RockerPlugin from './rocker.plugin'

/**
 * @class RockerSampleScene
 * @extends Phaser.State
 * @description 使用RockerPlugin遥感插件示例
 * @author mrzjd
 * @date 2018/9/11
 */
export default class RockerSampleScene extends Phaser.State {
    hero: Phaser.Sprite
    rocker: RockerPlugin

    constructor () {
        super()
    }

    preload () {
        this.load.spritesheet('hero', '../assets/hero.png', 32, 32, 16)

        this.rocker = this.game.add.plugin(new RockerPlugin(this.game, this.game.plugins)) as RockerPlugin
        this.rocker.preload()
    }

    create () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE)

        var hero = this.add.sprite(this.game.width/2, this.game.height/2, 'hero')
        hero.anchor.setTo(0.5, 0.5)

        hero.animations.add('moveDown', [0, 1, 2, 3], 12, false)
        hero.animations.add('moveLeft', [4, 5, 6, 7], 12, false)
        hero.animations.add('moveRight', [8, 9, 10, 11], 12, false)
        hero.animations.add('moveUp', [12, 13, 14, 15], 12, false)

        this.hero = hero

        this.physics.enable(this.hero)
        this.hero.body.gravity.y = 0
        this.hero.body.mass = 0
        this.hero.body.collideWorldBounds = true

        this.rocker.create()
    }

    update () {
        this.physics.arcade.collide(this.hero, this.game.world, function () {
            console.log('碰到了');
        }, null, this);

        if (!this.rocker.isMove) {
            this.hero.animations.currentAnim.stop(true)
            this.hero.body.velocity.x = 0
            this.hero.body.velocity.y = 0
            return
        }
        switch (this.rocker.direction) {
            case RockerPlugin.DIRECTION.UP: 
                this.hero.animations.play('moveUp')
                this.hero.body.velocity.y = -80
                this.hero.body.velocity.x = 0
                break
            case RockerPlugin.DIRECTION.DOWN:
                this.hero.animations.play('moveDown')
                this.hero.body.velocity.y = 80
                this.hero.body.velocity.x = 0
                break
            case RockerPlugin.DIRECTION.LEFT: 
                this.hero.animations.play('moveLeft')
                this.hero.body.velocity.x = -80
                this.hero.body.velocity.y = 0
                break
            case RockerPlugin.DIRECTION.RIGHT:
                this.hero.animations.play('moveRight')
                this.hero.body.velocity.x = 80
                this.hero.body.velocity.y = 0
                break
        }
    }
}