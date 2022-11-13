export default class StartMenu extends Phaser.Scene {
    constructor(game) {
        super({ key: 'StartMenu' })
        this.game = game
    }
    preload() {
        this.load.image('StartMenuBackground', '/assets/img/startbg_text.png')
        this.load.image('startbg', '/assets/img/startscreembg.png')
        this.load.image('lb-btn-down', '/assets/img/Leaderboad-button-down.png')
        this.load.image('lb-btn-up', '/assets/img/Leaderboard-button-up.png')
        this.load.image('start-btn-down', '/assets/img/Start-button-down.png')
        this.load.image('start-btn-up', '/assets/img/Start-button-up.png')
        this.load.audio('btn', '/assets/audio/btn.mp3')
    }
    create() {
        this.add.image(0, 0, 'startbg').setOrigin(0, 0)
        this.add.image(0, 0, 'StartMenuBackground').setOrigin(0, 0)
        this.add.text(50, 300, 'Wir müssen wach bleiben', {
            fontSize: '40px',
            stroke: '#000000',
            strokeThickness: 6
        })
        let lb_btn = this.add.sprite(300, 470, 'lb-btn-up').setInteractive()
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
            .sprite(300, 570, 'start-btn-up')
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

        this.add.text(50, this.game.config.height / 2, 'Gib deinen Namen an:', {
            fontSize: '30px',
            stroke: '#000000',
            strokeThickness: 4
        })
        this.inputField = this.add.dom(
            500,
            this.game.config.height / 2 + 15,
            'input',
            ''
        )
        this.inputField.node.setAttribute('maxlength', 25)
        if (localStorage.getItem('twitchUsername')) {
            this.inputField.node.value = localStorage.getItem('twitchUsername')
        }
        let spaceBar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        )
        /* spaceBar.on('up', () => {
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
        }) */
    }
}
