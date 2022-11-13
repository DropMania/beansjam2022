import { getHighScores } from '../firebase.js'

export default class Leaderboard extends Phaser.Scene {
    constructor(game) {
        super({ key: 'Leaderboard' })
        this.game = game
    }
    preload() {}
    create() {
        this.add.text(100, 100, 'Leaderboard')
        this.add.text(100, 130, 'Press Space to go back')
        getHighScores().then((highScores) => {
            highScores.forEach((highScore, index) => {
                this.add.text(100, 200 + index * 50, index + 1 + '.')
                this.add.text(130, 200 + index * 50, highScore.name)
                this.add.text(430, 200 + index * 50, highScore.highscore)
            })
        })
        var spaceBar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        )
        spaceBar.on('up', () => {
            this.scene.start('StartMenu')
        })
    }
}
