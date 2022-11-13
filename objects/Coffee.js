export default class Coffee extends Phaser.Physics.Arcade.Sprite {
    constructor(
        scene,
        x,
        y,
        texture,
        scale = 1,
        tirednessPlus = 1,
        scorePoints = 1,
        sound
    ) {
        super(scene, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
        this.scale = scale
        this.scene.physics.add.existing(this)
        this.baseValue = 1
        this.tirednessPlus = tirednessPlus
        this.scorePoints = scorePoints
        this.sound = sound
    }
}
