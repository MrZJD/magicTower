import RockerPlugin from '../lib/plugin/rocker.plugin'

/**
 * @class DevScene
 * @extends Phaser.State
 * @description 开发场景
 * @author mrzjd
 * @date 2018/9/11
 */
export default class DevScene extends Phaser.State {
    rocker: RockerPlugin

    constructor () {
        super()
    }

    preload () {
        this.rocker = this.game.add.plugin(new RockerPlugin(this.game, this.game.plugins)) as RockerPlugin

        this.rocker.preload()
    }

    create () {
        this.rocker.create()
    }

    // update () {}

}
