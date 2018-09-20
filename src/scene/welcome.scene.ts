/**
 * @class WelcomeScene
 * @extends Phaser.State
 * @description 欢迎场景
 * @author 
 * @date 2018/9/11
 */
export default class WelcomeScene extends Phaser.State {

    constructor () {
        super()
    }

    preload () {
        this.load.image('avatar', '../assets/icon_mota.png')
        this.load.image('play', '../assets/playGame.png')
        this.load.image('exit', '../assets/exitGame.png')
        this.load.image('intro', '../assets/gameintroduce.png')

        this.load.spritesheet('hero', '../assets/hero.png', 32, 32, 16)
        this.load.image('upFloor', '../assets/up_floor.png')
        this.load.spritesheet('ground', '../assets/terrain.png', 32, 32, 2)
        this.load.spritesheet('wall', '../assets/all.png', 32, 32, 1)

        this.stage.backgroundColor = '#3e3e3e'
    }

    create () {
        let centerX = this.stage.width/2
        let centerY = this.stage.height/2

        let ground = this.add.group()
        // this.add.tileSprite(0, 0, 32*1, 32*10, 'ground', 0, ground);
        var wall2 = this.add.tileSprite(0, this.stage.height-32, this.stage.width, 32*1, 'wall', 0, ground);
        // wall2.tilePosition.set(-32, 0);

        let avatar = this.add.image(this.stage.width/2, 0, 'avatar')
        let scale = avatar.width/this.stage.width
        avatar.scale.set(scale)
        avatar.anchor.setTo(0.5, 0)

        // let btnPlay = this.add.button(centerX, centerY, 'play', () => {
        //     console.log('clicked')
        // })
        // btnPlay.scale.set(scale-0.4)
        // btnPlay.anchor.setTo(0.5)
    }

    update () {}

}
