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
        for(let index in oDialogOption.replacements){
            let item = oDialogOption.replacements[index]
            switch (item.type) {
                case 'localstorage':
                    let storageValue = localStorage.getItem(item.type_config.storage_var)
                    sString = this.replaceInString(sString, item.replaceText, storageValue)
    
                    break;
                default:
                    break;
            }
        }
        return sString
    }

    replaceInString(text, key, value){
        return text.replaceAll(key, value)
    }
}
