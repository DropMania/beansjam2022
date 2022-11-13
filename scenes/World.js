import Player from '../objects/Player.js'
import Coffee from '../objects/Coffee.js'
import Obstacle from '../objects/Obstacle.js'
import NPC from '../objects/NPC.js'
import CoffeinObjects from '../configs/CoffeinObjects.js'
import ObstObjetcs from '../configs/ObstObjetcs.js'
import Dropper from '../factories/Dropper.js'
import DialogProvider from '../factories/DialogProvider.js'
import Names from '../configs/Names.js'

const client = new tmi.Client({
    debug: true
})

client.connect()

export default class Level extends Phaser.Scene {
    constructor(game) {
        super()
        this.game = game
        Phaser.Scene.call(this, { key: 'World' })
        this.initiated = false
    }
    init({ username }) {
        if (username != '') {
            client.join(username)
        }
    }
    preload() {}
    create() {
        this.song = this.sound.add('ost', { loop: true, volume: 0.3 })
        this.song.play()

        this.CoffeinDropper = new Dropper(CoffeinObjects)
        this.ObstDropper = new Dropper(ObstObjetcs)
        this.DialogProvider = new DialogProvider()
        this.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        })
        this.add.image(0, 0, 'bg').setOrigin(0, 0)
        this.player = new Player(
            this,
            this.game.config.width / 2,
            this.game.config.height / 2,
            'player'
        )
        this.npcs = []
        this.obstacles = []
        this.physics.world.setBounds(
            0,
            0,
            this.game.config.width,
            this.game.config.height
        )

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(
            0,
            0,
            this.game.config.width,
            this.game.config.height
        )
        this.cameras.main.setZoom(2.5)
        this.generateObstacles()
        for (let i = 0; i < 10; i++) {
            this.generateCoffee()
        }
        for (let i = 0; i < 25; i++) {
            this.generateNPC()
        }
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.generateCoffee()
            },
            loop: true
        })
        this.time.addEvent({
            delay: 10000,
            callback: () => {
                for (let i = 0; i < 5; i++) {
                    this.generateNPC()
                }
            },
            loop: true
        })
        if (!this.initiated) {
            client.on('message', (channel, tags, message, self) => {
                if (message === '!crjoin') {
                    console.log('join', tags.username)
                    this.generateNPC(tags['display-name'])
                }
            })
            this.initiated = true
        }
    }
    generateCoffee() {
        let x = Math.floor(Math.random() * this.game.config.width)
        let y = Math.floor(Math.random() * this.game.config.height)
        let oAsset = this.CoffeinDropper.getRandomLoot()
        let bohne = new Coffee(
            this,
            x,
            y,
            oAsset.img,
            oAsset.scale,
            oAsset.tirednessPlus,
            oAsset.scorePoints,
            oAsset.sound
        )
        let collider = this.physics.add.collider(this.player, bohne, () => {
            this.player.tiredness += bohne.tirednessPlus
            if (this.player.tiredness > 30) {
                this.player.tiredness = 30
            }

            this.events.emit('updateTiredness', this.player.tiredness)
            this.events.emit('updateHighscore', bohne.scorePoints)
            this.sound.play(bohne.sound)

            bohne.destroy()
            collider.destroy()
        })
    }
    generateObstacles() {
        let w = this.game.config.width
        let h = this.game.config.height
        let stepW = 32
        let stepH = 24
        for (let i = 0; i < w / stepW; i++) {
            for (let j = 0; j < h / stepH; j++) {
                if (i % 2 === 0 && j % 2 === 0) {
                    let x = i * stepW
                    let y = j * stepH
                    if (Math.random() > 0.1) {
                        let oAsset = this.ObstDropper.getRandomLoot()

                        let table = new Obstacle(this, x, y, oAsset.img)
                        this.physics.add.collider(this.player, table)
                        this.obstacles.push(table)
                    }
                }
            }
        }
    }
    generateNPC(name) {
        if (!name) {
            name = Names[Math.floor(Math.random() * Names.length)]
        }
        let x = Math.floor(Math.random() * this.game.config.width)
        let y = Math.floor(Math.random() * this.game.config.height)
        let npc = new NPC(this, x, y, 'npc', name)
        for (let obstacle of this.obstacles) {
            this.physics.add.collider(npc, obstacle)
        }
        this.physics.add.collider(this.player, npc, () => {
            if (!this.player.cooldown) {
                this.player.blocked = true
                this.player.body.setVelocity(0, 0)
                npc.speed = 0
                npc.speechBubble.visible = true
                this.time.addEvent({
                    delay: 2000,
                    callback: () => {
                        this.player.blocked = false
                        npc.speed = 60
                        npc.speechBubble.visible = false
                        this.player.cooldown = true
                        this.time.addEvent({
                            delay: 1000,
                            callback: () => {
                                this.player.cooldown = false
                            }
                        })
                    }
                })
            }
        })
        this.npcs.push(npc)
    }
    update() {
        this.player.update()
        for (let npc of this.npcs) {
            npc.update()
        }
    }
}
