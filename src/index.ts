import routeConfig from './route.config'

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

new MagicTowerGame(320, 600);
