export default class SpeechBubble extends Phaser.Physics.Arcade.Sprite {

    textOffsetY = 35
    TextOffsetX = 75 
    constructor(scene, x, y) {
        super(scene, x, y, 'speechBubble')
        this.scene = scene
        this.scene.add.existing(this)
        this.scale = 3.5
        this.dialog = this.scene.DialogProvider.getRandomDialog()

        this.speechText = this.scene.add.text(x - this.TextOffsetX, y - this.textOffsetY, this.dialog, {
            fontSize: '15px',
            fill: '#000'
        })
        this.speechText.visible = false
    }

    updateSpeechText(x, y, visible) {
        this.speechText.x = x - this.TextOffsetX
        this.speechText.y = y - this.textOffsetY
        this.speechText.visible = visible
    }

    update() {

    }
}
