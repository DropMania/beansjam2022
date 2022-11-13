export default class Loading extends Phaser.Scene {
    constructor(game) {
        super({ key: 'LoadingText' })
        this.game = game
    }
    preload() {}
    create() {
        this.add.text(
            this.game.config.width / 2 - 150,
            this.game.config.height / 2 - 20,
            'Loading...',
            {
                fontSize: '40px',
                stroke: '#000000',
                strokeThickness: 6
            }
        )
    }
}
