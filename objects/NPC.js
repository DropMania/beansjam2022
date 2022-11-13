import SpeechBubble from './SpeechBubble.js'
export default class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, name) {
        super(scene, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.setCollideWorldBounds(true)
        this.scene.anims.createFromAseprite('npc')
        this.speed = 60
        this.directions = [
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 1, y: 0 }
        ]
        this.direction = this.directions[Phaser.Math.Between(0, 3)]
        this.nameText = this.scene.add.text(x, y - 30, name, {
            fontSize: '16px',
            fill: '#000'
        })
        this.speechBubble = new SpeechBubble(scene, x, y - 35)
        this.speechBubble.visible = false
    }
    update() {
        this.nameText.x = this.x - this.nameText.width / 2
        this.nameText.y = this.y - 30
        this.speechBubble.x = this.x
        this.speechBubble.y = this.y - 35
        this.speechBubble.updateSpeechText(
            this.speechBubble.x,
            this.speechBubble.y,
            this.speechBubble.visible
        )

        this.play('npc-run', true)
        this.body.setVelocity(
            this.direction.x * this.speed,
            this.direction.y * this.speed
        )
        if (this.body.velocity.x > 0) {
            this.rotation = Math.PI * 1.5
        } else if (this.body.velocity.x < 0) {
            this.rotation = Math.PI * 0.5
        } else if (this.body.velocity.y > 0) {
            this.rotation = 0
        } else if (this.body.velocity.y < 0) {
            this.rotation = Math.PI
        }

        if (
            this.body.blocked.down ||
            this.body.blocked.up ||
            this.body.blocked.left ||
            this.body.blocked.right
        ) {
            this.direction = this.directions[Phaser.Math.Between(0, 3)]
        }
        if (Math.random() < 0.01) {
            this.direction = this.directions[Phaser.Math.Between(0, 3)]
        }
    }
}
