import World from './scenes/World.js'
import UIScene from './scenes/UIScene.js'
import GameOver from './scenes/GameOver.js'
import StartMenu from './scenes/StartMenu.js'
import Leaderboard from './scenes/Leaderboard.js'

new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    parent: 'body',
    backgroundColor: '#333',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    dom: {
        createContainer: true
    },
    fps: {
        target: 60
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },
    scene: [StartMenu, World, GameOver, Leaderboard, UIScene]
})
