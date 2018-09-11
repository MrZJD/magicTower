import WelcomeScene from './scene/welcome.scene';

/**
 * @class MagicTowerGame
 */
class MagicTowerGame {
    game: Phaser.Game;

    constructor (w, h) {
        this.game = new Phaser.Game(w, h, Phaser.AUTO, 'game');

        this.game.state.add('welcome', new WelcomeScene());

        this.game.state.start('welcome');
    }
}

new MagicTowerGame(320, 600);
