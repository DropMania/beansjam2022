import Dialogs from '../configs/Dialogs.js'

export default class DialogProvider {
    dialogOptions = Dialogs

    constructor() {}

    getRandomDialog() {
        let sReturnSting = ''
        let oDialogOption =
            this.dialogOptions[
                Math.floor(Math.random() * this.dialogOptions.length)
            ]

        if (typeof oDialogOption === 'object') {
            sReturnSting = this.replaceDialogContent(oDialogOption)
        } else {
            sReturnSting = oDialogOption
        }

        return sReturnSting
    }

    replaceDialogContent(oDialogOption) {
        let sString = oDialogOption.text

        return sString
    }
}
