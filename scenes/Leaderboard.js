import { getHighScores } from '../firebase.js'

export default class Leaderboard extends Phaser.Scene {
    constructor(game) {
        super({ key: 'Leaderboard' })
        this.game = game
    }
    preload() {
        this.load.image('back-btn-down', '/assets/img/Back-button-down.png')
        this.load.image('back-btn-up', '/assets/img/Back-button-up.png')
    }
    create() {
        this.add.image(0, 0, 'startbg').setOrigin(0, 0)

        let back_btn = this.add.sprite(200, 100, 'back-btn-up').setInteractive()
        back_btn.scale = 2
        back_btn.on('pointerover', () => {
            back_btn.setTexture('back-btn-down')
        })
        back_btn.on('pointerout', () => {
            back_btn.setTexture('back-btn-up')
        })
        back_btn.on('pointerdown', () => {
            this.sound.play('btn')
            this.scene.start('StartMenu')
        })
        this.add.text(100, 150, 'Leaderboard', {
            fontSize: '40px',
            stroke: '#000000',
            strokeThickness: 6
        })
        getHighScores().then((highScores) => {
            highScores.forEach((highScore, index) => {
                this.add.text(100, 220 + index * 50, index + 1 + '.', {
                    fontSize: '30px',
                    stroke: '#000000',
                    strokeThickness: 4
                })
                this.add.text(140, 220 + index * 50, highScore.name, {
                    fontSize: '30px',
                    stroke: '#000000',
                    strokeThickness: 4
                })
                this.add.text(620, 220 + index * 50, highScore.highscore, {
                    fontSize: '30px',
                    stroke: '#000000',
                    strokeThickness: 4
                })
            })
        })
        /* var spaceBar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        )
        spaceBar.on('up', () => {
            this.scene.start('StartMenu')
        }) */
    }
}
