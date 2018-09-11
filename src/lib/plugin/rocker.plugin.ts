import gameConfig from '../../game.config'

enum DIRECTION {
    LEFT,
    RIGHT,
    UP,
    DOWN
}

/**
 * @class RockerPlugin
 * @extends Phaser.Plugin
 * @description 拥有触摸事件的场景
 * @author mrzjd
 * @date 2018/9/11
 */
export default class RockerPlugin extends Phaser.Plugin {
    imageRatio: number
    rocker: Phaser.Image
    rockerActive: Phaser.Image
    rect: {
        x: number,
        y: number,
        xMax: number,
        yMax: number,
        centerX: number,
        centerY: number
    }
    isMove: boolean
    direction: number

    static RANGE: [number, number, number, number] = [- Math.PI / 4, Math.PI / 4, Math.PI * 3 / 4, - Math.PI * 3 / 4]
    static DIRECTION = DIRECTION

    constructor (game, parent) {
        super(game, parent)
    }

    preload () {
        // 1. 加载摇杆殷勤
        this.game.load.image('rocker', '../assets/btn_normal.png')
        this.game.load.image('rockerActive', '../assets/btn_right.png')

        this.imageRatio = (this.game.width / gameConfig.wWMax) + 0.2
    }

    create () {
        // 2. 绘制摇杆
        this.rocker = this.game.add.image(this.game.width - 60, this.game.height - 70, 'rocker')
        this.rocker.scale.setTo(this.imageRatio, this.imageRatio)
        this.rocker.anchor.setTo(0.5, 0.5)

        this.rockerActive = this.game.add.image(this.game.width - 60, this.game.height - 70, 'rockerActive')
        this.rockerActive.scale.setTo(this.imageRatio, this.imageRatio)
        this.rockerActive.anchor.setTo(0.5, 0.5)
        this.rockerActive.visible = false

        // 3. touch
        let touch = this.game.input.touch
        touch.touchStartCallback = this.onTouchStart.bind(this)
        touch.touchMoveCallback = this.onTouchMove.bind(this)
        touch.touchCancelCallback = this.onTouchCancel.bind(this)
        touch.touchEndCallback = this.onTouchEnd.bind(this)

        // 4. 计算摇杆client React
        this.rect = {
            xMax: this.rocker.position.x + this.rocker.width*0.4,
            yMax: this.rocker.position.y + this.rocker.width*0.4,
            x: this.rocker.position.x - this.rocker.width*0.4,
            y: this.rocker.position.y - this.rocker.height*0.4,
            centerX: this.rocker.position.x,
            centerY: this.rocker.position.y
        }
    }

    onTouchStart (evt: TouchEvent) {
        let {
            clientX, clientY
        } = evt.touches[0]
        
        if (clientX > this.rect.x && clientX < this.rect.xMax &&
            clientY > this.rect.y && clientY < this.rect.yMax) {
            this.isMove = true

            this.rocker.visible = false

            let angle = this.calcAngle(clientX, clientY)
            this.rockerActive.visible = true
            this.rockerActive.rotation = angle
        }
    }

    onTouchMove (evt: TouchEvent) {
        if (!this.isMove) return
        let {
            clientX, clientY
        } = evt.touches[0]

        let angle = this.calcAngle(clientX, clientY)
        this.rockerActive.rotation = angle

        let range = RockerPlugin.RANGE
        if (angle > range[0] && angle < range[1]) {
            // console.log(' --- > right')
            this.direction = RockerPlugin.DIRECTION.RIGHT
        }
        else if (angle > range[2] || angle < range[3]) {
            // console.log(' <---  left')
            this.direction = RockerPlugin.DIRECTION.LEFT
        }
        else if (angle > range[1] && angle < range[2]) {
            // console.log(' --- down')
            this.direction = RockerPlugin.DIRECTION.DOWN
        }
        else if (angle > range[3] && angle < range[1]) {
            // console.log(' --- up')
            this.direction = RockerPlugin.DIRECTION.UP
        }
        else {
            console.log(' wrong direction ')
        }
    }

    onTouchCancel () {
        this.rockerActive.visible = false
        this.rocker.visible = true
        this.isMove = false
    }

    onTouchEnd () {
        this.rockerActive.visible = false
        this.rocker.visible = true
        this.isMove = false
    }

    /**
     * @desc 计算点距离摇杆中心的旋转角度
     * @param {number} x 
     * @param {number} y
     * @return {number} angle
     */
    calcAngle (x, y): number {
        let angle = Math.atan((y - this.rect.centerY) / (x - this.rect.centerX))
        if ( x >= this.rect.centerX ) {
            return angle
        } else {
            if (y >= this.rect.centerY) {
                return angle + Math.PI
            } else {
                return angle - Math.PI
            }
        }
    }

    preUpdate () {}

    update () {}

    destroy() {}

    postRender() {}

    render() {}
}
