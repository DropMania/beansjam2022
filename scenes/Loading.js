import CoffeinObjects from '../configs/CoffeinObjects.js'
import ObstObjetcs from '../configs/ObstObjetcs.js'

export default class Loading extends Phaser.Scene {
    constructor(game) {
        super({ key: 'Loading', active: true })
        this.game = game
    }
    preload() {
        this.load.image('back-btn-down', 'assets/img/Back-button-down.png')
        this.load.image('back-btn-up', 'assets/img/Back-button-up.png')
        this.load.image('GameOverBG', 'assets/img/GameOver.png')
        this.load.image('StartMenuBackground', 'assets/img/startbg_text.png')
        this.load.image('startbg', 'assets/img/startscreembg.png')
        this.load.image('lb-btn-down', 'assets/img/Leaderboad-button-down.png')
        this.load.image('lb-btn-up', 'assets/img/Leaderboard-button-up.png')
        this.load.image('start-btn-down', 'assets/img/Start-button-down.png')
        this.load.image('start-btn-up', 'assets/img/Start-button-up.png')
        this.load.audio('btn', 'assets/audio/btn.mp3')
        this.load.audio('ost', 'assets/audio/ost.mp3')

        for (let coffein of CoffeinObjects) {
            this.load.image(coffein.img, `assets/img/${coffein.img}.png`)
        }
        for (let obst of ObstObjetcs) {
            this.load.image(obst.img, `assets/img/${obst.img}.png`)
        }
        this.load.image('speechBubble', 'assets/img/SpeechBuble.png')

        this.load.aseprite(
            'player',
            'assets/img/player.png',
            'assets/img/player.json'
        )
        this.load.aseprite('npc', 'assets/img/npc.png', 'assets/img/npc.json')
        this.load.image('bg', 'assets/img/GameBackground.png')

        this.load.audio('bohne', 'assets/audio/bohne.mp3')
        this.load.audio('sip', 'assets/audio/sip.mp3')
    }
    create() {
        this.scene.start('StartMenu')
    }
}
