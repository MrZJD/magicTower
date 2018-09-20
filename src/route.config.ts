import WelcomeScene from './scene/welcome.scene'
import RockerSampleScene from './lib/plugin/rocker.sample'

export default {
    entry: 'dev',
    routes: [
        {
            name: 'welcome',
            scene: WelcomeScene
        }, {
            name: 'dev',
            scene: WelcomeScene
        }
    ]
}