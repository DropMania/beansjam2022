export default class Dropper {
    dropList = []
    baseRate = 1000

    constructor(loot) {
        for (let index in loot) {
            let item = loot[index]
            let droperAmount = this.baseRate * (item.dropRate / 100)
            for (let i = 0; i < droperAmount; i++) {
                this.dropList.push(item)
            }
        }
        this.dropList = this.shuffle(this.dropList)
    }

    shuffle(array) {
        let currentIndex = array.length,
            randomIndex

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            // And swap it with the current element.
            ;[array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex]
            ]
        }

        return array
    }

    getRandomLoot() {
        let rngGod = Math.floor(Math.random() * this.dropList.length)
        return this.dropList[rngGod]
    }
}
