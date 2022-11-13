export default class StartMenu extends Phaser.Scene {
    constructor(game) {
        super({ key: 'StartMenu' })
        this.game = game
    }
    preload() {
        this.load.image(
            'StartMenuBackground',
            '/assets/img/CoffeeRushKappa.gif'
        )
    }
    create() {
        this.add.image(0, 0, 'StartMenuBackground').setOrigin(0, 0)
        this.add.text(100, 300, 'Wir müssen wach bleiben')
        this.add.text(
            100,
            450,
            'Drücke die L taste um das Leaderboard zu öffnen'
        )
        this.add.text(100, this.game.config.height / 2, 'Enter your Username:')
        this.inputField = this.add.dom(
            400,
            this.game.config.height / 2,
            'input',
            ''
        )
        if (localStorage.getItem('twitchUsername')) {
            this.inputField.node.value = localStorage.getItem('twitchUsername')
        }
        let spaceBar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        )
        spaceBar.on('up', () => {
            if (this.inputField.node.value) {
                localStorage.setItem(
                    'twitchUsername',
                    this.inputField.node.value
                )
            }
            this.scene.start('World', {
                username: this.inputField.node.value
            })
            this.scene.setVisible(true, 'UIScene')
        })
        let lKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        lKey.on('up', () => {
            this.scene.start('Leaderboard')
        })
    }
}
