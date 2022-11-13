import { getMyHighScore } from '../firebase.js'

export default class GameOver extends Phaser.Scene {
    constructor(game) {
        super({ key: 'GameOver' })
        this.game = game
    }
    preload() {}
    create() {
        this.add.image(0, 0, 'GameOverBG').setOrigin(0, 0)
        getMyHighScore().then((highScore) => {
            this.add.text(300, 200, `Dein aktueller Highscore: ${highScore}`, {
                fontSize: '40px',
                stroke: '#000000',
                strokeThickness: 6
            })
        })
        this.add.text(150, 300, 'Du bist Eingeschlafen! :(', {
            fontSize: '64px',
            stroke: '#000000',
            strokeThickness: 6
        })

        let lb_btn = this.add
            .sprite(this.game.config.width / 2, 470, 'lb-btn-up')
            .setInteractive()
        lb_btn.scale = 2
        lb_btn.on('pointerover', () => {
            lb_btn.setTexture('lb-btn-down')
        })
        lb_btn.on('pointerout', () => {
            lb_btn.setTexture('lb-btn-up')
        })
        lb_btn.on('pointerdown', () => {
            this.sound.play('btn')
            this.scene.start('Leaderboard')
        })

        let start_btn = this.add
            .sprite(this.game.config.width / 2, 570, 'start-btn-up')
            .setInteractive()
        start_btn.scale = 2
        start_btn.on('pointerover', () => {
            start_btn.setTexture('start-btn-down')
        })
        start_btn.on('pointerout', () => {
            start_btn.setTexture('start-btn-up')
        })
        start_btn.on('pointerdown', () => {
            this.sound.play('btn')
            this.scene.get('UIScene').events.emit('resetHighScore')
            this.scene.start('World', {
                username: localStorage.getItem('twitchUsername')
            })
        })
        this.scene.get('UIScene').events.emit('saveHightScore')

        /* spaceBar.on('up', () => {
            this.scene.get('UIScene').events.emit('resetHighScore')
            this.scene.start('World', {
                username: localStorage.getItem('twitchUsername')
            })
        })
        let lKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        lKey.on('up', (event) => {
            if (event.ctrlKey) {
                this.scene.start('Leaderboard')
            }
        }) */
    }
}
