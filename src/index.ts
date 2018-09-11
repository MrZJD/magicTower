import routeConfig from './route.config'
import gameConfig from './game.config'

/**
 * @class MagicTowerGame
 */
class MagicTowerGame {
    game: Phaser.Game

    constructor (w, h) {
        this.game = new Phaser.Game(w, h, Phaser.AUTO, 'game')

        this.loadRoute(routeConfig.routes)

        this.game.state.start(routeConfig.entry)
    }

    loadRoute (routes) {
        let state = this.game.state
        routes.forEach(route => {
            state.add(route.name, new route.scene())
        })
    }
}

let wW = window.innerWidth
let wH = window.innerHeight
let wWMax = gameConfig.wWMax
let wHMax = gameConfig.wHMax
let whRatio = gameConfig.whRation

if (wW < wWMax && wH < wHMax) {
    new MagicTowerGame('100%', '100%')
} else {
    if (wW >= wWMax && wH >= wHMax) { // 限制最大最小值
        wW = wWMax
        wH = wHMax
    } else if (wW > wWMax && wH < wHMax) { // 限制宽度
        wW = wH / whRatio
    } else if (wW < wWMax && wH > wHMax) { // 限制高度
        wH = wW * whRatio
    }
    new MagicTowerGame(wW, wH);
}