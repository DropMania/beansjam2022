export default class SpeechBubble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'speechBubble')
        this.scene = scene
        this.scene.add.existing(this)
        this.scale = 2
        this.dialog = this.scene.DialogProvider.getRandomDialog()

        this.speechText = this.scene.add.text(x - 50, y, this.dialog, {
            fontSize: '10px',
            fill: '#000'
        })
        this.speechText.visible = false
    }

    updateSpeechText(x, y, visible) {
        this.speechText.x = x - 50
        this.speechText.y = y
        this.speechText.visible = visible
    }

    update() {
        this.speechText.visible = this.visible
        this.speechText.x = this.x
        this.speechText.y = this.y
    }
}
